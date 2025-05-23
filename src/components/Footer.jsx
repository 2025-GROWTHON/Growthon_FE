import logo from "../assets/logo.svg";

function Footer() {
  return (
    <footer
      className="py-8 px-6 md:px-40 text-sm text-[#4B2E2B]"
      style={{ backgroundColor: "rgba(255, 219, 192, 0.5)" }}
    >
      <div className="flex flex-col">
        <div className="flex space-x-2 mb-2">
          <img src={logo} alt="Farm2You" className="h-5 mt-0" />
          <span className="text-base text-[#FFA968] font-thin tracking-widest mb-3">FARM2YOU</span>
        </div>
        <div className="flex flex-wrap text-[#7A5B47] gap-x-6 gap-y-2 text-xs">
          <span>문의: admin@farm2you.com</span>
          <a href="/privacy" className="hover:underline">개인정보처리방침</a>
          <a href="/terms" className="hover:underline">이용약관</a>
          <span>저작권 © 2025 FARM2YOU</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;