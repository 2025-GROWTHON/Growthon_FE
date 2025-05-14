function Footer() {
  return (
    <footer className="py-8 border-t text-center text-sm text-black space-x-6">
      <a href="/contact" className="hover:underline">문의하기</a>
      <a href="/terms" className="hover:underline">이용약관</a>
      <a href="/privacy" className="hover:underline">개인정보 처리방침</a>
    </footer>
  );
}

export default Footer;