import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./components/landing";
import Navbar1 from "./components/navbar";
import FarmerProfile from "./components/farmer";
import ProductDetail from "./components/productdetail";

const AppRoutes = () => {
  return (
    <>
      <Navbar1 />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/farmer/:id" element={<FarmerProfile />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
