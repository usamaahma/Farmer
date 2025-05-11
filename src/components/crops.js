import React from "react";
import "./crops.css";

const cropsData = [
  {
    id: 1,
    name: "Wheat",
    quantity: 100,
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    farmer: "Ali Raza",
  },
  {
    id: 2,
    name: "Sugarcane",
    quantity: 50,
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    farmer: "Zahid Khan",
  },
  {
    id: 3,
    name: "Cotton",
    quantity: 80,
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    farmer: "Bilal Hussain",
  },
];

const Crops = () => {
  return (
    <div className="crop-container">
      <h2 className="crop-heading">Available Crops</h2>
      <div className="crop-grid">
        {cropsData.map((crop) => (
          <div key={crop.id} className="crop-card">
            <img src={crop.image} alt={crop.name} className="crop-img" />
            <div className="crop-info">
              <h3>{crop.name}</h3>
              <p>
                <strong>Quantity:</strong> {crop.quantity} maund
              </p>
              <p>
                <strong>Farmer:</strong> {crop.farmer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crops;
