import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Contact from './pages/Contact'

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
