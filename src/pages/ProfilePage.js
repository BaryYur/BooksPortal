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
import CloseIcon from "@mui/icons-material/Close";
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
    const [selfCardNumberInput, setSelfCardNumberInput] = useState("");
    const [selfCodeInput, setSelfCodeInput] = useState("");
    const [selfMoneyInput, setSelfMoneyInput] = useState("");
    const [activeBtn, setActiveBtn] = useState(true);
    const [userLoading, setUserLoading] = useState(false);
    const [authorData, setAuthorData] = useState(0);
    const [openAddMoneyModal, setOpenAddMoneyModal] = useState(false);

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
            subscriptionOnAuthors: user.subscriptionOnAuthors,
            subscriptionOnPublishers: user.subscriptionOnPublishers
        }

        fetchingUpdateUser(userBody);
    }

    const fetchingScore = () => {
        if (user.role === "AUTHOR") {
            fetch(`http://localhost:8081/author/user/${user.id}`)
                .then(response => response.json())
                .then(author => {
                    setAuthorData(author);
                });
        } else if (user.role === "PUBLISHING") {
            fetch(`http://localhost:8081/publishing/user/${user.id}`)
                .then(response => response.json())
                .then(publisher => {
                    setAuthorData(publisher);
                });
        }
    }

    const fetchingUpdateScore = (score, addMoney) => {
        let authorScore;

        if (!addMoney) {
            authorScore = authorData.score - score;
        } else {
            authorScore = authorData.score + score;
        }

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

    const cardNumberHandler = (e) => {
        let { value } = e.target;
        value = value.replace(/\s/g, "");
        value = value.slice(0, 16);

        const formattedValue = formatCardNumber(value);

        setCardNumberInput(formattedValue);
    }

    const selfCardNumberHandler = (e) => {
        let { value } = e.target;
        value = value.replace(/\s/g, "");
        value = value.slice(0, 16);

        const formattedValue = formatCardNumber(value);

        setSelfCardNumberInput(formattedValue);
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

        if (withdrawInput === "" || cardNumberInput === "") return;

        setUserLoading(true);

        setTimeout(() => {
            fetchingUpdateScore(withdrawInput, false);

            setUserLoading(false);
        }, 800);

        setWithdrawInput("");
        setCardNumberInput("");
    }

    const openAddMoneyModalHandler = () => setOpenAddMoneyModal(true);
    const closeAddMoneyModalHandler = () => setOpenAddMoneyModal(false);

    const submitAddMoneyHandler = (e) => {
        e.preventDefault();

        if (selfCardNumberInput === "" || selfMoneyInput === "" || selfCodeInput === "") return;

        setUserLoading(true);

        setTimeout(() => {
            fetchingUpdateScore(selfMoneyInput, true);

            setUserLoading(false);
        }, 800);

        setSelfCardNumberInput("");
        setSelfMoneyInput("");
        setSelfCodeInput("");
        setOpenAddMoneyModal(false);
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
                        <h2>
                            Your score: <span>{authorData.score}$</span>
                        </h2>

                        {user.role === "PUBLISHING" && (
                            <Button 
                                variant="contained"
                                onClick={openAddMoneyModalHandler}
                            >
                                <PaidIcon />
                                <span>Top up the account</span>
                            </Button>
                        )}

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
                                    onChange={cardNumberHandler}
                                />
                            </div>

                            <Button
                                variant="contained"
                                color="success"
                                type="submit"
                            >
                                <PaidIcon />
                                <span>Withdraw money</span>
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

            <Modal
                open={openAddMoneyModal}
                onClose={closeAddMoneyModalHandler}
            >
                <Box className="delete-modal buying-rules-modal">
                   <form onSubmit={submitAddMoneyHandler}>
                       <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div className="control">
                                <label>Card number</label>
                                <input
                                    type="text"
                                    style={{ width: "285px" }}
                                    value={selfCardNumberInput}
                                    onChange={selfCardNumberHandler}
                                />
                            </div>
                            <div className="control">
                                <label>Code</label>
                                <input
                                    type="text"
                                    style={{ width: "130px" }}
                                    maxLength={3}
                                    value={selfCodeInput}
                                    onChange={(e) => setSelfCodeInput(e.target.value)}
                                />
                            </div>
                       </div>
                       <div className="control">
                           <label>How much ($)</label>
                           <input
                               type="number"
                               value={selfMoneyInput}
                               onChange={(e) => setSelfMoneyInput(Number(e.target.value))}
                           />
                       </div>
                       <div>
                           <Button type="submit" variant="contained">Top up</Button>
                       </div>
                   </form>

                    <div>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeAddMoneyModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default ProfilePage;