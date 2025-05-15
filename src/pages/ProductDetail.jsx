import { useParams } from 'react-router-dom';
import mockProducts from '../api/mockData';
import ProductSummary from '../components/ProductSummary';
import ProductDescription from '../components/ProductDescription';

export default function ProductDetail() {
  const { produceId } = useParams();
  const product = mockProducts.find(
    (item) => item.produceId === parseInt(produceId, 10)
  );

  if (!product) {
    return <div className="text-center mt-20 text-gray-500">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <ProductSummary product={product} />
      <hr className="border-t border-gray-300 mb-6" />
      <ProductDescription product={product} />
    </div>
  );
}