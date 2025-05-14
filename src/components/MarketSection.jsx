import { useState } from "react";

function MarketSection() {
  const [selectedCategory, setSelectedCategory] = useState("모두");
  const categories = ["모두", "과일", "채소", "곡물"];

  return (
    <div className="text-center my-10">
      <h2 className="text-2xl font-bold mb-2">판매되는 농작물</h2>
      <p className="text-gray-600 mb-6">신선한 농작물 상품들을 만나보세요.</p>

      <div className="flex justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
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
  );
}

export default MarketSection;