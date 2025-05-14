import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
