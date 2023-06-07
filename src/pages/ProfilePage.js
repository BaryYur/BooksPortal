import React, {useContext, useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/auth-context";
import CartContext from "../context/cart-context";
import { Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import "./ProfilePage.js.css";

const ProfilePage = ({ isAdmin }) => {
    const navigate = useNavigate();
    const { logout, user, fetchingUserData } = useContext(AuthContext);
    const { dropCart } = useContext(CartContext);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [activeBtn, setActiveBtn] = useState(true);
    const [userLoading, setUserLoading] = useState(false);

    const logoutHandler = () => {
        logout();
        dropCart();
        navigate("/");
    }

    const fetchingUpdateUser = (userBody) => {
        setUserLoading(true);

        fetch(`http://localhost:8081/user/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(userBody),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => console.log(response))
            .catch(() => console.log("user error"));

        setTimeout(() => {
            fetch(`http://localhost:8081/user/password/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(userBody),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => console.log(response))
                .catch(() => console.log("user error"));
        }, 200);

        setTimeout(() => {
            fetchingUserData();
            setUserLoading(false);
        }, 800);
    }

    const updateUserPassword = (e) => {
        e.preventDefault();

        let userBody = {
            id: user.id,
            name: nameInput,
            basket: user.basket,
            dislikes: user.dislikes,
            email: emailInput,
            likes: user.likes,
            password: passwordInput,
            role: user.role,
            status: user.status,
        }

        fetchingUpdateUser(userBody);
    }

    useEffect(() => {
        if (nameInput !== "" && emailInput !== "" && passwordInput.length > 3) {
            setActiveBtn(false);
        } else {
            setActiveBtn(true);
        }

        fetchingUserData();
    }, [nameInput, emailInput, passwordInput]);

    useEffect(() => {
        if (user.name) {
            setNameInput(user.name);
            setEmailInput(user.email);
            setPasswordInput(atob(user.password));
        }
    }, [user.name]);

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
                    <p>
                        <span>Role:</span>
                        <span>{user.role}</span>
                    </p>
                    <p>
                        <span>User status:</span>
                        <span className={user.status === "ACTIVE" ? "active" : "inactive"}>{user.status}</span>
                    </p>
                </div>
            </div>
            <div className="main-box-profile">
                <h2>Account data</h2>

                <form onSubmit={updateUserPassword} className="update-user-form">
                    <div className="control">
                        <label htmlFor="user-name-input">User name</label>
                        <input
                            id="user-name-input"
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="user-email-input">User email</label>
                        <input
                            id="user-email-input"
                            type="text"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="user-password-input">User password</label>
                        <input
                            id="user-password-input"
                            type="text"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    <Button type="submit" variant="contained" disabled={activeBtn}>Change</Button>
                </form>

                <Button
                    variant="contained"
                    color="error"
                    onClick={logoutHandler} className="logout-btn">
                    <LogoutIcon />
                    Logout
                </Button>
            </div>

            <Modal open={userLoading}>
                <Box className="searching-modal">
                    <CircularProgress />
                </Box>
            </Modal>
        </div>
    );
}

export default ProfilePage;