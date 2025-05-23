import React, { useState, useEffect } from "react";
import Myproduct from "../components/Myproduct";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DeletePop from "../components/DeletePop";
import api from "../api/axiosInstance";

function SelectProductModify() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userProducts, setUserProducts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showDeletePop, setShowDeletePop] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/produces");
        setUserProducts(
          res.data.data.filter((product) => product.userId === Number(user.id))
        );
      } catch (err) {
        alert("상품 목록을 불러오지 못했습니다.");
      }
    }
    if (user?.id) fetchProducts();
  }, [user]);

  // 상품 클릭 시 선택
  const handleSelect = (id) => {
    setSelectedId(id);
  };

  // 삭제 팝업 열기
  const handleDeleteClick = () => {
    if (selectedId) {
      setShowDeletePop(true);
    } else {
      alert("삭제할 상품을 선택하세요.");
    }
  };

  // 삭제 확인
  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/produce/${selectedId}`);
      setUserProducts((prev) =>
        prev.filter((item) => item.produceId !== selectedId)
      );
      setShowDeletePop(false);
      setSelectedId(null);
      alert("삭제가 완료되었습니다.");
    } catch (err) {
      alert("삭제 실패: " + (err.response?.data?.message || err.message));
    }
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeletePop(false);
  };

  // 수정하기 버튼 클릭 시 상세페이지로 이동
  const handleModify = () => {
    if (selectedId) {
      navigate(`/produce/${selectedId}`);
    } else {
      alert("수정할 상품을 선택하세요.");
    }
  };

  return (
    <div className="login-page">
      <div className="loginOrsign-container ">
        <div className="loginOrsign-box">
          <h4 className="loginnOrsign-title font-bold">
            내 농작물 수정 및 삭제
          </h4>
          <p className="productInput-des -mt-5">
            여기에서 등록한 농작물을 관리할 수 있습니다.
          </p>

          <div className="loginOrsign-btns">
            <button className="lo-si-login-btn" onClick={handleDeleteClick}>
              <p>삭제하기</p>
            </button>
            <button
              className="lo-si-sinup-btn"
              onClick={() => navigate("/register")}
            >
              <p>새 농작물 추가</p>
            </button>
          </div>
        </div>
      </div>
      <div className="inputForm-pg" style={{ height: 100 }}>
        <div className="inputForm-tisub">
          <h4 className="inputForm-title">내 등록 농작물</h4>
          <p className="inputForm-sub ">수정 및 삭제할 농작물을 선택하세요</p>
          <div className="loginOrsign-btns mt-8">
            <button className="modify-delete-btn" onClick={handleDeleteClick}>
              <p>삭제하기</p>
            </button>
            <button className="modify-btn" onClick={handleModify}>
              <p>수정하기</p>
            </button>
          </div>
        </div>
      </div>
      <ul className="myProduct-list">
        {userProducts.map((item) => (
          <li
            key={item.produceId}
            style={{
              border: selectedId === item.produceId ? "2px solid green" : "",
              borderRadius: selectedId === item.produceId ? "15px;" : "15px",
              cursor: "pointer",
              marginBottom: "8px",
            }}
            onClick={() => handleSelect(item.produceId)}
          >
            <Myproduct item={item} />
          </li>
        ))}
      </ul>
      {showDeletePop && (
        <DeletePop
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}

export default SelectProductModify;
