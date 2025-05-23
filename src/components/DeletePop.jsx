import React from "react";

function DeletePop({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="deletBox">
        {/* 닫기 버튼 (오른쪽 상단) */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
          onClick={onCancel}
        >
          <p>X</p>
        </button>

        {/* 메시지 */}
        <p className="deletbox-text">이 상품을 삭제하시겠습니까?</p>

        {/* 확인 버튼 */}
        <button onClick={onConfirm} className="deletButton">
          <p>삭제하기</p>
        </button>
      </div>
    </div>
  );
}

export default DeletePop;
