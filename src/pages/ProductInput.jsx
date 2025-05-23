import React from "react";
import ProductForm from "../components/ProductInputForm";
import { useNavigate } from "react-router-dom";

function ProductInput() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h4>상품 등록 및 수정</h4>
        <p>귀하의 농작물을 쉽게 관리하세요</p>
        <button onClick={() => navigate("/produce")}>수정하기</button>
        <button>등록하기</button>
      </div>
      <div></div>
      <ProductForm />
    </>
  );
}

export default ProductInput;
