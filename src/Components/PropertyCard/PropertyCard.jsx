import React from "react";
import { Link } from "react-router-dom";
import "./PropertyCard.css";
const getInitials = (name) =>
  name?.split(" ").map((word) => word[0]).join("").toUpperCase();

const UserAvatar = ({ name }) => {
  const initials = getInitials(name);
  return (
    <div style={{
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "orange",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold"
    }}>
      {initials}
    </div>
  );
};

const PropertyCard = ({ property, currentImageIndex }) => {
  return (
    <Link to={`/property/${property._id}`} className="property-card-link">
      <div className="flexColStart r-card">
        <div className="relative">
          <img
            className="w-100 p-1"
            src={property.images?.[currentImageIndex]?.url || "/noImage.png"}
            alt="Property"
          />
        </div>
        <span className="secondaryText r-price">
          <span style={{ color: "orange" }}>₹</span> {property.price}
        </span>
        <span className="primaryText">{property.title}</span>
        <span className="secondaryText text-wrap">{property.summary}</span>
        <span className="secondaryText">{property.category}</span>
        <span className="secondaryText">{property.location}</span>
        <span className="secondaryText d-flex align-items-center" style={{ color: "darkred" }}>
          <UserAvatar name={property.userId.name} />
          <span className="ms-2">{property.userId.name}</span>
        </span>
      </div>
    </Link>
  );
};

export default PropertyCard;
