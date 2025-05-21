import { useState } from "react";
import SignupForm from "./Signup";
import Login from "./Login";
import "../App.css";

function LoginOrSign() {
  const [login, setLogin] = useState(false);

  return (
    <div className="login-page">
      <div className="loginOrsign-container">
        <div className="loginOrsign-box">
          <p className="loginnOrsign-title">Login or Sign Up</p>
          <div className="loginOrsign-btns">
            <button onClick={() => setLogin(false)} className="lo-si-login-btn">
              <p>회원가입</p>
            </button>
            <button onClick={() => setLogin(true)} className="lo-si-sinup-btn">
              <p>로그인</p>
            </button>
          </div>
        </div>
      </div>
      <div className="login-signup-bt">
        {login ? <Login /> : <SignupForm />}
      </div>
    </div>
  );
}

export default LoginOrSign;
