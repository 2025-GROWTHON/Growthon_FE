import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function MarketSection() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["모두", "과일", "채소", "곡물"];

  useEffect(() => {
    axios.get('/api/produces')
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.data);
          console.log(res.data.message);
        } else {
          console.error('API 오류:', res.data.message);
        }
      })
      .catch((err) => {
        console.error('서버 요청 실패:', err);
      });
  }, []);

  // 카테고리 이름을 백엔드 category 값에 맞춰 매핑 (선택사항)
  const categoryMap = {
    "과일": "FRUIT",
    "채소": "VEGETABLE",
    "곡물": "GRAIN",
  };

  const filteredProducts =
    selectedCategory === null
      ? []
      : selectedCategory === "모두"
      ? products
      : products.filter((product) => product.category === categoryMap[selectedCategory]);

  return (
    <div className="text-center my-10">
      <h2 className="text-2xl font-bold mb-2">판매되는 농작물</h2>
      <p className="text-gray-600 mb-6">신선한 농작물 상품들을 만나보세요.</p>

      {/* 카테고리 버튼 */}
      <div className="flex justify-center gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category ? null : category
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

      {/* 선택된 카테고리의 상품 제목 표시 */}
      <div className="text-left px-6">
        {filteredProducts.length === 0 && selectedCategory === null ? (
          <p className="text-gray-500"></p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              to={`/market/${product.produceId}`}
              key={product.produceId}
              className="block"
            >
              <p className="text-sm text-gray-800 mb-2 hover:underline cursor-pointer">
                {product.title}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default MarketSection;