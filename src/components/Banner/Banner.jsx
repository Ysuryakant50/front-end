import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../Banner/Banner.css";

// Import banner images
import banner1 from "../../assets/banner/1.png";
import banner2 from "../../assets/banner/2.png";
import banner3 from "../../assets/banner/3.png";
import banner4 from "../../assets/banner/4.png";
import banner5 from "../../assets/banner/5.png";
import banner6 from "../../assets/banner/6.png";

const Banner = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const banners = [
    {
      id: 1,
      image: banner1,
      alt: "Special Offer - Electronics",
      category: "electronics",
      title: "Mega Electronics Sale",
      subtitle: "Up to 50% OFF on Latest Gadgets",
    },
    {
      id: 2,
      image: banner2,
      alt: "Special Products - Laptops",
      category: "laptops",
      title: "Premium Laptops",
      subtitle: "New Arrivals with Exclusive Deals",
    },
    {
      id: 3,
      image: banner3,
      alt: "Gaming Zone",
      category: "gaming",
      title: "Gaming Festival",
      subtitle: "Best Gaming Gear at Unbeatable Prices",
    },
    {
      id: 4,
      image: banner4,
      alt: "Smart Home Devices",
      category: "smart-home",
      title: "Smart Home Revolution",
      subtitle: "Transform Your Home Today",
    },
    {
      id: 5,
      image: banner5,
      alt: "Mobile Accessories",
      category: "accessories",
      title: "Accessories Bonanza",
      subtitle: "Complete Your Tech Collection",
    },
    {
      id: 6,
      image: banner6,
      alt: "Audio Equipment",
      category: "audio",
      title: "Sound of Excellence",
      subtitle: "Premium Audio at Best Prices",
    },
  ];

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const handleBannerClick = (category) => {
    navigate(`/category/${category}`);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="banner-container">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={null} // Disable Bootstrap's auto-slide since we're using custom interval
        className="custom-carousel"
        indicators={true}
        prevIcon={<FiChevronLeft className="carousel-control-icon" />}
        nextIcon={<FiChevronRight className="carousel-control-icon" />}
      >
        {banners.map((banner) => (
          <Carousel.Item
            key={banner.id}
            onClick={() => handleBannerClick(banner.category)}
            className="carousel-item-custom"
          >
            <div className="banner-wrapper">
              <img
                className="banner-image"
                src={banner.image}
                alt={banner.alt}
              />
              <div className="banner-overlay">
                <div className="banner-content">
                  <h2 className="banner-title">{banner.title}</h2>
                  <p className="banner-subtitle">{banner.subtitle}</p>
                  <button className="banner-cta">Shop Now</button>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Custom Dots Indicator */}
      <div className="custom-indicators">
        {banners.map((_, idx) => (
          <button
            key={idx}
            className={`indicator-dot ${idx === index ? "active" : ""}`}
            onClick={() => setIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
