import FarmList from '../components/FarmList.jsx';

export default function Contact() {
  return (
    <div className = "bg-[#FFA968]">
      <FarmList />
      <section
        className="text-left"
        style={{
          width: 1440,
          height: 250,
          paddingTop: 70,
          paddingRight: 183,
          paddingLeft: 183,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "#e5e7eb",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <h2 className="text-3xl font-bold text-[#FFFFFF] mb-0" style={{ marginTop: "10px" }} >문의하기</h2>
          <button
            className="text-white text-xl rounded"
            style={{
              width: 246,
              height: 55,
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: "#fff",
              color: "#fff",
              cursor: "pointer",
              marginTop: "10px", // 버튼만 아래로 내림
            }}
            onClick={() => window.open('https://pf.kakao.com/_xmzUin', '_blank')}
          >
            문의하기
          </button>
        </div>
        <p
          className="text-sm text-white"
          style={{ marginTop: "-8px" }} // 글자만 위로 올림, 값은 조정 가능
        >
          Farm2You에 문의해 주세요.
        </p>
      </section>
    </div>
  );
}