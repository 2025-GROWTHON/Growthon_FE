import React from "react";

function Myproduct({ item }) {
  return (
    <div className="myProduct-card">
      <div className="myProduct-card-in">
        <div className="myProduct-top">
          {/* 카테고리 */}
          <div className="myProduct-card-category">{item.category}</div>

          {/* 이미지 */}
          <div className="myProduct-image-bg">
            <img
              src={`http://localhost:8080/images/${item.images}`}
              alt={item.title}
              className="myProduct-image"
            />
          </div>
        </div>
        <div className="porduct-dis">
          {/* 상품 이름 */}
          <h3>{item.title}</h3>

          {/* 가격 */}
          <p>
            가격: <span>{item.price.toLocaleString()}원</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Myproduct;
