import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recommendations.css"; // Add this CSS file for styling

const Recommendations = ({ userPreferences }) => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.post("http://localhost:5001/recommend", {
          preferences: userPreferences || "villa luxury pool",
        });
        console.log(userPreferences);
        console.log(res.data.recommended);
        setRecommended(res.data.recommended);
      } catch (err) {
        console.error("Error fetching recommendations", err);
      }
    };
    fetchRecommendations();
  }, [userPreferences]);

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Recommended Properties</h2>
      {recommended.length === 0 ? (
        <p className="no-recommendations">No recommendations available.</p>
      ) : (
        <div className="recommendations-grid">
          {recommended.map((property) => (
            <div key={property._id} className="property-card">
              {/* Property Image */}
              {property.images.length > 0 ? (
                <img
                  src={property.images[0].url}
                  alt={property.title}
                  className="property-image"
                />
              ) : (
                <div className="no-image">No Image Available</div>
              )}

              {/* Property Details */}
              <div className="property-details">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-description">{property.description}</p>
                <p className="property-location">{property.location}</p>
                <p className="property-price">
                  ₹ {property.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;