import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import { Link, NavLink } from "react-router-dom";

import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PersonIcon from "@mui/icons-material/Person";

import { Button, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import MenuIcon from "@mui/icons-material/Menu";

import Cart from "../Cart/Cart";
import "./Header.css";
// import bookLogoIcon from "../../images/book-icon.png";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const cartCtx = useContext(CartContext);
    // const [activeMenu, setActiveMenu] = useState(false);

    const scrollToTop = () => {
        document.querySelector(".main-wrapper").scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    window.onscroll = () => scrollFunction();

    const scrollFunction = () => {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("main-header").style.boxShadow = "0 1px 4px rgba(0, 0, 0, 0.2)";
        } else {
            document.getElementById("main-header").style.boxShadow = "none";
        }
    }

    // const activeMenuBarHandler = () => setActiveMenu(active => !active);

    return (
        <header id="main-header" className="main-header">
            <div className="header-wrapper">
                <Link to="/" title="Books shop home" onClick={scrollToTop}>
                    <div className="logo-box">
                        <ImportContactsOutlinedIcon style={{ color: "#318CE7" }} fontSize="large" /> 
                        {/* <img src={bookLogoIcon} alt="Logo" style={{ width: "35px" }} /> */}
                        <span>Books portal</span>
                    </div>
                </Link>
                <nav> 
                    <ul>
                        <li>
                            <Link to="/home/shop">Categories</Link>
                        </li>
                        <li>
                            <Button 
                                className="header__cart-btn" 
                                onClick={cartCtx.openCart} 
                                title="Cart"
                            >
                                <Badge
                                    badgeContent={cartCtx.cartItemsCounter}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "indianred",
                                        }
                                    }}
                                    max={99}
                                >
                                    <ShoppingCartOutlinedIcon />
                                </Badge>
                            </Button>
                        </li>
                        {/* <div className={activeMenu ? "active-nav-bar" : "not-active-nav-bar"}> */}
                            {!isLoggedIn && (
                                <li>
                                    <NavLink
                                        to="/home/auth"
                                        title="Login page"
                                        className="login-link"
                                        onClick={scrollToTop}
                                    >Login</NavLink>
                                </li>
                            )}
                            {isLoggedIn && (
                                <li>
                                    <NavLink
                                        to="/home/profile"
                                        className="profile-link"
                                        title="Profile"
                                        onClick={scrollToTop}
                                    >
                                        <PersonIcon />
                                    </NavLink>
                                </li> 
                            )}
                        {/* </div> */}
                        {/* <div className="menu-btn-box">
                            <Button onClick={activeMenuBarHandler}>
                                <MenuIcon />
                            </Button>
                        </div> */}
                    </ul>
                </nav>
            </div>
            <Cart />
        </header>
    );
}

export default Header;