import React from "react";
import { Routes, Route } from "react-router-dom";
import PropertyState from "./Components/context/Property/PropertyState";

// Layout Components
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Pages / Components
import GetStarted from "./Components/GetStarted/GetStarted";
import Hero from "./Components/Hero/Hero";
import Partners from "./Components/Partners/Partners";
import Profile from "./Components/Profile/Profile";
import Contact from "./Components/Contact/Contact";
import Filter from "./Components/Filter/Filter";
import PropertyCard from "./Components/PropertyCard/PropertyCard";
import Recommendations from "./Components/Recommendations/Recommendations";
import BookVisit from "./Components/BookVisit/BookVisit";
import SellerDashboard from "./Components/SellerDashboard/SellerDashboard";
import SellerNotifications from "./Components/SellerNotifications/SellerNotifications";
import PropertyApiDetails from "./Components/PropertyApiDetails/PropertyApiDetails";
import Residencies from "./Components/Residencies-crousel/Residencies";
import SearchBar from "./Components/SearchBar/SearchBar";
import Values from "./Components/Values/Values";
import PropertyDetails from "./Components/Residencies-crousel/PropertyDetails";

const App = () => {
  return (
    <PropertyState>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/property-card" element={<PropertyCard />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/book-visit" element={<BookVisit />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
        <Route path="/notifications" element={<SellerNotifications />} />
        <Route path="/property-details/:id" element={<PropertyApiDetails />} />
        <Route path="/residencies" element={<Residencies />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/bookVisit" element={<BookVisit/>} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/values" element={<Values />} />
      </Routes>
      <Footer />
    </PropertyState>
  );
};

export default App;
