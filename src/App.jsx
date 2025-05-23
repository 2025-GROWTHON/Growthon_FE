import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Market from "./pages/Market";
import ProductDetail from "./pages/ProductDetail";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/authSlice";
import ProductInput from "./pages/ProductInput";
import SelctProductModify from "./pages/SelctProductModify";
import ModifyPage from "./pages/ModifyPage";
import Home from "./pages/Home";
import LoginOrSign from "./pages/LoginOrSign";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (localStorage.getItem("token") == null) {
      let user = null;
      try {
        const value = localStorage.getItem("user");
        if (value) {
          user = JSON.parse(value);
        }
      } catch (e) {
        user = null;
      }
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:produceId" element={<ProductDetail />} />
        <Route path="/register" element={<ProductInput />} />
        <Route path="/login" element={<LoginOrSign />} />
        <Route path="/produce" element={<SelctProductModify />} />
        <Route path="/produce/:produceId" element={<ModifyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
