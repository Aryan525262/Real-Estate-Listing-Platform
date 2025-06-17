import React, { useContext, useEffect, useState } from "react";
import "./Residencies.css";
import { useLocation } from "react-router-dom";
import PropertyContext from "../context/Property/PropertyContext";
import SearchBar from "../SearchBar/SearchBar";
import ApiResidencies from "./ApiResidencies";
import PropertyCard from "../PropertyCard/PropertyCard";

const Residencies = () => {
  const context = useContext(PropertyContext);
  const { allProperties, showProperty } = context;
  const { state } = useLocation();
  const loc = state?.location || "";
  const [currentIndexes, setCurrentIndexes] = useState({});
  const data = allProperties?.properties || [];

  // Filter by location if provided
  const filteredData =
    loc.trim() !== ""
      ? data.filter((property) =>
          property.location.toLowerCase().includes(loc.toLowerCase())
        )
      : data;

  // Fetch properties on initial mount
  useEffect(() => {
    showProperty(loc);
  }, [loc]);

  // Initialize image indexes for carousel
  useEffect(() => {
    if (data?.length > 0) {
      const initialIndexes = {};
      data.forEach((property) => {
        initialIndexes[property._id] = 0;
      });
      setCurrentIndexes(initialIndexes);
    }
  }, [data]);

  // Helper to chunk properties into groups of 10
  const chunkedProperties = [];
  for (let i = 0; i < filteredData.length; i += 10) {
    chunkedProperties.push(filteredData.slice(i, i + 10));
  }

  return (
    <section className="r-wrapper" id="residencies">
      <SearchBar />
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="primaryText">Properties For You</span>
        </div>

        {filteredData.length === 0 ? (
          <div>No Properties Found for "{loc}"</div>
        ) : (
          chunkedProperties.map((propertyRow, index) => (
            <div key={index} className="property-row">
              {propertyRow.map((card) => (
                <PropertyCard
                  key={card._id}
                  property={card}
                  currentImageIndex={currentIndexes[card._id] || 0}
                />
              ))}
            </div>
          ))
        )}
      </div>
      <ApiResidencies />
    </section>
  );
};

export default Residencies;
