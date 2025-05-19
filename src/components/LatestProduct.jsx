import mockProducts from "../api/mockData";

export default function LatestProducts() {
  const sorted = [...mockProducts].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  return (
    <div className="my-10 text-center">
      <h2 className="text-2xl font-bold mb-2">최근 등록된 상품</h2>
      <p className="text-gray-600 mb-6">가장 최근에 업로드된 농작물을 확인해보세요.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-8">
        {sorted.map((product) => (
          <div
            key={product.produceId}
            className="border rounded-lg shadow p-6 text-left min-h-[260px] flex flex-col justify-between"
          >
            <div className="text-sm text-gray-400 mb-1">{product.category}</div>
            <div className="bg-gray-200 h-40 flex items-center justify-center mb-3">
              {product.images}
            </div>
            <div className="font-semibold text-lg mb-1">{product.title}</div>
            <div className="text-sm text-gray-600">₩{product.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}