import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./AdminUserPage.js.css";

const AdminUserPage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { dropCart } = useContext(CartContext);

    const logoutHandler = () => {
        logout();
        dropCart();
        navigate("/");
    }

    return (
        <div className="admin-page-wrapper user-wrapper">
            <div className="admin-profile-box">
                <div className="admin-profile-box__top">
                    <div className="admin-profile-box__img">
                        <AccountCircle />
                    </div>
                    <span>@NickName</span>
                    <span>Admin Name</span>
                </div>
                <div className="admin-profile-box__bottom">
                    <p>NickName</p>
                </div>
            </div>
            <div className="admin-main-box-profile">
                <h2>Account data</h2>
                <Button variant="contained" color="error" onClick={logoutHandler}>
                    <LogoutIcon />
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default AdminUserPage;