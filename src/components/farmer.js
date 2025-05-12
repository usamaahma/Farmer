import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./farmer.css";
import { users, crops } from "../utils/axios"; // Add the crops import

const FarmerProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [farmerCrops, setFarmerCrops] = useState([]); // To store the crops data

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const response = await users.get(id);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching farmer:", error);
        setLoading(false);
      }
    };

    // Fetch crops posted by the farmer
    const fetchCrops = async () => {
      try {
        const response = await crops.get(`/user?postedBy=${id}`);
        setFarmerCrops(response.data.results);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchFarmer();
    fetchCrops(); // Fetch crops when the component loads
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!user || !user.farmer)
    return <div className="error">Farmer not found.</div>;

  const farmer = user.farmer;

  return (
    <div className="farmer-profile-page">
      {/* Header */}
      <section className="farmer-header">
        <div className="farmer-image-container">
          <img
            src={farmer.image}
            alt={user.name}
            className="farmer-main-image"
          />
          <div className="farmer-rating">
            <span className="stars">★★★★★</span>
            <span>4.9</span> {/* Static or dynamic */}
          </div>
        </div>

        <div className="farmer-info">
          <h1>{user.name}</h1>
          <div className="location">
            <i className="fas fa-map-marker-alt"></i>
            <span>{farmer.location}</span>
          </div>

          <div className="farmer-stats">
            <div className="stat-item">
              <i className="fas fa-history"></i>
              <span>{farmer.experience} years experience</span>
            </div>
            <div className="stat-item">
              <i className="fas fa-tractor"></i>
              <span>{farmer.area} acres</span>
            </div>
          </div>

          <div className="crops-section">
            <h3>Main Crops:</h3>
            <div className="crops-list">
              {farmer.mainCrops.map((crop, index) => (
                <span key={index} className="crop-tag">
                  {crop}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Certifications Section */}
          {/* <div className="certifications">
            <h3>Certifications:</h3>
            <div className="certification-list">
              <span className="cert-tag">Organic</span>
            </div>
          </div> */}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Me</h2>
        <p>{farmer.details}</p>
        <div className="contact-button-container">
          <a href={`mailto:${user.email}`} className="contact-button">
            <i className="fas fa-envelope"></i> Contact Farmer
          </a>
          <a
            href={`https://wa.me/${farmer.contact}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            <i className="fab fa-whatsapp"></i> Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Crops Section */}
      <section className="farmer-crops-section">
        <h2>Crops Posted by {user.name}</h2>
        <div className="crops-list">
          {farmerCrops.length > 0 ? (
            farmerCrops.map((crop, index) => (
              <div key={index} className="crop-card">
                <img src={crop.image} alt={crop.name} className="crop-image" />
                <div className="crop-details">
                  <h3>{crop.name}</h3>
                  <p>{crop.description}</p>
                  <p className="price">Price: {crop.price}</p>
                  <button className="view-details">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <p>No crops posted yet.</p>
          )}
        </div>
      </section>

      {/* Location Map */}
      <section className="location-section">
        <h2>Our Farm Location</h2>
        <div className="map-container">
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
