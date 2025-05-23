import FarmList from '../components/FarmList.jsx';

export default function Contact() {
  return (
    <div className="bg-[#FFA968]">
      <FarmList />
      <section
        className="w-full border-b border-[#e5e7eb] flex flex-col items-center px-4 py-12 md:py-20"
        style={{ boxSizing: "border-box", minHeight: 200 }}
      >
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row items-start justify-between gap-6 md:gap-0 px-0 md:px-24">
          <div className="flex flex-col" style={{ marginLeft: 40 }}>
            <h2 className="text-3xl font-bold text-white mb-1 mt-2">문의하기</h2>
            <p className="text-sm text-white mt-1 mb-2">
              Farm2You에 문의해 주세요.
            </p>
          </div>
          <button
            className="text-white text-xl rounded border border-white px-8 py-3 md:w-[246px] md:h-[55px] mt-2 md:mt-0"
            style={{
              borderRadius: 10,
              cursor: "pointer",
            }}
            onClick={() => window.open('https://pf.kakao.com/_xmzUin', '_blank')}
          >
            문의하기
          </button>
        </div>
      </section>
    </div>
  );
}