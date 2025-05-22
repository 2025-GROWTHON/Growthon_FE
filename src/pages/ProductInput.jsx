import React from "react";
import ProductForm from "../components/ProductInputForm";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProductInput() {
  const navigate = useNavigate();
  return (
    <>
      <div className="login-page">
        <div className="loginOrsign-container">
          <div className="loginOrsign-box">
            <h4 className="loginnOrsign-title">상품 등록 및 수정</h4>
            <p className="productInput-des">귀하의 농작물을 쉽게 관리하세요</p>
            <div className="loginOrsign-btns">
              <button
                className="lo-si-login-btn"
                onClick={() => navigate("/produce")}
              >
                수정하기
              </button>
              <button className="lo-si-sinup-btn">등록하기</button>
            </div>
          </div>
        </div>
        <ProductForm />
      </div>
    </>
  );
}

export default ProductInput;
