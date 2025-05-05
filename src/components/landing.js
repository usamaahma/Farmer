import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./landing.css";

const Landing = () => {
    const farmers = [
        {
            id: 1,
            name: "Ali Farms",
            location: "Punjab",
            crops: ["Wheat", "Rice", "Cotton"],
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
        },
        {
            id: 2,
            name: "Khan Agriculture",
            location: "Sindh",
            crops: ["Sugarcane", "Mangoes"],
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1489&q=80"
        },
        {
            id: 3,
            name: "Green Valley Farms",
            location: "KPK",
            crops: ["Apples", "Cherries", "Peaches"],
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1505253469693-bfce2a1e6155?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 4,
            name: "Sunshine Orchards",
            location: "Balochistan",
            crops: ["Dates", "Apricots"],
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1559181567-c3190ca9959b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 5,
            name: "River View Farms",
            location: "Punjab",
            crops: ["Vegetables", "Herbs"],
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        }
    ];

    const products = [
        {
            id: 1,
            name: "Organic Wheat",
            price: "Rs. 1200/kg",
            farmer: "Ali Farms",
            image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
        },
        {
            id: 2,
            name: "Fresh Mangoes",
            price: "Rs. 800/dozen",
            farmer: "Khan Agriculture",
            image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"
        },
        {
            id: 3,
            name: "Premium Apples",
            price: "Rs. 1500/kg",
            farmer: "Green Valley Farms",
            image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        }
    ];

    const events = [
        {
            id: 1,
            title: "Agriculture Expo 2023",
            date: "15-17 November",
            location: "Lahore Expo Center",
            image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
        },
        {
            id: 2,
            title: "Organic Farming Workshop",
            date: "5 December",
            location: "Online",
            image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            title: "Farmers Market",
            date: "Every Sunday",
            location: "Islamabad",
            image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
        }
    ];

    return (
        <div className="landing-page">
            {/* Hero Banner */}
            <section className="hero-banner" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)`
            }}>
                <div className="hero-content">
                    <h1>Connecting Farmers with Buyers</h1>
                    <p>Pakistan's premier digital marketplace for agricultural products</p>
                    <button className="cta-button">Explore Farms</button>
                </div>
            </section>

            {/* Farmers Listing - Now as Carousel */}
            <section className="farmers-section">
                <div className="section-header">
                    <h2>Featured Farmers</h2>
                    <p>Connect directly with local farmers</p>
                </div>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    interval={5000}
                    className="farmers-carousel"
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow carousel-arrow-left">
                                &lt;
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button type="button" onClick={onClickHandler} title={label} className="carousel-arrow carousel-arrow-right">
                                &gt;
                            </button>
                        )
                    }
                >
                    {farmers.map(farmer => (
                        <div key={farmer.id} className="farmer-slide">
                            <div className="farmer-card">
                                <div className="farmer-image" style={{ backgroundImage: `url(${farmer.image})` }}></div>
                                <div className="farmer-info">
                                    <h3>{farmer.name}</h3>
                                    <p className="location">{farmer.location}</p>
                                    <div className="crops">
                                        {farmer.crops.map((crop, index) => (
                                            <span key={index} className="crop-tag">{crop}</span>
                                        ))}
                                    </div>
                                    <div className="rating">
                                        <span className="stars">★★★★★</span>
                                        <span>{farmer.rating}</span>
                                    </div>
                                    <button className="view-button">View Profile</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Products Carousel */}
            <section className="products-section">
                <div className="section-header">
                    <h2>Fresh Farm Products</h2>
                    <p>Direct from farm to your table</p>
                </div>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    autoPlay={true}
                    interval={5000}
                    className="products-carousel"
                >
                    {products.map(product => (
                        <div key={product.id} className="product-slide">
                            <div className="product-image" style={{ backgroundImage: `url(${product.image})` }}></div>
                            <div className="product-details">
                                <h3>{product.name}</h3>
                                <p className="farmer-name">By {product.farmer}</p>
                                <p className="price">{product.price}</p>
                                <button className="buy-button">Buy Now</button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Events Carousel */}
            <section className="events-section">
                <div className="section-header">
                    <h2>Upcoming Events</h2>
                    <p>Workshops, expos and markets</p>
                </div>
                <Carousel
                    showArrows={true}
                    infiniteLoop={true}
                    showThumbs={false}
                    autoPlay={true}
                    interval={6000}
                    className="events-carousel"
                >
                    {events.map(event => (
                        <div key={event.id} className="event-slide">
                            <div className="event-image" style={{ backgroundImage: `url(${event.image})` }}></div>
                            <div className="event-details">
                                <h3>{event.title}</h3>
                                <p className="date">{event.date}</p>
                                <p className="location">{event.location}</p>
                                <button className="register-button">Register Now</button>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </section>

            {/* Promotional Banner */}
            <section className="promo-banner" style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80)`
            }}>
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