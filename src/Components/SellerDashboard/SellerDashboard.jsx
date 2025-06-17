// src/pages/SellerDashboard.jsx
import React, { useContext } from 'react';
import SellerNotifications from '../Components/SellerNotifications';
import PropertyContext from '../context/Property/PropertyContext';

const SellerDashboard = () => {
  const { userData, getUserData} = useContext(PropertyContext);
  const token = localStorage.getItem("token");
  useEffect(() => {
      if (!token) {
        console.error("No auth-token found. Redirecting to Login page.");
        navigate("/Login");
        return;
      }
      getUserData();
    }, []);
    
    if(userData.role === "seller"){
      const sellerId = localStorage.getItem('sellerId'); // Make sure to set this on login
      if (!sellerId) return <p>Please log in as a seller to view this page.</p>;
    }
  return (
    <div>
      <h1>Seller Dashboard</h1>
      <SellerNotifications sellerId={sellerId} />
    </div>
  );
};

export default SellerDashboard;
