import React, { useContext, useEffect, useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import OutsideClickHandler from "react-outside-click-handler";
import {Link, useLocation, useNavigate } from 'react-router-dom';
import PropertyContext from "../context/Property/PropertyContext";
const Header = () => {
  let history = useNavigate();
  const location = useLocation();
  const [seen, setSeen] = useState(false)
  const context = useContext(PropertyContext);
  const { getUserData , userData} = context;
  const togglePop = () => {
      setSeen(!seen);
  };
  const [menuOpened, setMenuOpened] = useState(false);
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  const token = localStorage.getItem("token");
  const headerProfileClick =()=>{
    history("/profile");
  }
  const handleLogout = ()=>{
    localStorage.removeItem("token");
    history("/Login");
    console.log("Logout Successfully");
  }
  useEffect(()=>{
    getUserData();
  },[]);
  useEffect(()=>{
    if(!token){
      console.error("No auth-token found. Redirecting to Login page.");
      history("/Login");
      return;
    }
  }, []);
  return (
    <>
    <nav className="h-wrapper">
      <div className="flexCenter  paddings innerWidth h-container">
        <div className="logo" style={{color:"white"}}>
          <Link to="/">FindHome</Link>
        </div>
        <OutsideClickHandler 
        onOutsideClick={()=>{setMenuOpened(false)}}>
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <Link to="/">Home</Link>
            <Link to="/partners">Partners</Link>
            <Link to="/residencies">Properties</Link>
            <Link to="/values">Our Values</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/getStarted">Get Started</Link>
            <Link to="/notification">Notifications</Link>
            <button className="button">
              <Link to="mailto:example.com">Contact</Link>
            </button>
            {!localStorage.getItem("token")?<button className="button">
              <Link to="/login" >Login/SignUp</Link>
            </button>: <button className="button" onClick={handleLogout}>Logout</button>}
            <div className="profile-icon d-flex align-items-end " onClick = {headerProfileClick}>
              <div className="d-flex border border-dark border-2 rounded-circle " style={{width:"50px", height:"50px"}}>
                <img className="profileImage rounded-circle " src="profileImage.png" alt="Profile Image" />
              </div>
              <p >{userData ? userData.name: "Guest user"}</p>
            </div>
          </div>
        </OutsideClickHandler>
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </nav>
    </>
  );
};

export default Header;