import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Navbar1 from "./components/navbar";
import FarmerProfile from "./components/farmer";
import ProductDetail from "./components/productdetail";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Contact from "./components/contact";
import Crops from "./components/crops";
import Events from "./components/events";

const AppRoutes = () => {
  return (
    <>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/farmer/:id" element={<FarmerProfile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/crops" element={<Crops />} />
        <Route path="/events" element={<Events />} />

      </Routes>
    </>
  );
};

export default AppRoutes;
