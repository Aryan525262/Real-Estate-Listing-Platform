import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropertyContext from "../context/Property/PropertyContext";
import Recommendations from "../Recommendations/Recommendations";
// import Filter from "../Filter/Filter";

const Profile = () => {
  const { userData, getUserData, myproperties, getProperties } =
    useContext(PropertyContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const properties = myproperties?.properties || [];
  // const [recommendedProperties, setRecommendedProperties] = useState([]);

  useEffect(() => {
    if (!token) {
      console.error("No auth-token found. Redirecting to Login page.");
      navigate("/Login");
      return;
    }
    getUserData();
  }, []);

  useEffect(() => {
    getProperties();
  }, []);

  if (!userData) {
    return <p>No user data available. Please login again.</p>;
  }

  const getInitials = (name) => {
    return name?.split(" ").map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.profileCard}>
        <div style={styles.avatar}>{getInitials(userData.name)}</div>
        <div>
          <h2 style={{ margin: 0 }}>{userData.name}</h2>
          <p style={{ color: "#555" }}>{userData.email}</p>
        </div>
      </div>

      {/* Properties Section */}
      <div style={styles.propertySection}>
        <h3 style={styles.sectionTitle}>Your Properties</h3>
        {properties.length === 0 ? (
          <p>You have not listed any properties yet.</p>
        ) : (
          <div style={styles.propertyGrid}>
            {properties.map((property) => {
              const imageUrl =
                property.images?.length > 0
                  ? property.images[0].url
                  : "/noImage.png"; // fallback image

              return (
                <div key={property._id} style={styles.card}>
                  <img
                    src={imageUrl}
                    alt={property.title}
                    style={styles.cardImage}
                  />
                  <div style={styles.cardContent}>
                    <h4 style={styles.cardTitle}>{property.title}</h4>
                    <p style={styles.cardCategory}>
                      <strong>Type:</strong> {property.category}
                    </p>
                    <p style={styles.cardPrice}>
                      <strong>Price:</strong> ₹ {property.price}
                    </p>
                    <p style={styles.cardLocation}>
                      <strong>Location:</strong> {property.location}
                    </p>
                    <p style={styles.cardDescription}>
                      {property.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Filter and Recommendations Section */}
      {/* <div style={styles.filterSection}>
        <h3 style={styles.sectionTitle}>Find Recommended Properties</h3>
        <Filter onRecommendations={setRecommendedProperties} />
      </div> */}
        <Recommendations userPreferences="luxury villa pool" />
    </div>
  );
};

// Stylish CSS-in-JS
const styles = {
  container: {
    maxWidth: "1100px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f7f9fc",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    marginBottom: "30px",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "20px",
  },
  propertySection: {
    marginTop: "20px",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "15px",
  },
  propertyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    backgroundColor: "#fff",
    transition: "transform 0.2s ease-in-out",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },
  cardContent: {
    padding: "15px",
    flexGrow: 1,
  },
  cardTitle: {
    margin: "0 0 8px",
    fontSize: "18px",
    fontWeight: "600",
  },
  cardCategory: {
    color: "#444",
    marginBottom: "5px",
  },
  cardPrice: {
    color: "#28a745",
    fontWeight: "500",
    marginBottom: "5px",
  },
  cardLocation: {
    color: "#555",
    marginBottom: "5px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
    marginTop: "10px",
  },
  filterSection: {
    marginTop: "40px",
  },
};

export default Profile;