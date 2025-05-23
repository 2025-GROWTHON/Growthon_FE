import { useNavigate } from "react-router-dom";
import LatestProduct from "../components/LatestProduct";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between py-20 bg-[#FFDBC066] relative overflow-hidden">
        {/* 왼쪽 텍스트 영역 */}
        <div className="text-center md:text-left z-10 md:px-40">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4B2E2B] mb-4">
            <span className="block"><img src="src/assets/carrot.png"></img></span>
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