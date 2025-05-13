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
        setCropList(response.data.results); // array
      } catch (error) {
        console.error("Error fetching crops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleBuyNow = (crop) => {
    alert(`Buying: ${crop.name} for Rs ${crop.price}`);
    // Yahan future me navigate ya cart logic laga sakte ho
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
                onClick={() => handleBuyNow(crop)}
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
