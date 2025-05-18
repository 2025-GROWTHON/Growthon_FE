import React, { useState } from "react";
import Myproduct from "../components/Myproduct";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mockProducts from "../api/mockData";
import DeletePop from "../components/DeletePop";

function SelctProductModify() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [userProducts, setUserProducts] = useState(
    mockProducts.filter((product) => product.userId === 101) // 예시
  );
  const [selectedId, setSelectedId] = useState(null);
  const [showDeletePop, setShowDeletePop] = useState(false);

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
  const handleDeleteConfirm = () => {
    setUserProducts((prev) =>
      prev.filter((item) => item.produceId !== selectedId)
    ); //이거 뺴고 싶으면 , api 재랜더링 있어야 할듯, 이미 되나?
    setShowDeletePop(false);
    setSelectedId(null);
    // await axios.delete(`/api/produces/${selectedId}`);
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeletePop(false);
  };

  // 수정하기 버튼 클릭 시 상세페이지로 이동
  const handleModify = () => {
    if (selectedId) {
      navigate(`/edit/${selectedId}`);
    } else {
      alert("수정할 상품을 선택하세요.");
    }
  };

  return (
    <div>
      <h4>내 농작물 수정 및 삭제</h4>
      <p>여기에서 등록한 농작물을 관리할 수 있습니다.</p>
      <button onClick={handleDeleteClick}>삭제하기</button>
      <button onClick={() => navigate("./")}>새 농작물 추가</button>
      <p>-------------------</p>
      <h4>내 등록 농작물</h4>
      <p>수정 및 삭제할 농작물을 선택하세요</p>
      <button onClick={handleDeleteClick}>삭제하기</button>
      <button onClick={handleModify}>수정하기</button>
      <ul>
        {userProducts.map((item) => (
          <li
            key={item.produceId}
            style={{
              border:
                selectedId === item.produceId
                  ? "2px solid green"
                  : "1px solid #ccc",
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

export default SelctProductModify;
