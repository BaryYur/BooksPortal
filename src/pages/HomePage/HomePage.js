import React from "react";

import { Link } from "react-router-dom";

import HomePageSlider from "./HomePageSlider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EastIcon from "@mui/icons-material/East";
import FeedIcon from "@mui/icons-material/Feed";
import "./HomePage.css";
import shopCardBackground from "../../images/books-stack-3d-paper-literature-textbooks.jpg";
import heroImg from "../../images/hero-image.png";

const HomePage = () => {
    const scrollToTop = () => {
        document.querySelector(".main-wrapper").scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div className="home-page-container">
            <div className="hero-container">
                <div className="hero-wrapper">
                    <div className="hero-titles-box">
                        <h2>Welcome on Books Portal</h2>
                        <p>Find Your Next Favorite Read: Shop Our Recommendations</p>
                        <p>Feed Your Mind: Browse Our Latest Releases</p>
                        <p>Escape Reality: Dive Into Our Bestsellers</p>
                        <Link to="/home/shop">
                            <span>To the Shop</span>
                            <span>
                                <EastIcon />
                            </span>
                        </Link>
                    </div>
                    <div className="hero-image-box">
                        <img src={heroImg} alt="hero-image" />
                    </div>
                </div>
            </div>
            <div className="home-page-cards-container">
                <Link
                    to="/home/shop"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <ShoppingBagIcon />
                        </span>
                        <span>Shop</span>
                    </p>
                    <img src={shopCardBackground} alt="shop" />
                    <div className="card-wrapper"></div>
                </Link>
                <Link
                    to="/home/shop"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <FeedIcon />
                        </span>
                        <span>News</span>
                    </p>
                    {/* <img src={newsCardBackground} alt="news" /> */}
                    <div className="card-wrapper"></div>
                </Link>
                <Link
                    to="/home/shop"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <FeedIcon />
                        </span>
                        <span>Info</span>
                    </p>
                    <div className="card-wrapper"></div>
                </Link>
                <Link
                    to="/home/shop"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <FeedIcon />
                        </span>
                        <span>Another</span>
                    </p>
                    <div className="card-wrapper"></div>
                </Link>
            </div>
            <div className="home-page-slider-container">
                <HomePageSlider /> 
            </div>
        </div>
    );
}

export default HomePage;