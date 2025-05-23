export default function ProductDescription({ product }) {
  return (
    <section className="px-6 pb-12 py-20 bg-[#FFF9F2]">
      <h3 className="text-2xl text-[#4B2E2B] font-bold text-center mb-2 ">상품 설명</h3>
      <p className="text-sm text-gray-500 text-center mb-6">
        저희의 농작물 제품은 신선하고 안전하게 재배됩니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center mb-10">
        <InfoBox label="상품 설명 및 농가 정보" value={product.description} />
        <InfoBox label="중량" value={`${product.weight}`} />
        <InfoBox label="생산지" value={product.origin} />
        <InfoBox label="생산 연월" value={product.harvestDate} />
        <InfoBox label="특징" value="조금 못생겼어도 품질은 뛰어납니다" />
        <InfoBox label="보관 방법" value="습하지 않은 곳에 보관하세요" />
      </div>
    </section>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="border py-10 rounded p-4 bg-[#FFF9F2] shadow-md max-w-md w-full mt-10">
      <h4 className="text-m font-bold text-[#4B2E2B] mb-1">{label}</h4>
      <p className="text-base font-medium">{value}</p>
    </div>
  );
}