import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// 영문 → 한글 카테고리 매핑 (표시용)
const categoryNameMap = {
  FRUIT: "과일",
  VEGETABLE: "채소",
  GRAIN: "곡물",
};

const categoryMap = {
  "과일": "FRUIT",
  "채소": "VEGETABLE",
  "곡물": "GRAIN",
};

function MarketList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("모두"); 

  const categories = ["모두", "과일", "채소", "곡물"];

  useEffect(() => {
    axios.get('/api/produces')
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.data);
        } else {
          console.error('API 오류:', res.data.message);
        }
      })
      .catch((err) => {
        console.error('서버 요청 실패:', err);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "모두"
      ? products
      : products.filter((product) => product.category === categoryMap[selectedCategory]);

  return (
    <div>
      <div className = "py-10 bg-[#FFDBC066] md:px-40 text-center">
        <h2 className="text-3xl font-bold mb-2 mt-5 text-[#4B2E2B] text-left">판매되는 농작물</h2>
        <p className="text-gray-600 mb-6 text-left">신선한 농작물 상품들을 만나보세요.</p>

        {/* 카테고리 버튼 */}
        <div className="flex text-left gap-2 mb-10">
          {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category ? "모두" : category
              )
            }
            className={`px-4 py-2 font-medium border transition
              ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            {category}
          </button>
        ))}
        </div>
      </div>
      {/* 필터링된 카드 리스트 */}
      <div className="md:px-40 bg-[#FFF9F2] text-left pt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] mb-2">농작물 리스트</h1>
        <p className="text-gray-600">신선한 농작물 상품들을 만나보세요.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-40 gap-6 py-10 bg-[#FFF9F2]">
        {filteredProducts.map((item) => (
          <Link to={`/market/${item.produceId}`} key={item.produceId}>
            <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition text-left">
              {/* 카테고리 */}
              <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">
                {categoryNameMap[item.category] || item.category}
              </span>
              {/* 이미지 */}
              <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
                <img src={item.images} alt={item.title} className="h-full w-full object-cover" />
              </div>
              {/* 상품 이름 */}
              <h3 className="font-medium mb-1">{item.title}</h3>
              {/* 가격 */}
              <p className="text-sm text-gray-700">
                가격: <span className="font-bold">{item.price.toLocaleString()}원</span>
              </p>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="py-10 bg-[#FFF9F2] text-left text-gray-500">
            카테고리에 해당하는 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketList;