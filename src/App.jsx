import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Market from "./pages/Market";
import ProductDetail from "./pages/ProductDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { loginSuccess } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(loginSuccess({ user, token }));
    }
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/market" element={<Market />} />
        <Route path="/market/:produceId" element={<ProductDetail />} />
        <Route
          path="/login"
          element={
            <span>
              <Login />
              <Signup />
            </span>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
