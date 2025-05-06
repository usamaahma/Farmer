import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./farmer.css";

const FarmerProfile = () => {
  // Farmer data
  const farmer = {
    id: 1,
    name: "Ali Farms",
    location: "Punjab, Pakistan",
    rating: 4.8,
    experience: "15 years",
    farmSize: "50 acres",
    about:
      "We are a family-owned farm specializing in organic wheat, rice, and cotton production. Our farm has been operating for three generations, using sustainable farming practices.",
    image:
      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    crops: ["Wheat", "Rice", "Cotton"],
    certifications: ["Organic Certified", "Fair Trade"],
  };

  // Farmer's products
  const products = [
    {
      id: 1,
      name: "Organic Wheat",
      price: "Rs. 1200/kg",
      description:
        "Premium quality organic wheat grown without synthetic pesticides",
      image:
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      available: "In Stock",
      rating: 4.7,
    },
    {
      id: 2,
      name: "Basmati Rice",
      price: "Rs. 1800/kg",
      description:
        "Authentic Pakistani basmati rice with long grains and aromatic flavor",
      image:
        "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80",
      available: "In Stock",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Organic Cotton",
      price: "Rs. 2500/kg",
      description: "Chemical-free cotton grown with sustainable practices",
      image:
        "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      available: "Limited Stock",
      rating: 4.5,
    },
    {
      id: 4,
      name: "Wheat Flour",
      price: "Rs. 1000/kg",
      description: "Freshly milled whole wheat flour",
      image:
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      available: "In Stock",
      rating: 4.6,
    },
  ];

  return (
    <div className="farmer-profile-page">
      {/* Farmer Header Section */}
      <section className="farmer-header">
        <div className="farmer-image-container">
          <img
            src={farmer.image}
            alt={farmer.name}
            className="farmer-main-image"
          />
          <div className="farmer-rating">
            <span className="stars">★★★★★</span>
            <span>{farmer.rating}</span>
          </div>
        </div>

        <div className="farmer-info">
          <h1>{farmer.name}</h1>
          <div className="location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{farmer.location}</span>
          </div>

          <div className="farmer-stats">
            <div className="stat-item">
              <i className="fas fa-history"></i>
              <span>{farmer.experience} experience</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-tractor"></i>
              <span>{farmer.farmSize}</span>
            </div>
          </div>

          <div className="crops-section">
            <h3>Main Crops:</h3>
            <div className="crops-list">
              {farmer.crops.map((crop, index) => (
                <span key={index} className="crop-tag">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          <div className="certifications">
            <h3>Certifications:</h3>
            <div className="certification-list">
              {farmer.certifications.map((cert, index) => (
                <span key={index} className="cert-tag">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Farmer Section */}
      <section className="about-section">
        <h2>About Our Farm</h2>
        <p>{farmer.about}</p>

        <div className="contact-button-container">
          <button className="contact-button">
            <i className="fas fa-envelope"></i> Contact Farmer
          </button>
          <button className="whatsapp-button">
            <i className="fab fa-whatsapp"></i> Chat on WhatsApp
          </button>
        </div>
      </section>

      {/* Farmer's Products Carousel */}
      <section className="products-section">
        <div className="section-header">
          <h2>Our Products</h2>
          <p>Fresh from our farm to your home</p>
        </div>

        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          autoPlay={false}
          centerMode={true}
          centerSlidePercentage={33}
          className="products-carousel"
        >
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div
                className="product-image"
                style={{ backgroundImage: `url(${product.image})` }}
              ></div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <p className="price">{product.price}</p>
                <p className="availability">{product.available}</p>
                <div className="product-rating">
                  <span className="stars">★★★★★</span>
                  <span>{product.rating}</span>
                </div>
                <p className="description">{product.description}</p>
                <button className="add-to-cart">Add to Cart</button>
                <button className="view-details">View Details</button>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Farm Location Section */}
      <section className="location-section">
        <h2>Our Farm Location</h2>
        <div className="map-container">
          {/* This would be replaced with an actual map component */}
          <div className="map-placeholder">
            <i className="fas fa-map-marked-alt"></i>
            <p>Map of {farmer.location} would display here</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerProfile;
