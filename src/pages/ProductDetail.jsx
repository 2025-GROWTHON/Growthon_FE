import { useParams } from 'react-router-dom';
import mockProducts from '../api/mockData';

export default function ProductDetail() {
  const { produceId } = useParams(); // URL에서 productId 가져오기
  const product = mockProducts.find(
    (item) => item.productId === parseInt(produceId, 10) // productId로 상품 찾기
  );

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <p>카테고리: {product.category}</p>
      <p>이미지: {product.images}</p>
      <p>설명: {product.description}</p>
      <p>가격: {product.price.toLocaleString()}원</p>
    </div>
  );
}