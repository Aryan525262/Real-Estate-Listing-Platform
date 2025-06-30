import React, { useState } from "react";
import "./Hero.css";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import {motion} from 'framer-motion';
import Residencies from "../Residencies-crousel/Residencies";
import { Link, useNavigate } from "react-router-dom";
const Hero = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const handleLocation = ()=>{
    if(inputValue.trim()){
      navigate("/residencies",{state: {location: inputValue}});
    }
  }
  const handleClick = (e)=>{
    console.log(e.target.value)
    setInputValue(e.target.value);
  }
  return (
    <section className="hero-wrapper bg-black" >
      <div className="paddings flexCenter innerWidth hero-container ">
        {/* Left Hero */}
        <div className="flexColStart flexCenter hero-left">
          <div className="hero-title">
            <div className="hero-orange" />
            <motion.h1
            initial={{y:"2rem",opacity:0}}
            animate={{y:0 ,opacity:1}}
            transition={{
              duration:2,
              type:"ease-in"
            }}
            >
              Explore <br /> Most Suitable <br /> Property
            </motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className="secondaryText">Find a variety of properties that suit you very easily</span>
            <span className="secondaryText">Forget all dificulties in finding a residence for you</span>
          </div>
          <div className="flexCenter search-bar">
            <HiLocationMarker color="var(--blue)" size={25} />
            <input type="text" placeholder="Location" value= {inputValue} onChange={handleClick} />
            <button className="button" onClick={handleLocation} >Search</button>
          </div>
          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={5500} end={6000} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Premium Products</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp start={2000} end={4500} duration={4} />
                <span>+</span>
              </span>
              <span className="secondaryText">Happy Customers</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                <CountUp  end={19}  />
                <span>+</span>
              </span>
              <span className="secondaryText">Awards Winnings</span>
            </div>
          </div>
        </div>
        {/* Right Hero */}
        <div className="flexCenter hero-right">
          <motion.div className="image-container"
          initial={{x:"7rem",opacity:0}}
          animate={{x:0,opacity:1}}
          transition={{
            duration:3,
            type:"spring"
          }}
          >
            <img src="./prop1.jpg" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;