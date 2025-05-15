import mockProducts from '/src/api/mockData';
import { Link } from 'react-router-dom';

function MarketList() {
  const products = mockProducts;

  return (
    <section className="px-6 pb-12">
      <h2 className="text-2xl font-bold text-center mb-2">농작물 리스트</h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        여기에서 판매되는 농작물 상품들을 확인하세요.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item, index) => (
          <Link to={`/market/${item.produceId}`} key={`${item.produceId}-${index}`}>
            <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition bg-white">
              {/* 카테고리 */}
              <span className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded mb-2">
                {item.category}
              </span>

              {/* 이미지 */}
              <div className="h-32 bg-gray-100 flex items-center justify-center text-gray-400 text-sm mb-3">
                <img src={item.images} alt={item.name} className="h-full w-full object-cover" />
              </div>

              {/* 상품 이름 */}
              <h3 className="font-medium mb-1">{item.title}</h3>

              {/* 가격 */}
              <p className="text-sm text-gray-700">
                가격: <span className="font-bold">{item.price.toLocaleString()}원</span>
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default MarketList;