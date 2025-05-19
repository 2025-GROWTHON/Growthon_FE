import { useNavigate } from "react-router-dom";
import LatestProduct from "../components/LatestProduct";

export default function Home() {
    const navigate = useNavigate();

    return (
        <>
        <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20 bg-white">
      <div className="text-center md:text-left md:max-w-md">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          신선한 농작물의 세계에 오신 것을 환영합니다!
        </h1>
        <p className="text-gray-600 mb-6">
          당신의 농작물 구매를 더 쉽고 만족스럽게 만들어 드립니다.
        </p>
        <button
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          onClick={() => navigate("/market")}
        >
          농작물 마켓 구경가기
        </button>
      </div>

      <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <div className="w-72 h-48 bg-gray-200 rounded-md" />
        {/* <img src="..." alt="농작물 이미지" className="w-full h-auto rounded-lg shadow" /> */}
      </div>
    </section>
    <hr className="border-t border-gray-300 mb-6" />
    <LatestProduct />
    </>
    );
}