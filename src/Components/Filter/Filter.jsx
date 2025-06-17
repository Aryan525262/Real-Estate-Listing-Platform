import React, { useState } from "react";
import axios from "axios";
import "./Filter.css";
const Filter = ({ onRecommendations }) => {
  const [preferences, setPreferences] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5001/recommend", {
        preferences,
        category,
        location,
        min_price: minPrice ? parseInt(minPrice) : null,
        max_price: maxPrice ? parseInt(maxPrice) : null,
      });

      onRecommendations(response.data.recommended);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
    }
  };

  return (
    <div className="filter-container">
      <h2 className="filter-title">Filter Properties</h2>
      <form onSubmit={handleSubmit} className="filter-form">
        {/* Preferences Input */}
        <div className="form-group">
          <label htmlFor="preferences">Preferences</label>
          <input
            type="text"
            id="preferences"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g., luxury villa beachfront"
            className="form-input"
          />
        </div>

        {/* Category Input */}
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., villa, apartment"
            className="form-input"
          />
        </div>

        {/* Location Input */}
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., beachfront, city center"
            className="form-input"
          />
        </div>

        {/* Price Range Inputs */}
        <div className="form-group">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g., 1000000"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g., 5000000"
            className="form-input"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Get Recommendations
        </button>
      </form>
    </div>
  );
};

export default Filter;