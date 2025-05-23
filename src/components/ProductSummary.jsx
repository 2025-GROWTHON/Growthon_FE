export default function ProductSummary({ product }) {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-[60px] py-10 px-4 md:px-20 lg:px-40 bg-[#FFDBC066] w-full">
      <div
        className="flex items-center justify-center bg-gray-100 mb-8 lg:mb-0"
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
        className="flex flex-col justify-center px-0 lg:px-10 w-full max-w-xl"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B2E2B] mb-4">{product.title}</h2>
          <p className="text-gray-600 mt-2 whitespace-pre-line">
            {product.description}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <button
            className="border border-[#FFA96B] text-[#FFA96B] px-10 sm:px-20 py-2 rounded-md hover:bg-[#FFEAD9] transition min-w-[140px] sm:min-w-[160px]"
            onClick={() => window.open("https://pf.kakao.com/_xmzUin/chat", "_blank")}
          >
            구매하기
          </button>
          <button
            className="bg-[#FFA96B] text-white px-10 sm:px-20 py-2 rounded-md hover:bg-[#ff944d] transition min-w-[140px] sm:min-w-[160px]"
            onClick={() => window.open("https://pf.kakao.com/_xmzUin/chat", "_blank")}
          >
            문의하기
          </button>
        </div>
      </div>
    </section>
  );
}