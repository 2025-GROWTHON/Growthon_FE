import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import "../App.css";

function Login() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/api/login", data);

      const { accessToken, user } = response.data.data;

      if (accessToken) {
        // 토큰 저장
        localStorage.setItem("token", accessToken);
        dispatch(loginSuccess({ user, token: accessToken })); //authSlice에 저장
        alert("로그인 성공!");
      }
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-box">
      <h1 className="login-title">로그인</h1>
      <form onSubmit={handleSubmit(handleLogin)} className="login-box-right">
        {/* 이메일 */}
        <div>
          <label className="login-field">Email</label>
          <input
            placeholder="Enter your email"
            className="login-input"
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
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        {/* 비밀번호 */}
        <div>
          <label className="login-field">비밀번호</label>
          <input
            placeholder="Create a password"
            className="login-input"
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
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="login-button">
          <p>로그인</p>
        </button>
      </form>
    </div>
  );
}

export default Login;
