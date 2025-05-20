import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FarmList() {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    axios.get('/api/produces')
      .then((res) => {
        if (res.data.status === 200) {
          const mapped = res.data.data.map((product) => ({
            id: product.produceId,
            name: product.title,
            description: product.description,
            image: product.images,
          }));
          setFarms(mapped);
        } else {
          console.error('API 오류:', res.data.message);
        }
      })
      .catch((err) => {
        console.error('요청 실패:', err);
      });
  }, []);

  return (
    <section className="px-6 pb-12">
      <div className="h-8" /> 
      <h2 className="text-2xl font-bold text-center mb-8">농장 리스트</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {farms.map((farm) => (
          <Link
            to={`/market/${farm.id}`}
            key={farm.id}
            className="border rounded-lg shadow-sm p-4 bg-white flex flex-col items-center hover:shadow-md transition"
          >
            <div className="w-full h-32 bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
              {farm.image ? (
                <img src={farm.image} alt={farm.name} className="object-cover h-full w-full" />
              ) : (
                "농장"
              )}
            </div>
            <h3 className="font-medium mb-2">{farm.name}</h3>
            <button className="text-sm px-4 py-2 border border-gray-300 rounded">
              문의하기
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}