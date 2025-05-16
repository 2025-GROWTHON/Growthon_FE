export default function ProductSummary({ product }) {
  return (
    <section className="flex gap-8 p-8">
      <div className="w-1/2 h-64 bg-gray-100 flex items-center justify-center">
        <img src={product.images} alt={product.title} className="object-cover h-full w-full" />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            {product.description}
          </p>
        </div>
        <div className="flex gap-2 mt-4">
          <button className="border px-4 py-2">구매하기</button>
          <button className="bg-black text-white px-4 py-2">문의하기</button>
        </div>
      </div>
    </section>
  );
}