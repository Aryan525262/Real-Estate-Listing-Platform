import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyContext from "../context/Property/PropertyContext";
import "./PropertyApiDetails.css"; // Ensure this has necessary styles
import data from "./data.json";
const PropertyApiDetails = () => {
  const { id } = useParams();
//   const { apiPropertyDetails, apiPropDetails } = useContext(PropertyContext);
  const [index, setIndex] = useState(0);

//   useEffect(() => {
//     apiPropertyDetails(id);
//   }, [id]);
  const apiPropDetails = data;
  const propertyData = apiPropDetails?.data || {};
  const images = propertyData?.images || [];

  return (
    <div className="property-details">
      <h1>Property Details</h1>

      {/* Custom Image Carousel */}
      <div className="image-preview">
        <h2>Images:</h2>
        {images.length > 0 ? (
          <div
            className="carousel-container"
            style={{
              position: "relative",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            <img
              src={images[index]?.resizedImageUrls?.size656x437 || "/noImage.png"}
              alt={`Property Image ${index + 1}`}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            />

            {/* Left Button */}
            <button
              onClick={() =>
                setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              &#8592;
            </button>

            {/* Right Button */}
            <button
              onClick={() =>
                setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              &#8594;
            </button>
          </div>
        ) : (
          <img
            src="/noImage.png"
            alt="No Image Available"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          />
        )}
      </div>

      {/* Address Section */}
      <div className="section">
        <h2>Address:</h2>
        <p>{propertyData?.address?.displayAddress}</p>
        <p>{propertyData?.address?.ukCountry}</p>
        <p>
          {propertyData?.address?.outcode} {propertyData?.address?.incode}
        </p>
      </div>

      {/* Basic Information Section */}
      <div className="section">
        <h2>Basic Information:</h2>
        <p>Bathrooms: {propertyData?.bathrooms}</p>
        <p>Bedrooms: {propertyData?.bedrooms}</p>
      </div>

      {/* Broadband Information Section */}
      <div className="section">
        <h2>Broadband Information:</h2>
        <a
          href={propertyData?.broadband?.broadbandCheckerUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Broadband Speed
        </a>
        <p
          dangerouslySetInnerHTML={{
            __html: propertyData?.broadband?.disclaimer,
          }}
        />
      </div>

      {/* Contact Information Section */}
      <div className="section">
        <h2>Contact Information:</h2>
        <p>Contact via: {propertyData?.contactInfo?.contactMethod}</p>
        <p>Phone: {propertyData?.contactInfo?.telephoneNumbers?.localNumber}</p>
      </div>

      {/* Customer Information Section */}
      <div className="section">
        <h2>Customer Information:</h2>
        <img
          src={propertyData?.customer?.logoPath || "/noImage.png"}
          alt="Customer Logo"
        />
        <p>{propertyData?.customer?.branchDisplayName}</p>
        <div
          dangerouslySetInnerHTML={{
            __html:
              propertyData?.customer?.customerDescription
                ?.truncatedDescriptionHTML || "",
          }}
        />
        <a
          href={propertyData?.customer?.customerProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Profile
        </a>
        <p>
          <a
            href={propertyData?.customer?.mpuAd}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Advertisement
          </a>
        </p>
      </div>

      {/* EPC Information Section */}
      <div className="section">
        <h2>EPC Information:</h2>
        {propertyData?.epcGraphs?.map((graph, index) => (
          <div key={index}>
            <h3>{graph.caption}</h3>
            <a href={graph.url} target="_blank" rel="noopener noreferrer">
              View EPC
            </a>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="section">
        <h2>Features:</h2>
        <ul>
          {propertyData?.features?.garden?.map((feature, index) => (
            <li key={index}>{feature.displayText}</li>
          ))}
          {propertyData?.features?.parking?.map((feature, index) => (
            <li key={index}>{feature.displayText}</li>
          ))}
        </ul>
      </div>

      {/* Floorplans Section */}
      <div className="section">
        <h2>Floorplans:</h2>
        <a
          href={propertyData?.floorplans?.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View Floorplan: {propertyData?.floorplans?.caption}
        </a>
      </div>

      {/* Brochures Section */}
      <div className="section">
        <h2>Brochures:</h2>
        {propertyData?.brochures?.map((brochure, index) => (
          <div key={index}>
            <a href={brochure.url} target="_blank" rel="noopener noreferrer">
              {brochure.caption}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyApiDetails;
