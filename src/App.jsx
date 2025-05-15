import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Signup />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
