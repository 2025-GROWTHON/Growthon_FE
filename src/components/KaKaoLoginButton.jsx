import axios from "axios";
import { useEffect, useState } from "react";

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
              kakaoID: user.kakao_account?.email,
              nickname: user.properties?.nickname,
            });
            //포스트
            const res = await axios.post("/api/auth/kakao", {
              kakaoID: user.kakao_account?.email,
              nickname: user.properties?.nickname,
            });
            onSuccess(res.data);
          },
          fail: onFailure,
        }),
      fail: onFailure,
    });
  };

  return <button onClick={handleLogin}>카카오로 로그인 시작하기</button>;
}

export default KaKaoLoginButton;
