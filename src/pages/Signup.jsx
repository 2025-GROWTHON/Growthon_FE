import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../App.css";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    //회원 가입 누르면 실행, 변경 요지 있음
    try {
      const response = await axios.post(apIurl, data);
      const result = response.data;

      alert(result.message);
    } catch (error) {
      if (error.response) {
        const errData = error.response.data;

        // 전체 메시지 출력
        alert(`회원가입 실패: ${errData.message}`);

        // 필드별 에러 출력 (선택)
        if (errData.errors && Array.isArray(errData.errors)) {
          errData.errors.forEach((fieldError) => {
            console.warn(
              `${fieldError.field} 필드 오류: ${fieldError.reason} (입력값: ${fieldError.value})`
            );
          });
        }
      } else {
        alert("서버와 연결할 수 없습니다.");
        console.error("네트워크 오류:", error);
      }
    }
  };

  return (
    <div className="login-box">
      <h1 className="login-title">회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="login-box-right">
        {/* 이름 인풋 */}
        <div>
          <label className="login-field">이름</label>
          <input
            placeholder="Enter your full name"
            className="login-input"
            type="text"
            {...register("name", { required: "이름은 필수입니다." })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
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
          <p>회원가입</p>
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
