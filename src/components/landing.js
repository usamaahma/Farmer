import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiSearch, FiX } from "react-icons/fi";
import { users, crops, event } from "../utils/axios";
import "./landing.css";

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [farmers, setFarmers] = useState([]);
  const [cropsData, setCropsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState({
    farmers: true,
    crops: true,
    events: true,
  });
  const [error, setError] = useState({
    farmers: null,
    crops: null,
    events: null,
  });
  const [allSuggestions, setAllSuggestions] = useState([]);

  // Location-based suggestions data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch farmers data
        const farmersResponse = await users.get("");
        const farmerUsers = farmersResponse.data.results.filter(
          (user) => user.role === "farmer"
        );
        setFarmers(farmerUsers);
        setLoading((prev) => ({ ...prev, farmers: false }));
        setError((prev) => ({ ...prev, farmers: null }));

        // Fetch crops data
        const cropsResponse = await crops.get("");
        setCropsData(cropsResponse.data.results);
        setLoading((prev) => ({ ...prev, crops: false }));
        setError((prev) => ({ ...prev, crops: null }));

        // Fetch events data
        const eventsResponse = await event.get("");
        setEventsData(eventsResponse.data.results);
        setLoading((prev) => ({ ...prev, events: false }));
        setError((prev) => ({ ...prev, events: null }));

        // Prepare suggestions from all data
        const farmerNames = farmerUsers.map((f) => f.name);
        const cropNames = cropsResponse.data.results.map((c) => c.name);
        const eventNames = eventsResponse.data.results.map((e) => e.eventName);
        const locations = [
          "Punjab",
          "Sindh",
          "KPK",
          "Balochistan",
          "Pakistan",
          "Lahore",
          "Karachi",
          "Islamabad",
          "Peshawar",
          "Quetta",
          "Faisalabad",
          "Rawalpindi",
          "Multan",
          "Gujranwala",
          "Hyderabad",
          "Sialkot",
          "Sargodha",
          "Bahawalpur",
          "Sukkur",
          "Larkana",
          "Sheikhupura",
          "Mardan",
          "Gujrat",
          "Kasur",
        ];

        setAllSuggestions(
          [
            ...new Set([
              ...farmerNames,
              ...cropNames,
              ...eventNames,
              ...locations,
            ]),
          ].filter(Boolean)
        ); // Remove any undefined/null values
      } catch (err) {
        // Error handling remains the same
        if (err.config.url.includes("users")) {
          setError((prev) => ({ ...prev, farmers: err.message }));
          setLoading((prev) => ({ ...prev, farmers: false }));
        } else if (err.config.url.includes("crops")) {
          setError((prev) => ({ ...prev, crops: err.message }));
          setLoading((prev) => ({ ...prev, crops: false }));
        } else if (err.config.url.includes("events")) {
          setError((prev) => ({ ...prev, events: err.message }));
          setLoading((prev) => ({ ...prev, events: false }));
        }
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    // No navigation needed, just filtering happens automatically
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filtered = allSuggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
  };

  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // Filter data based on search query
  const filterData = (
    data,
    isFarmer = false,
    isCrop = false,
    isEvent = false
  ) => {
    if (!searchQuery) return data;

    return data.filter((item) => {
      const searchLower = searchQuery.toLowerCase();

      // Check location
      if (item.location?.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Check name based on type
      if (isFarmer && item.name?.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (isCrop && item.name?.toLowerCase().includes(searchLower)) {
        return true;
      }

      if (isEvent && item.title?.toLowerCase().includes(searchLower)) {
        return true;
      }

      // For crops, also check farmer name
      if (isCrop && item.farmer?.toLowerCase().includes(searchLower)) {
        return true;
      }

      // For events, also check organizer name
      if (isEvent && item.farmer?.toLowerCase().includes(searchLower)) {
        return true;
      }

      return false;
    });
  };

  // Prepare farmer data for display
  const farmerDataForDisplay = filterData(
    farmers.map((farmer) => ({
      id: farmer.id,
      name: farmer.name || "Farm",
      location: farmer.location || "Pakistan",
      crops: farmer.crops || ["Various Crops"],
      rating: farmer.rating || 4.5,
      image:
        farmer.image ||
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    })),
    true // isFarmer
  );

  // Prepare crop data for display
  const cropDataForDisplay = filterData(
    cropsData.map((crop) => ({
      id: crop.id,
      name: crop.name || "Crop",
      price: crop.price ? `Rs. ${crop.price}/kg` : "Price not available",
      farmer: crop.postedBy?.name || "Local Farmer",
      location: crop.postedBy?.location || "Pakistan",
      image:
        crop.image ||
        "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      inStock: crop.inStock || false,
    })),
    false,
    true // isCrop
  );

  // Prepare event data for display
  const eventDataForDisplay = filterData(
    eventsData.map((event) => ({
      id: event._id,
      title: event.eventName || "Agriculture Event",
      date: event.createdAt
        ? new Date(event.createdAt).toLocaleDateString()
        : "Coming Soon",
      location: event.location || "Pakistan",
      image:
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
      farmer: event.farmerId?.name || "Agricultural Community",
      email: event.email,
    })),
    false,
    false,
    true // isEvent
  );

  const farmerChunks = chunkArray(farmerDataForDisplay, 3);
  const cropChunks = chunkArray(cropDataForDisplay, 3);
  const eventChunks = chunkArray(eventDataForDisplay, 2);

  if (loading.farmers || loading.crops || loading.events) {
    return <div className="loading">Loading data...</div>;
  }

  if (error.farmers || error.crops || error.events) {
    return (
      <div className="error">
        {error.farmers && <p>Error loading farmers: {error.farmers}</p>}
        {error.crops && <p>Error loading crops: {error.crops}</p>}
        {error.events && <p>Error loading events: {error.events}</p>}
      </div>
    );
  }

  return (
    <div className="landing-page">
      <section
        className="hero-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)`,
        }}
      >
        <div className="hero-content">
          <h1>Connecting Farmers with Buyers</h1>
          <p>
            Pakistan's premier digital marketplace for agricultural products
          </p>
          <div className={`search-container ${isFocused ? "focused" : ""}`}>
            <form className="search-bar" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search farmers, products, events or locations..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-button"
                    onClick={clearSearch}
                  >
                    <FiX />
                  </button>
                )}
              </div>
              <button type="submit" className="search-button">
                Search
              </button>
            </form>
            {suggestions.length > 0 && isFocused && (
              <div className="suggestions-dropdown">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <FiSearch className="suggestion-icon" />
                    <span>{suggestion}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="farmers-section">
        <div className="section-header">
          <h2>Featured Farmers</h2>
          <p>Connect directly with local farmers</p>
        </div>
        {farmerDataForDisplay.length > 0 ? (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={!searchQuery} // Disable auto-play when searching
            interval={5000}
            className="multi-card-carousel"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-left"
                >
                  &lt;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-right"
                >
                  &gt;
                </button>
              )
            }
          >
            {farmerChunks.map((chunk, index) => (
              <div key={index} className="carousel-slide">
                <div className="cards-container">
                  {chunk.map((farmer) => (
                    <div key={farmer.id} className="farmer-card">
                      <div
                        className="farmer-image"
                        style={{ backgroundImage: `url(${farmer.image})` }}
                      ></div>
                      <div className="farmer-info">
                        <h3>{farmer.name}</h3>
                        <p className="location">{farmer.location}</p>
                        <div className="crops">
                          {farmer.crops.map((crop, i) => (
                            <span key={i} className="crop-tag">
                              {crop}
                            </span>
                          ))}
                        </div>
                        <div className="rating">
                          <span className="stars">★★★★★</span>
                          <span>{farmer.rating}</span>
                        </div>
                        <button className="view-button">View Profile</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="no-farmers">
            {searchQuery
              ? "No farmers found in this location"
              : "No farmers found"}
          </div>
        )}
      </section>

      <section className="products-section">
        <div className="section-header">
          <h2>Fresh Farm Products</h2>
          <p>Direct from farm to your table</p>
        </div>
        {cropDataForDisplay.length > 0 ? (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={!searchQuery} // Disable auto-play when searching
            interval={5000}
            className="multi-card-carousel"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-left"
                >
                  &lt;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-right"
                >
                  &gt;
                </button>
              )
            }
          >
            {cropChunks.map((chunk, index) => (
              <div key={index} className="carousel-slide">
                <div className="cards-container">
                  {chunk.map((product) => (
                    <div key={product.id} className="product-card">
                      <div
                        className="product-image"
                        style={{ backgroundImage: `url(${product.image})` }}
                      ></div>
                      <div className="product-details">
                        <h3>{product.name}</h3>
                        <p className="farmer-name">By {product.farmer}</p>
                        <p className="location">{product.location}</p>
                        <p className="price">{product.price}</p>
                        {product.inStock ? (
                          <button className="buy-button">Buy Now</button>
                        ) : (
                          <button className="out-of-stock-button" disabled>
                            Out of Stock
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="no-products">
            {searchQuery
              ? "No products available in this location"
              : "No products available"}
          </div>
        )}
      </section>

      <section className="events-section">
        <div className="section-header">
          <h2>Upcoming Events</h2>
          <p>Workshops, expos and markets</p>
        </div>
        {eventDataForDisplay.length > 0 ? (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            autoPlay={!searchQuery} // Disable auto-play when searching
            interval={6000}
            className="multi-card-carousel"
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-left"
                >
                  &lt;
                </button>
              )
            }
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  className="carousel-arrow carousel-arrow-right"
                >
                  &gt;
                </button>
              )
            }
          >
            {eventChunks.map((chunk, index) => (
              <div key={index} className="carousel-slide">
                <div className="cards-container">
                  {chunk.map((event) => (
                    <div key={event.id} className="event-card">
                      <div
                        className="event-image"
                        style={{ backgroundImage: `url(${event.image})` }}
                      ></div>
                      <div className="event-details">
                        <h3>{event.title}</h3>
                        <p className="date">{event.date}</p>
                        <p className="location1">{event.location}</p>
                        <p className="organizer">By {event.farmer}</p>
                        <div>
                          Email us at &nbsp;
                          <a
                            style={{ color: "green" }}
                            href={`mailto:${event.email}`}
                          >
                            {event.email}
                          </a>
                          &nbsp; for Registration
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="no-events">
            {searchQuery ? "No events in this location" : "No upcoming events"}
          </div>
        )}
      </section>

      <section
        className="promo-banner"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)`,
        }}
      >
        <div className="promo-content">
          <h2>Sell Your Crops Directly</h2>
          <p>Join our platform and reach thousands of buyers</p>
          <button className="cta-button">Register as Farmer</button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
