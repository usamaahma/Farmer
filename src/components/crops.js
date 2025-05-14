import React, { useEffect, useState } from "react";
import { crops } from "../utils/axios";
import "./crops.css";

const CropList = () => {
  const [cropList, setCropList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await crops.get("/");
        setCropList(response.data.results);
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleBuyNow = (crop) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Existing cart or empty array

    const existingIndex = cart.findIndex((item) => item.id === crop.id);

    if (existingIndex !== -1) {
      // Crop already in cart, increase quantity
      cart[existingIndex].quantity += 1;
    } else {
      // New crop, add with quantity
      cart.push({ ...crop, quantity: 1 });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to cart page
    window.location.href = "/cart";
  };

  if (loading) return <p>Loading...</p>;
  if (!cropList.length) return <p>No crops found.</p>;

  return (
    <div className="crop-container">
      <h2 className="crop-heading">Available Crops</h2>
      <div className="crop-grid">
        {cropList.map((crop) => (
          <div key={crop.id} className="crop-card">
            <img src={crop.image} alt={crop.name} className="crop-img" />
            <div className="crop-info">
              <h3>{crop.name}</h3>
              <p>
                <strong>Price:</strong> Rs {crop.price}
              </p>
              <p>
                <strong>In Stock:</strong> {crop.inStock ? "Yes" : "No"}
              </p>
              <p>
                <strong>Details:</strong> {crop.details}
              </p>
              <p>
                <strong>Reviews:</strong>{" "}
                {crop.reviews && crop.reviews.length
                  ? crop.reviews.join(", ")
                  : "No reviews"}
              </p>
              <button
                className="buy-now-btn"
                onClick={() => {
                  handleBuyNow(crop);
                  window.location.href = "/cart"; // redirect after adding to cart
                }}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropList;
