import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import kakaoBtnImg from "../assets/images/kakao-login-btn.png";

function KaKaoLoginButton({ onSuccess, onFailure }) {
  const [ready, setReady] = useState(false);
  const kakaoKey = import.meta.env.VITE_KAKAO_KEY;
  useEffect(() => {
    if (!kakaoKey) return;
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.onload = () => {
      window.Kakao.init(kakaoKey);
      setReady(true);
    };
    document.body.appendChild(script);
  }, [kakaoKey]);

  const handleLogin = () => {
    if (!ready) return;
    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      throughTalk: false,
      success: () =>
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: async (user) => {
            console.log(user);
            console.log({
              email: user.kakao_account?.email,
              username: user.properties?.nickname,
            });
            //포스트
            const res = await axios.post("/api/auth/kakao", {
              email: user.kakao_account?.email,
              username: user.properties?.nickname,
            });
            onSuccess(res.data);
          },
          fail: onFailure,
        }),
      fail: onFailure,
    });
  };

  return (
    <button onClick={handleLogin} className="kakaoLogin-btn">
      <img
        className="kakaoLogin-image "
        src={kakaoBtnImg}
        alt="카카오 로그인"
      />
    </button>
  );
}

export default KaKaoLoginButton;
