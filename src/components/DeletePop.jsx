import React from "react";
//임시로 스타일 들어가있음

function DeletePop({ onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "32px 24px",
          borderRadius: "8px",
          minWidth: "260px",
          textAlign: "center",
        }}
      >
        <p style={{ marginBottom: "24px" }}>이 상품을 삭제하시겠습니까?</p>
        <button
          onClick={onConfirm}
          style={{
            background: "#e53e3e",
            color: "#fff",
            padding: "8px 24px",
            border: "none",
            borderRadius: "4px",
            marginRight: "12px",
            cursor: "pointer",
          }}
        >
          확인
        </button>
        <button
          onClick={onCancel}
          style={{
            background: "#aaa",
            color: "#fff",
            padding: "8px 24px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default DeletePop;
