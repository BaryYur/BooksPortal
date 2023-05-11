import React, {useContext, useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/auth-context";
import CartContext from "../context/cart-context";

import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import "./ProfilePage.js.css";

const ProfilePage = ({ isAdmin }) => {
    const navigate = useNavigate();
    const { logout, user, fetchingUserData } = useContext(AuthContext);
    const { dropCart } = useContext(CartContext);
    const [passwordInput, setPasswordInput] = useState("");

    const logoutHandler = () => {
        logout();
        dropCart();
        navigate("/");
    }

    const updateUserPassword = (e) => {
        e.preventDefault();

        let userBody = {
            basket: user.basket,
            dislikes: user.dislikes,
            email: user.email,
            likes: user.likes,
            name: user.name,
            password: passwordInput,
            role: user.role,
            status: user.status,
        }

        fetch(`http://localhost:8081/user/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(userBody),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => console.log(response))
            .catch(() => console.log("user error"));
    }

    useEffect(() => {
        fetchingUserData();
    }, []);

    return (
        <div className={isAdmin ? "main-wrapper admin-wrapper" : "main-wrapper user-wrapper"}>
            <div className="profile-box">
                <div className="profile-box__top">
                    <div className="profile-box__img">
                        <AccountCircle />
                    </div>
                    <span>@NickName</span>
                    <span>{user.name}</span>
                </div>
                <div className="profile-box__bottom">
                    <p>Role: {user.role}</p>
                </div>
            </div>
            <div className="main-box-profile">
                <h2>Account data</h2>

                <form onSubmit={updateUserPassword} className="change-password-form">
                    <div className="control">
                        <input
                            type="text"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="contained">Change password</Button>
                </form>

                <Button variant="contained" color="error" onClick={logoutHandler}>
                    <LogoutIcon />
                    Logout
                </Button>
            </div>
        </div>
    );
}

export default ProfilePage;