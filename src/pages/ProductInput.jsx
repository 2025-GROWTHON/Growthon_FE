import { useRef } from "react";
import ProductForm from "../components/ProductInputForm";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ProductInput() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const handleScrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="login-page">
        <div className="loginOrsign-container">
          <div className="loginOrsign-box">
            <h4 className="loginnOrsign-title">상품 등록 및 수정</h4>
            <p className="productInput-des -mt-5">
              귀하의 농작물을 쉽게 관리하세요
            </p>
            <div className="loginOrsign-btns">
              <button
                className="lo-si-login-btn"
                onClick={() => navigate("/produce")}
              >
                <p>수정하기</p>
              </button>
              <button className="lo-si-sinup-btn" onClick={handleScrollToForm}>
                <p>등록하기</p>
              </button>
            </div>
          </div>
        </div>
        <div ref={formRef}>
          <ProductForm />
        </div>
      </div>
    </>
  );
}

export default ProductInput;
