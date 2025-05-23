import React from "react";

const categoryNameMap = {
  FRUIT: "과일",
  VEGETABLE: "채소",
  GRAIN: "곡물",
};

function Myproduct({ item }) {
  return (
    <div
      className="rounded-[15px] border border-[#e5e7eb] shadow-[0_4px_16px_0_#BB8D6C33] p-5"
      style={{ width: 338, boxSizing: "border-box" }}
    >
      {/* 이미지 (Home 카드와 동일한 스타일) */}
      <div className="relative w-[298px] h-[298px] bg-gray-200 flex items-center justify-center mb-3 overflow-hidden rounded-[10px]">
        {item.images ? (
          <img
            src={`http://localhost:8080/images/${item.images}`}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500">{`http://localhost:8080/images/${item.images}`}</span>
        )}
        <span
          className="absolute top-0 left-0 px-3 py-1 text-xs font-semibold rounded-br bg-[#FFA968] bg-opacity-90 text-white shadow"
          style={{ letterSpacing: "0.02em", borderTopLeftRadius: 0, borderBottomRightRadius: 8 }}
        >
          {categoryNameMap[item.category] || item.category}
        </span>
      </div>
      <div className="text-[#50392A]">
        {/* 상품 이름 */}
        <h3>{item.title}</h3>
        {/* 가격 */}
        <p>
          <span>{item.price.toLocaleString()}원</span>
        </p>
      </div>
    </div>
  );
}

export default Myproduct;
