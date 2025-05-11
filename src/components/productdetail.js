// src/components/ProductDetail.js
import React from "react";
import { useParams } from "react-router-dom";
import "./productdetail.css"; // Import the CSS file

const dummyProductData = {
  id: "1",
  name: "Custom T-Shirt",
  farmer: "John Doe",
  description:
    "This is a high-quality custom t-shirt made from 100% cotton. It is comfortable and fits perfectly for all occasions.",
  price: "$19.99",
  image: "https://via.placeholder.com/500x500",
};

const ProductDetail = () => {
  const { id } = useParams();

  const product = dummyProductData;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="farmer-name">By {product.farmer}</p>
          <p className="price">{product.price}</p>
          <p className="description">{product.description}</p>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
