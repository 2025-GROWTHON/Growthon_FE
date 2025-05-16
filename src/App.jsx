import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Market from './pages/Market';
import ProductDetail from './pages/ProductDetail'
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
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
