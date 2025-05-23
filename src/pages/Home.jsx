import { useNavigate } from "react-router-dom";
import LatestProduct from "../components/LatestProduct";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row justify-between py-20 relative overflow-hidden bg-[#FFEAD8]">
        {/* 배경 이미지는 오른쪽 끝에서부터 시작 */}
        <div
          className="absolute top-0 right-0 z-0"
          style={{
            width: 1000,
            height: 492,
            backgroundImage: "url('/src/assets/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "right",
            pointerEvents: "none",
          }}
        >
          {/* 그라데이션 오버레이 */}
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(to right, #FFEAD8 0%, #FFEAD800 100%)", // ← 방향만 바꿔줌
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        {/* 왼쪽 텍스트 영역 */}
        <div className="text-center md:text-left z-10 md:px-40 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E2B] mb-4">
            <span className="block">
              <img src="src/assets/carrot.png" alt="carrot" />
            </span>
            <span className="block">신선한 농작물의 세계에 오신 것을</span>
            <span className="block">환영합니다!</span>
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            당신의 농작물 구매를 더 쉽고 만족스럽게 만들어 드립니다.
          </p>
          <button
            className="bg-[#FFA96B] text-white px-6 py-2 rounded-md font-medium hover:bg-[#ff944d] transition"
            onClick={() => navigate("/market")}
          >
            농작물 마켓 구경가기
          </button>
        </div>
      </section>
      <LatestProduct />
    </>
  );
}