import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSummary from '../components/ProductSummary';
import ProductDescription from '../components/ProductDescription';

export default function ProductDetail() {
  const { produceId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/produces/${produceId}`)
      .then((res) => {
        if (res.data.status === 200) {
          setProduct(res.data.data);
        } else {
          setError('상품 정보를 불러올 수 없습니다.');
        }
      })
      .catch(() => {
        setError('서버 오류가 발생했습니다.');
      });
  }, [produceId]);

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-20 text-gray-500">불러오는 중...</div>;
  }

  return (
    <div>
      <ProductSummary product={product} />
      <hr className="border-t border-gray-300 mb-6" />
      <ProductDescription product={product} />
    </div>
  );
}