import { useState, useRef } from "react";
import SignupForm from "./Signup";
import Login from "./Login";
import "../App.css";

function LoginOrSign() {
  const [login, setLogin] = useState(false);
  const loginRef = useRef(null);

  const handleLoginClick = () => {
    setLogin(true);
    setTimeout(() => {
      loginRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  const handleSignUpClick = () => {
    setLogin(false);
    setTimeout(() => {
      loginRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 0);
  };

  return (
    <div className="login-page">
      <div className="loginOrsign-container">
        <div className="loginOrsign-box">
          <p className="loginnOrsign-title">Login or Sign Up</p>
          <div className="loginOrsign-btns">
            <button
              onClick={() => handleSignUpClick()}
              className="lo-si-login-btn"
            >
              <p>회원가입</p>
            </button>
            <button
              onClick={() => handleLoginClick()}
              className="lo-si-sinup-btn"
            >
              <p>로그인</p>
            </button>
          </div>
        </div>
      </div>
      <div className="login-signup-bt" ref={loginRef}>
        {login ? <Login /> : <SignupForm />}
      </div>
    </div>
  );
}

export default LoginOrSign;
