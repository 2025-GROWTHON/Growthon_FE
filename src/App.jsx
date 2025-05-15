import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
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
