// axiosInstance.js
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

console.log("[axiosInstance] axios 인스턴스 생성됨"); // ✅ 추가

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("[axiosInstance] 요청에 토큰 포함:", token); // ✅ 추가
  } else {
    console.log("[axiosInstance] 토큰 없음"); // ✅ 추가
  }
  return config;
});

// 응답 인터셉터 생략...
export default api;
