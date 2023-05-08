import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import { Link, NavLink } from "react-router-dom";

import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PersonIcon from "@mui/icons-material/Person";

import { Button, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LoginIcon from "@mui/icons-material/Login";
// import MenuIcon from "@mui/icons-material/Menu";

import Cart from "../Cart/Cart";
import "./Header.css";
// import bookLogoIcon from "../../images/book-icon.png";

const Header = () => {
    const { isLoggedIn, isUserIsAdmin, isUserIsAuthor, isUserIsPublisher } = useContext(AuthContext);
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
                        <ImportContactsOutlinedIcon style={{ color: "#5d5c5c" }} fontSize="large" />
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
                            {(isUserIsAuthor || isUserIsPublisher) && <Link to="/home/notifications">
                                <Button 
                                    className="header__cart-btn" 
                                    title="Notifications"
                                >
                                    {/* <Badge
                                        badgeContent={cartCtx.cartItemsCounter}
                                        sx={{
                                            "& .MuiBadge-badge": {
                                                color: "white",
                                                backgroundColor: "indianred",
                                            }
                                        }}
                                        max={99}
                                    > */}
                                        <NotificationsNoneIcon />
                                    {/* </Badge> */}
                                </Button>
                            </Link>}
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
                        {isUserIsAdmin && (
                            <li>
                                <Link
                                    to="/admin"
                                    title="Admin page"
                                    // className="login-link"
                                    onClick={scrollToTop}
                                >
                                    <Button variant="contained">Admin panel</Button>
                                </Link>
                            </li>
                        )}
                        {/* <div className={activeMenu ? "active-nav-bar" : "not-active-nav-bar"}> */}
                            {!isLoggedIn && (
                                <li>
                                    <NavLink
                                        to="/home/auth"
                                        title="Login page"
                                        className="login-link"
                                        onClick={scrollToTop}
                                    >
                                        <LoginIcon />
                                        <span>Login</span>
                                    </NavLink>
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