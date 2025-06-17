import React from "react";
import { Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Pages / Components
import GetStarted from "./Components/GetStarted";
import Hero from "./Components/Hero";
import Partners from "./Components/Partners";
import Profile from "./Components/Profile";
import Contact from "./Components/Contact";
import Filter from "./Components/Filter";
import PropertyCard from "./Components/PropertyCard";
import Recommendations from "./Components/Recommendations";
import BookVisit from "./Components/BookVisit";
import SellerDashboard from "./Components/SellerDashboard";
import SellerNotifications from "./Components/SellerNotifications";
import PropertyApiDetails from "./Components/PropertyApiDetails";
import ResidenciesCrousel from "./Components/Residencies-crousel";
import SearchBar from "./Components/SearchBar";
import Values from "./Components/Values";

const App = () => {
  return (
    <>
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
        <Route path="/residencies" element={<ResidenciesCrousel />} />
        <Route path="/search" element={<SearchBar />} />
        <Route path="/values" element={<Values />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
