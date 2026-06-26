
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./Components/Navbar"
import Footer from "./Components/Footer"
import About from "./pages/About"
import Disclaimer from "./pages/Disclaimer"
import ReturnPolicy from "./pages/ReturnPolicy"
import Register from "./pages/Register"
import Login from "./pages/Login"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
function App() {
 
  return (
    <Router>
         <Navbar/>
      <Routes>
 
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/disclaimer" element={<Disclaimer/>} />
        <Route path="/return" element={<ReturnPolicy/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
      </Routes>
    <Footer/>
    </Router>
  )
}

export default App
