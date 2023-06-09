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
import PaidIcon from "@mui/icons-material/Paid";
import "./ProfilePage.js.css";

const ProfilePage = ({ isAdmin }) => {
    const navigate = useNavigate();
    const { logout, user, fetchingUserData } = useContext(AuthContext);
    const { dropCart } = useContext(CartContext);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [withdrawInput, setWithdrawInput] = useState("");
    const [cardNumberInput, setCardNumberInput] = useState("");
    const [activeBtn, setActiveBtn] = useState(true);
    const [userLoading, setUserLoading] = useState(false);
    const [authorData, setAuthorData] = useState(0);

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

    const fetchingScore = () => {
        if (user.role === "AUTHOR") {
            fetch(`http://localhost:8081/author/all/${user.name}`)
                .then(response => response.json())
                .then(authors => {
                    if (authors.length !== 0) {
                        setAuthorData(authors[0]);
                    }
                });
        } else if (user.role === "PUBLISHING") {
            fetch(`http://localhost:8081/publishing/all/${user.name}`)
                .then(response => response.json())
                .then(publishers => {
                    if (publishers.length !== 0) {
                        setAuthorData(publishers[0]);
                    }
                });
        }
    }

    const fetchingUpdateScore = (score) => {
        let authorScore = authorData.score - score;

        let body = {
            id: authorData.id,
            name: authorData.name,
            email: authorData.email,
            description: authorData.description,
            score: authorScore,
            userId: authorData.userId,
            active: authorData.active,
        }

        if (user.role === "AUTHOR") {
            fetch(`http://localhost:8081/author/${authorData.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(authors => {
                    fetchingScore();
                });
        } else if (user.role === "PUBLISHING") {
            fetch(`http://localhost:8081/publishing/${authorData.id}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then(authors => {
                    fetchingScore();
                });
        }
    }

    const handleInputChange = (e) => {
        let { value } = e.target;
        value = value.replace(/\s/g, "");
        value = value.slice(0, 16);

        const formattedValue = formatCardNumber(value);

        setCardNumberInput(formattedValue);
    }

    const formatCardNumber = (cardNumber) => {
        const regex = /(\d{1,4})/g;
        const parts = cardNumber.match(regex);

        if (parts) {
            return parts.join(" ");
        }

        return cardNumber;
    }

    const submitScoreHandler = (e) => {
        e.preventDefault();

        if (withdrawInput === "" && cardNumberInput === "") return;

        setUserLoading(true);

        setTimeout(() => {
            fetchingUpdateScore(withdrawInput);

            setUserLoading(false);
        }, 800);

        setWithdrawInput("");
        setCardNumberInput("");
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

            fetchingScore();
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
                <form onSubmit={updateUserPassword} className="update-user-form">
                    <h2>Account data</h2>

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

                {(user.role === "AUTHOR" || user.role === "PUBLISHING") &&
                    (<div className="author-score-box">
                        <h2>Your score: <span>{authorData.score}$</span></h2>

                        <form onSubmit={submitScoreHandler}>
                            <div className="control">
                                <label htmlFor="user-email-input">Want to withdraw</label>
                                <input
                                    id="user-email-input"
                                    type="number"
                                    min={0}
                                    max={authorData.score}
                                    value={withdrawInput}
                                    onChange={(e) => setWithdrawInput(e.target.value)}
                                />
                            </div>
                            <div className="control">
                                <label htmlFor="user-password-input">Your card number</label>
                                <input
                                    id="user-password-input"
                                    type="text"
                                    value={cardNumberInput}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                <PaidIcon />
                                <span>withdraw money</span>
                            </Button>
                        </form>
                    </div>)
                }

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