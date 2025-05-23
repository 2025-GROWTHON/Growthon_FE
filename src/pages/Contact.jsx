import FarmList from '../components/FarmList.jsx';

export default function Contact() {
  return (
    <div>
      <FarmList />
      <section className="text-left mt-12 px-6 pb-20">
        <h2 className="text-xl font-bold mb-2">문의하기</h2>
        <p className="text-sm text-gray-500 mb-4">Farm2You에 문의해주세요.</p>
        <button
          className="px-6 py-2 bg-black text-white rounded"
          onClick={() => window.open('https://pf.kakao.com/_xmzUin', '_blank')}
        >
          문의하기
        </button>
      </section>
    </div>
  );
}