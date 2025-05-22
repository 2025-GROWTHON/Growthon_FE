import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import "../App.css";
import KaKaoLoginButton from "../components/KaKaoLoginButton";

function Login() {
  //카카오 로그인
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  //앱 시작 시 로컬 스토리지에서 꺼내서 로그인 유지
  useEffect(() => {
    if (localStorage.getItem("user") == null) {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage?.getItem("accessToken");
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      }
    }
  }, []);
  const navigate = useNavigate();

  // 로그인 성공 핸들러: user 저장 + localStorage에 영구 보관    한번  더하는 이유는 역할 나누기 (백엔드 보내기 / 로컬 저장 )
  const handleSuccess = async (res) => {
    const token = res.data.token;
    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user.id));
    localStorage.setItem("accessToken", token);

    dispatch(loginSuccess({ user, token }));
  };

  //그냥 로그인

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/api/users/login", data);

      const { accessToken, user } = response.data.data; //구조 보니까 토큰이랑 user 위치 달라서 고쳐야 함,

      if (accessToken) {
        // 토큰 저장
        localStorage.setItem("accessToken", accessToken);
        dispatch(loginSuccess({ user, token: accessToken })); //authSlice에 저장
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-box" style={{ marginTop: 105 }}>
      <div className="login-title">로그인</div>
      <form onSubmit={handleSubmit(handleLogin)} className="login-box-right">
        {/* 이메일 */}
        <div>
          <label className="login-field">Email</label>
          <input
            placeholder="Enter your email"
            className={`${errors.email ? " input-error" : "login-input"}`}
            type="email"
            {...register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
          />
          {errors.email && (
            <div className="err-text">
              <p>{errors.email.message}</p>
            </div>
          )}
        </div>
        {/* 비밀번호 */}
        <div>
          <label className="login-field">Password</label>
          <input
            placeholder="Create a password"
            className={`${errors.password ? " input-error" : "login-input"}`}
            type="password"
            {...register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: {
                value: 6,
                message: "비밀번호는 최소 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <div className="err-text">
              <p>{errors.password.message}</p>
            </div>
          )}
        </div>
        <div className="login-box-container">
          <button type="submit" className="login-button">
            <p>LOGIN</p>
          </button>
          <KaKaoLoginButton onSuccess={handleSuccess} onFailure={setError} />
        </div>
      </form>
    </div>
  );
}

export default Login;
