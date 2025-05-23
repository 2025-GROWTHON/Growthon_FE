import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // 카테고리 한글 매핑
  const categoryNameMap = {
    VEGETABLE: "채소",
    GRAIN: "곡물",
    FRUIT: "과일",
  };

  useEffect(() => {
    axios.get('/api/produces')
      .then((res) => {
        if (res.data.status === 200) {
          const sorted = [...res.data.data].sort(
            (a, b) => new Date(b.updateAt) - new Date(a.updateAt)
          );
          setProducts(sorted);
        } else {
          console.error('API 오류 또는 data 없음:', res.data.message);
        }
      })
      .catch((err) => {
        console.error('요청 실패:', err);
      });
  }, []);

  return (
    <div className="py-14 text-center bg-[#FFF9F2]">
      <h2 className="text-3xl font-bold mb-2 md:px-40 text-[#4B2E2B] text-left">최신 상품</h2>
      <p className=" mb-11 md:px-40 text-[#7A5B47] text-left">고품질의 농작물을 확인하세요.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8 md:px-40 text-left">
        {products.map((product) => (
          <div
            key={product.produceId}
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
            onClick={() => navigate(`/market/${product.produceId}`)}
          >
            <div className="relative w-[298px] h-[298px] bg-gray-200 flex items-center justify-center mb-3 overflow-hidden rounded-[10px]">
              {product.images ? (
                <img
                  src={`http://localhost:8080/images/${product.images}`}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500">{`http://localhost:8080/images/${product.images}`}</span>
              )}
              <span
                className="absolute top-0 left-0 px-3 py-1 text-xs font-semibold rounded-br bg-[#FFA968] bg-opacity-90 text-white shadow"
                style={{ letterSpacing: "0.02em", borderTopLeftRadius: 0, borderBottomRightRadius: 8 }}
              >
                {categoryNameMap[product.category] || product.category}
              </span>
            </div>
            <h3 className="font-medium text-[#7A5B47]">{product.title}</h3>
            <p className="text-sm text-[#4B2E2B]">
              <span className="font-bold text-[#7A5B47]">{product.price.toLocaleString()}원</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}