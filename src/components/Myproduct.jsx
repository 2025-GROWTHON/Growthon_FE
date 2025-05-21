import React from "react";

function Myproduct({ item }) {
  return (
    <div>
      <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition bg-white">
        {/* 카테고리 */}
        <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">
          {item.category}
        </span>

        {/* 이미지 */}
        <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
          <img
            src={`http://localhost:8080/images/${item.images}`}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 상품 이름 */}
        <h3 className="font-medium mb-1">{item.title}</h3>

        {/* 가격 */}
        <p className="text-sm text-gray-700">
          가격:{" "}
          <span className="font-bold">{item.price.toLocaleString()}원</span>
        </p>
      </div>
    </div>
  );
}

export default Myproduct;
