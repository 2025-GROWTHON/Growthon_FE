import { useState } from "react";
import mockProducts from "/src/api/mockData";

function MarketSection() {
  const [selectedCategory, setSelectedCategory] = useState(null); // 초기값을 null로 설정
  const categories = ["모두", "과일", "채소", "곡물"];

  // 선택된 카테고리에 따라 상품 필터링
  const filteredProducts =
    selectedCategory === null
      ? [] // 아무것도 선택되지 않았을 때 빈 배열 반환
      : selectedCategory === "모두"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

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
              setSelectedCategory((prevCategory) =>
                prevCategory === category ? null : category
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
            <p key={product.produceId} className="text-sm text-gray-800 mb-2">
              {product.title}
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default MarketSection;