import { Link, useNavigate } from "react-router-dom"
import "../styles/navbar.css";
import { useSelector } from 'react-redux';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
const Navbar = () =>{

  const {user,logout}= useContext(AuthContext)
  const cartItems = useSelector((state =>state.cart.cartItems))
  const navigate = useNavigate();

  const handleLogout = ()=>{
    logout();
    navigate('/logout');

  }
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <img src="" alt="" className="navbar-logo" />
            E-Commerce
          </Link>
        </div>
        <ul className="navbar-links">
          <a>
            <Link to="/shop" />
                Shop  </a>
          <a>
            <Link to="/Cart" />
             Cart
          </a>
          <a>
            <Link to="/profile" />
            Profile
          </a>
        </ul>
      </nav>
    );
}
export default Navbar;