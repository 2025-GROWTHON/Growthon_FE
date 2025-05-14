import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Market from './pages/Market'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/market" element={<Market />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
