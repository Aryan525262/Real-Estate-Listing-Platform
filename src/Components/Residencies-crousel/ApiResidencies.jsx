import React, { useContext, useEffect, useState } from "react";
import "./Residencies.css";
import { Link, useLocation } from "react-router-dom";
import PropertyContext from "../context/Property/PropertyContext";
import apiPropertiesData from "./dataProp.json";

const ApiResidencies = () => {
  const context = useContext(PropertyContext);
  const {userData, getUserData} = context;
  const { state } = useLocation();
  const loc = state?.location || "";
  const [currentIndexes, setCurrentIndexes] = useState({});
  const data = apiPropertiesData?.data || [];

  // Initialize image indexes for carousel
  useEffect(()=>{
    getUserData();  
  },[])
  useEffect(() => {
    if (data?.length > 0) {
      const initialIndexes = {};
      data.forEach((property) => {
        initialIndexes[property.id] = 0;
      });
      setCurrentIndexes(initialIndexes);
    }
  }, [data]);

  const getInitials = (nameObj) => {
    const name = nameObj?.customer?.branchDisplayName || "Agent";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const UserAvatar = (nameObj) => {
    const initials = getInitials(nameObj);
    return (
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: "Orange",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        {initials}
      </div>
    );
  };

  // Chunk data into groups of 10
  const chunkedProperties = [];
  for (let i = 0; i < data.length; i += 10) {
    chunkedProperties.push(data.slice(i, i + 10));
  }

  return (
    <section className="r-wrapper" id="resdencies">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="primaryText">Properties For You</span>
        </div>

        {data.length === 0 ? (
          <div>No Properties Found for "{loc}"</div>
        ) : (
          chunkedProperties.map((group, idx) => (
            <div className="property-row" key={idx}>
              {group.map((card) => (
                <Link to={`/propertyApiDetails/${card.id}`} key={card.id}>
                  <div className="flexColStart r-card">
                    <div className="relative">
                      <img
                        className="w-100 p-1"
                        src={
                          card.propertyImages?.images?.[currentIndexes[card.id]]?.srcUrl ||
                          "/noImage.png"
                        }
                        alt="Property"
                      />
                    </div>
                    <span className="secondaryText r-price">
                      <span style={{ color: "orange" }}>₹</span>
                      <span style={{ color: "Black" }}>
                        {card.price?.amount || "N/A"}
                      </span>
                    </span>
                    <span className="primaryText">
                      {card.propertyTypeFullDescription || "No Title"}
                    </span>
                    <span className="secondaryText text-wrap">
                      {card.summary?.slice(0, 100) + "..."}
                    </span>
                    <span className="secondaryText">
                      {card.displayAddress || "Location not available"}
                    </span>
                    <span className="secondaryText" style={{ color: "darkred" }}>
                      <div className="d-flex align-items-center gap-2">
                        {UserAvatar(card)}
                        {card.customer?.branchDisplayName || "Agent"}
                      </div>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))
        )}
      </div>
      {userData?.role === "seller"?(
        <div className="d-flex justify-content-center">
          <Link className="mx-2 btn btn-primary" to="/CreateProperties" role="button">
            Sell Properties
          </Link>
        </div>)
        : null
      }
      
    </section>
  );
};

export default ApiResidencies;
