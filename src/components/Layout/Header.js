import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import { Link, NavLink } from "react-router-dom";

import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PersonIcon from "@mui/icons-material/Person";

import { Button, Badge } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import Cart from "../Cart/Cart";
import "./Header.css";

const Header = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
    const cartCtx = useContext(CartContext);

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

    return (
        <header id="main-header" className="main-header">
            <div className="header-wrapper">
                <Link to="/" title="Books shop home" onClick={scrollToTop}>
                    <div className="logo-box">
                        <ImportContactsOutlinedIcon style={{ color: "royalblue" }} fontSize="large" />
                        <span>Books portal</span>
                    </div>
                </Link>
                <nav>
                    <ul>
                        <li>
                            <Button className="header__cart-btn" onClick={cartCtx.openCart} title="Cart">
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
                    </ul>
                </nav>
            </div>
            <Cart />
        </header>
    );
}

export default Header;