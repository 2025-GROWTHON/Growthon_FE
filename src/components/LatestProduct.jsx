import { useEffect, useState } from "react";
import axios from "axios";

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
  axios.get('/api/produces')
    .then((res) => {
      console.log('응답 구조 확인:', res.data);

      if (res.data.status === 200) {
        const sorted = [...res.data.data].sort(
          (a, b) => new Date(b.updateAt) - new Date(a.updateAt)
        );
        setProducts(sorted);
        console.log(res.data.message);
      } else {
        console.error('API 오류 또는 data 없음:', res.data.message);
      }
    })
    .catch((err) => {
      console.error('요청 실패:', err);
    });
}, []);

  return (
    <div className="my-10 text-center">
      <h2 className="text-2xl font-bold mb-2">최근 등록된 상품</h2>
      <p className="text-gray-600 mb-6">가장 최근에 업로드된 농작물을 확인해보세요.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
        {products.map((product) => (
          <div
            key={product.produceId}
            className="border rounded-lg shadow p-6 text-left min-h-[260px] flex flex-col justify-between"
          >
            <div className="text-sm text-gray-400 mb-1">{product.category}</div>
            <div className="bg-gray-200 h-40 flex items-center justify-center mb-3 overflow-hidden">
              {product.images ? (
                <img
                  src={product.images}
                  alt={product.title}
                  className="object-cover h-full w-full"
                />
              ) : (
                <span className="text-gray-500">이미지 없음</span>
              )}
            </div>
            <div className="font-semibold text-lg mb-1">{product.title}</div>
            <div className="text-sm text-gray-600">₩{product.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}