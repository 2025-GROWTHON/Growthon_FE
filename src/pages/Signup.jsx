import React from "react";
import { useForm } from "react-hook-form";

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("제출된 데이터:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 이름 */}
      <div>
        <label>이름</label>
        <input
          type="text"
          {...register("name", { required: "이름은 필수입니다." })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* 이메일 */}
      <div>
        <label>이메일</label>
        <input
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
        <label>비밀번호</label>
        <input
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

      <button type="submit">회원가입</button>
    </form>
  );
}

export default SignupForm;
