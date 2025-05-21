import { useNavigate } from "react-router-dom";
import LatestProduct from "../components/LatestProduct";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-[#FFF3ED] relative overflow-hidden">
        {/* 왼쪽 텍스트 영역 */}
        <div className="text-center md:text-left md:max-w-md z-10">
          <div className="flex justify-center md:justify-start mb-4">
            <span className="text-2xl">🥕</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug text-[#4B2E2B] mb-4">
            신선한 농작물의 세계에 오신 것을 환영합니다!
          </h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            당신의 농작물 구매를 더 쉽고 만족스럽게 만들어 드립니다.
          </p>
          <button
            className="bg-[#FFA96B] text-white px-6 py-2 rounded-full font-medium hover:bg-[#ff944d] transition"
            onClick={() => navigate("/market")}
          >
            농작물 마켓 구경가기
          </button>
        </div>

        {/* 오른쪽 이미지 */}
        <div className="relative w-full md:w-1/2 h-64 md:h-80 z-0 mb-10 md:mb-0 rounded-lg overflow-hidden shadow-md">
          <img
            alt="농작물 이미지"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white opacity-30" />
        </div>
      </section>

      <hr className="border-t border-gray-300 mb-6" />
      <LatestProduct />
    </>
  );
}