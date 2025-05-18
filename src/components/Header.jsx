import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* 왼쪽: 내비게이션 메뉴 */}
      <nav className="flex items-center gap-6 text-sm font-medium text-black">
        <Link to="/" className="hover:underline">
          홈
        </Link>
        <Link to="/market" className="hover:underline">
          농작물 마켓
        </Link>
        <Link to="/contact" className="hover:underline">
          문의하기
        </Link>
        <Link to="/register" className="hover:underline">
          상품 등록
        </Link>
      </nav>

      {/* 오른쪽: 로그인 버튼 */}
      <div>
        {user == null ? (
          <Link
            to="/login"
            className="hover:underline text-sm font-medium text-black"
          >
            로그인
          </Link>
        ) : (
          <button
            className="hover:underline text-sm font-medium text-black"
            onClick={() => dispatch(logout())}
          >
            로그아웃
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
