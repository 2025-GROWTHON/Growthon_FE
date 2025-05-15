import './App.css'
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import MarketList from './components/MarketList';
import ProductDetail from './pages/ProductDetail'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/market" element={<MarketList />} />
        <Route path="/market/:producdId" element={<ProductDetail />} /> 
      </Routes>
      <Footer />
    </>
  )
}

export default App
