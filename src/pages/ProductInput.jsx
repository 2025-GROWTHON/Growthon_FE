import React from "react";
import ProductForm from "../components/ProductInputForm";

function ProductInput() {
  return (
    <>
      <div>
        <h4>상품 등록 및 수정</h4>
        <p>귀하의 농작물을 쉽게 관리하세요</p>
        <button>구매하기</button>
        <button>등록하기</button>
      </div>
      <div></div>
      <ProductForm />
    </>
  );
}

export default ProductInput;
