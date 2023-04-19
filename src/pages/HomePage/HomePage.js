import React, { useContext } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import HomePageSlider from "./HomePageSlider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EastIcon from "@mui/icons-material/East";
import FeedIcon from "@mui/icons-material/Feed";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import "./HomePage.css";
// import shopCardBackground from "../../images/books-stack-3d-paper-literature-textbooks.jpg";
// import newsCardBackground from "../../images/news-background.jpg";
import heroImg from "../../images/hero-image.png";

const HomePage = () => {
    const authCtx = useContext(AuthContext);

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
                    {/* <img src={shopCardBackground} alt="shop" /> */}
                    <div className="card-wrapper"></div>
                </Link>
                <Link
                    to="/home/news"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <NewspaperIcon />
                        </span>
                        <span>News</span>
                    </p>
                    {/* <img src={newsCardBackground} alt="news" /> */}
                    <div className="card-wrapper"></div>
                </Link>
                {authCtx.isUserIsAuthor && <Link
                    to="/home/author"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <AccountBoxIcon />
                        </span>
                        <span>Author</span>
                    </p>
                    <div className="card-wrapper"></div>
                </Link>}
                {!authCtx.isUserIsAuthor && <div className="inactive-home-page-card">
                    <p>
                        <span>
                            <AccountBoxIcon />
                        </span>
                        <span>Author</span>
                    </p>
                </div>}
                {authCtx.isUserIsPublisher && <Link
                    to="/home/publishing"
                    className="home-page-card"
                    onClick={scrollToTop}
                >
                    <p>
                        <span>
                            <FeedIcon />
                        </span>
                        <span>Publishing</span>
                    </p>
                    <div className="card-wrapper"></div>
                </Link>}
                {!authCtx.isUserIsPublisher && <div className="inactive-home-page-card">
                    <p>
                        <span>
                            <FeedIcon />
                        </span>
                        <span>Publishing</span>
                    </p>
                </div>}
            </div>
            <div className="home-page-slider-container">
                <HomePageSlider /> 
            </div>
        </div>
    );
}

export default HomePage;