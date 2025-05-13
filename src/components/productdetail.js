import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { crops } from "../utils/axios";
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await crops.get(`/${id}`);
        setProduct(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crop:", error);
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="farmer-name">
            By {product.postedBy?.name || "Unknown"}
          </p>
          <p className="price">Rs {product.price}</p>
          <p className="description">{product.details}</p>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
