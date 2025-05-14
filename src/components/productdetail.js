import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { crops } from "../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const response = await crops.get(`/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching crop:", error);
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.warn("Please login to continue.", {
        position: "top-center",
        autoClose: 2000,
      });
      return setTimeout(() => navigate("/login"), 2000); // Redirect to login page after warning
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex !== -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success(`${product.name} added to cart!`, {
      position: "top-center",
      autoClose: 2000,
    });

    // Navigate to the cart page
    navigate("/cart");
  };
  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="product-detail-container">
      <ToastContainer />
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
          <button className="buy-button" onClick={handleBuyNow}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
