import React from "react";
import "./Partners.css";
const Partners = () => {
  return (
    <section className="prt-wrapper">
        <span className="orangeText flexColStart v-right">Our Partners</span>
      <div className="paddings innerWidth flexCenter prt-container ">
        <img src="./comp1.jpeg" alt="" />
        <img src="./comp2.jpg" alt="" />
        <img src="./comp3.jpeg" alt="" />
        <img src="./comp4.jpeg" alt="" />
      </div>
    </section>
  );
};

export default Partners;
