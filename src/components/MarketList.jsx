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
        <span className="block px-0"><img src="src/assets/carrot.png"></img></span>
        <h2 className="text-3xl font-bold mb-2 text-[#4B2E2B] text-left">판매되는 농작물</h2>
        <p className="text-[#7A5B47] mb-6 text-left">신선한 농작물 상품들을 만나보세요.</p>

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
        <h1 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] mt-5 mb-2">농작물 리스트</h1>
        <p className="text-[#7A5B47]">신선한 농작물 상품들을 만나보세요.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-40 gap-4 py-10 bg-[#FFF9F2]">
        {filteredProducts.map((item) => (
          <Link to={`/market/${item.produceId}`} key={item.produceId}>
            <div className="border rounded-xl shadow-sm hover:shadow-md transition text-left p-4">
              <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
                <img src={`http://localhost:8080/images/${item.images}`} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded bg-green-300 bg-opacity-80">
                  {categoryNameMap[item.category] || item.category}
                </span>
              </div>
              <h3 className="text-[#4B2E2B] font-medium text-sm mb-1">{item.title}</h3>
              <p className="text-sm text-[#4B2E2B]">
                <span className="font-bold">{item.price.toLocaleString()}원</span>
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