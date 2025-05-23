import { Link } from 'react-router-dom';

import defaultImage1 from '../assets/default1.png';
import defaultImage2 from '../assets/default2.png';
import defaultImage3 from '../assets/default3.png';
import defaultImage4 from '../assets/default4.png';
import defaultImage5 from '../assets/default5.png';
import defaultImage6 from '../assets/default6.png';

const farms = [
  {
    id: 1,
    name: "행복 농장",
    description: "신선한 채소와 과일을 재배하는 행복농장입니다.",
    image: defaultImage2,
  },
  {
    id: 2,
    name: "황금 농장",
    description: "친환경 농법으로 건강한 먹거리를 생산합니다.",
    image: defaultImage4,
  },
  {
    id: 3,
    name: "향긋한 농산물",
    description: "햇살 가득한 밭에서 자란 농산물을 제공합니다.",
    image: defaultImage5,
  },
  {
    id: 4,
    name: "싱싱한 삼촌네",
    description: "맑은 물과 깨끗한 환경에서 키운 농작물입니다.",
    image: defaultImage1,
  },
  {
    id: 5,
    name: "팜니스",
    description: "자연 그대로의 맛을 전하는 자연마을 농장.",
    image: defaultImage3,
  },
  {
    id: 6,
    name: "최고구마",
    description: "초록빛이 가득한 건강한 농산물을 만듭니다.",
    image: defaultImage6,
  },
];

export default function FarmList() {
  return (
    <section className="px-6 pb-12 bg-[#FFF9F2] md:px-40">
      <div className="h-8 py-10"/>
      <h2 className="text-3xl font-bold text-[#50392A] text-center mb-10">농장 리스트</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <Link
            className="flex flex-col items-center transition"
            style={{
              width: 338,
              height: 410,
              gap: 10,
              borderRadius: 15,
              paddingTop: 17,
              paddingRight: 20,
              paddingBottom: 17,
              paddingLeft: 20,
              boxShadow: "0 4px 16px 0 #BB8D6C33",
              border: "1px solid #e5e7eb",
              boxSizing: "border-box",
            }}
          >
            <div className="w-[298px] h-[298px] bg-gray-100 flex items-center justify-center text-gray-400 mb-3 overflow-hidden rounded-[10px]">
              <img
                src={farm.image}
                alt={farm.name}
                className="object-cover w-[298px] h-[298px]"
                style={{ display: "block" }}
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <h3 className="font-medium text-[#7A5B47] mb-0">{farm.name}</h3>
              <button
                className="text-sm px-4 py-2 border rounded transition-colors duration-150 hover:bg-[#FFEAD9]"
                style={{
                  borderColor: "#FFA968",
                  color: "#FFA968",
                }}
                onClick={e => {
                  e.preventDefault();
                  if (farm.name === "행복 농장") {
                    window.open("http://pf.kakao.com/_PjqSn/chat", "_blank");
                  }
                  if (farm.name === "황금 농장") {
                    window.open("http://pf.kakao.com/_RxlqSn/chat", "_blank");
                  }
                }}
              >
                문의하기
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}