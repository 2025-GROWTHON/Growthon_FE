import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import "../App.css";
import logo from "../assets/Vector.svg";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-[#FFF7ED] shadow">
      {/* 왼쪽: 내비게이션 메뉴 */}

      <div className="flex items-center space-x-2">
        <img src={logo} />
      </div>
      <nav className="flex items-center space-x-6 text-sm font-medium text-gray-700">
        <Link to="/" className="hover:underline">
          <p className="header-text font-bold text-[#7A5B47] ">홈</p>
        </Link>
        <div className="short-stick"></div>
        <Link to="/market" className="hover:underline">
          <p className="header-text font-bold text-[#7A5B47]">농작물 마켓</p>
        </Link>
        <div className="short-stick"></div>
        <Link to="/contact" className="hover:underline">
          <p className="header-text font-bold text-[#7A5B47]">문의하기</p>
        </Link>
        <div className="short-stick"></div>
        <Link to="/register" className="hover:underline">
          <p className="header-text font-bold text-[#7A5B47]">상품 등록</p>
        </Link>
      </nav>

      {/* 오른쪽: 로그인 버튼 */}
      <div className="flex items-center space-x-4">
        {user == null ? (
          <div className="header-login-box">
            <Link
              to="/login"
              className="hover:underline text-sm font-medium text-black"
            >
              <p>LOG IN</p>
            </Link>
          </div>
        ) : (
          <div className="header-login-box">
            <button
              className="hover:underline text-sm font-medium text-black"
              onClick={() => {
                localStorage.removeItem("accessToken");
                dispatch(logout());
              }}
            >
              <span>LOGOUT</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
