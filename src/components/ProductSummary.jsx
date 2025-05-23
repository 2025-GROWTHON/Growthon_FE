export default function ProductSummary({ product }) {
  return (
    <section className="flex gap-[60px] items-center py-20 px-40 bg-[#FFDBC066]">
      <div
        className="flex items-center justify-center bg-gray-100"
        style={{
          width: 338,
          height: 332,
          borderRadius: 15,
          paddingTop: 17,
          paddingRight: 20,
          paddingBottom: 17,
          paddingLeft: 20,
          boxSizing: "border-box",
        }}
      >
        <img
          src={`http://localhost:8080/images/${product.images}`}
          alt={product.title}
          className="object-cover w-full h-full"
          style={{ borderRadius: 15 }}
        />
      </div>
      <div
        className="flex flex-col justify-center px-10"
        style={{
          width: 553,
        }}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B2E2B] mb-4">{product.title}</h2>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            {product.description}
          </p>
        </div>
        <div className="flex gap-4 mt-10">
          <button className="border border-[#FFA96B] text-[#FFA96B] px-20 py-2 rounded-md hover:bg-[#FFEAD9] transition min-w-[160px]">
            구매하기
          </button>
          <button className="bg-[#FFA96B] text-white px-20 py-2 rounded-md hover:bg-[#ff944d] transition min-w-[160px]">
            문의하기
          </button>
        </div>
      </div>
    </section>
  );
}