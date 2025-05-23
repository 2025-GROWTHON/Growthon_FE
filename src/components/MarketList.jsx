import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import allIcon from "../assets/all.svg";
import fruitIcon from "../assets/fruit.svg";
import vegetableIcon from "../assets/vegetable.svg";
import grainIcon from "../assets/grain.svg";

// 영문 → 한글 카테고리 매핑 (표시용)
const categoryNameMap = {
  FRUIT: "과일",
  VEGETABLE: "채소",
  GRAIN: "곡물",
};

const categoryMap = {
  "과일": "FRUIT",
  "채소": "VEGETABLE",
  "곡물": "GRAIN",
};

const categoryIcons = {
  "모두": allIcon,
  "과일": fruitIcon,
  "채소": vegetableIcon,
  "곡물": grainIcon,
};

function MarketList() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("모두"); 

  const categories = ["모두", "과일", "채소", "곡물"];

  useEffect(() => {
    axios.get('/api/produces')
      .then((res) => {
        if (res.data.status === 200) {
          setProducts(res.data.data);
        } else {
          console.error('API 오류:', res.data.message);
        }
      })
      .catch((err) => {
        console.error('서버 요청 실패:', err);
      });
  }, []);

  const filteredProducts =
    selectedCategory === "모두"
      ? products
      : products.filter((product) => product.category === categoryMap[selectedCategory]);

  return (
    <div>
      <div className="relative overflow-hidden bg-[#FFEAD8] flex justify-center">
        {/* 오른쪽 끝에서부터 시작하는 배경 이미지와 그라데이션 (1000*492) */}
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
          <div
            className="w-full h-full"
            style={{
              background: "linear-gradient(to right, #FFEAD8 0%, #FFEAD800 100%)",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
        <div
          className="relative z-10 py-20 md:px-40 text-center w-full"
          style={{ height: 414, minWidth: 320 }}
        >
          <span className="block px-0">
            <img src="src/assets/carrot.png" alt="carrot" />
          </span>
          <h2 className="text-3xl font-bold mb-2 text-[#4B2E2B] text-left">판매되는 농작물</h2>
          <p className="text-[#7A5B47] mb-6 text-left">신선한 농작물 상품들을 만나보세요.</p>
          {/* 카테고리 버튼 */}
          <div className="flex text-left gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === category ? "모두" : category
                  )
                }
                className={`px-4 py-2 font-medium flex flex-col items-center gap-1 transition
                  ${
                    selectedCategory === category
                      ? "bg-[#FFA968] text-white"
                      : "text-[#FFA968] hover:bg-[#FFEAD9]"
                  }`}
                style={{
                  width: 70,
                  minHeight: 70,
                  justifyContent: "center",
                  border: "1px solid #FFA968",
                  borderRadius: 8,
                }}
              >
                <img
                  src={categoryIcons[category]}
                  alt={category}
                  className="w-7 h-7 mb-1"
                  style={{
                    filter: selectedCategory === category ? "brightness(0) invert(1)" : "none"
                  }}
                />
                <span className="text-xs">{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* 필터링된 카드 리스트 */}
      <div className="md:px-40 bg-[#FFF9F2] text-left pt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-[#4B2E2B] mt-5 mb-2">농작물 리스트</h1>
        <p className="text-[#7A5B47]">신선한 농작물 상품들을 만나보세요.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:px-40 gap-4 py-10 bg-[#FFF9F2]">
        {filteredProducts.map((item) => (
          <Link to={`/market/${item.produceId}`} key={item.produceId}>
            <div
              className="flex flex-col transition"
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
              <div className="relative w-[298px] h-[298px] bg-gray-200 flex items-center justify-center mb-3 overflow-hidden rounded-[10px]">
                {item.images ? (
                  <img
                    src={`http://localhost:8080/images/${item.images}`}
                    alt={item.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500">{`http://localhost:8080/images/${item.images}`}</span>
                )}
                <span
                  className="absolute top-0 left-0 px-3 py-1 text-xs font-semibold rounded-br bg-[#FFA968] bg-opacity-90 text-white shadow"
                  style={{ letterSpacing: "0.02em", borderTopLeftRadius: 0, borderBottomRightRadius: 8 }}
                >
                  {categoryNameMap[item.category] || item.category}
                </span>
              </div>
              <h3 className="font-medium text-[#7A5B47] mb-0">{item.title}</h3>
              <p className="text-sm text-[#4B2E2B]">
                <span className="font-bold text-[#7A5B47]">{item.price.toLocaleString()}원</span>
              </p>
            </div>
          </Link>
        ))}
        {filteredProducts.length === 0 && (
          <div className="py-10 bg-[#FFF9F2] text-left text-gray-500">
            카테고리에 해당하는 상품이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketList;