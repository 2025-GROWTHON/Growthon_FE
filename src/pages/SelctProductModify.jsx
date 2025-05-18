import React, { useState } from "react";
import Myproduct from "../components/Myproduct";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import mockProducts from "../api/mockData";

function SelctProductModify() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userProducts = mockProducts.filter(
    (product) => product.userId === 101 //example
  );

  // 선택된 상품의 id를 상태로 관리
  const [selectedId, setSelectedId] = useState(null);

  // 상품 클릭 시 선택
  const handleSelect = (id) => {
    setSelectedId(id);
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
      <button>삭제하기</button>
      <button onClick={() => navigate("./")}>새 농작물 추가</button>
      <p>-------------------</p>
      <h4>내 등록 농작물</h4>
      <p>수정 및 삭제할 농작물을 선택하세요</p>
      <button>삭제하기</button>
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
    </div>
  );
}

export default SelctProductModify;
