import axios from "axios";
import { Profiler, useEffect, useState } from "react";

function KaKaoLoginButton({ onSuccess, onFailure }) {
  [ready, setReady] = useState(false);
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
      scope: "profile_nickname, profile_image",
      turoughTalk: false,
      success: () =>
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: async (user) => {
            console.log("api", user.id);
            //포스트
            const res = axios.post("api", {
              kakaoID: user.id,
              nickname: profile_nickname,
              profileimage: profile_image,
            });
            onSuccess(data);
          },
          fail: onFailure,
        }),
      fail: onFailure,
    });
  };

  return <button onClick={handleLogin}>카카오로 로그인 시작하기</button>;
}

export default KaKaoLoginButton;
