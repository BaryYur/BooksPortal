import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

// import jwt_decode from "jwt-decode";

import Swal from "sweetalert2";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, id) => {},
    logout: () => {},
    fetchingUser: (url, body) => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
}

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token");
    const storedExpirationDate = localStorage.getItem("expirationTime");
    const userData = localStorage.getItem("userData");
    const storedId = localStorage.getItem("userId");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");
      localStorage.removeItem("userData");

      return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        storedId: storedId,
        userData: userData,
    }
}

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(
        JSON.parse(localStorage.getItem("userData")) || {}
    );
    const [isUserIsAdmin, setIsUserIsAdmin] = useState(false);
    const [isUserIsAuthor, setIsUserIsAuthor] = useState(false);
    const [isUserIsPublisher, setIsUserIsPublisher] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const tokenData = retrieveStoredToken();
    const navigate = useNavigate();

    let initialToken;

    if (tokenData) initialToken = tokenData.token;

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userId");
        localStorage.removeItem("userData");
        setUserInfo({});
        setIsUserIsAdmin(false);
        setIsUserIsAuthor(false);
        setIsUserIsPublisher(false);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime, userData) => {
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userData", JSON.stringify(userData));

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    const fetchingUser = (url, body, isLogin) => {
        setIsLoading(true);

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setIsLoading(false);

                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(() => {
                        let errorMessage = "Authentication failed!";

                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: errorMessage,
                            width: 460,
                            height: 400,
                        })
                    });
                }
            })
            .then((data) => {
                const expirationTime = new Date(new Date().getTime() + +"10048000");
                // const decodedToken = jwt_decode(data.token);

                loginHandler(data.token, expirationTime.toISOString(), data);
                setUserInfo(data);

                if (data.role === "ADMIN") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

                setIsLoading(false);

                if (data.role === "PUBLISHING" && !isLogin) {
                    let pubBody = {
                        name: body.name,
                        email: body.email,
                        userId: data.id,
                        active: true,
                    }

                    fetch(`${process.env.REACT_APP_MAIN_PATH}/publishing`, {
                        method: "POST",
                        body: JSON.stringify(pubBody),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res => {
                            console.log("everything is ok ", res);
                        })
                        .catch(error => {
                            console.log(error);
                        } )
                } else if (data.role === "AUTHOR" && !isLogin) {
                    let authorBody = {
                        name: body.name,
                        email: body.email,
                        userId: data.id,
                        active: true,
                    }

                    fetch(`${process.env.REACT_APP_MAIN_PATH}/author`, {
                        method: "POST",
                        body: JSON.stringify(authorBody),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(res => {

                            console.log("everything is ok ", res);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            })
            .catch((err) => {
                setIsLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Authentication failed",
                    width: 460,
                    height: 400,
                })
            });
    }

    useEffect(() => {
        if (tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler, userInfo]);

    useEffect(() => {
        if (userInfo?.role === "ADMIN") {
            setIsUserIsAdmin(true);
        } else if (userInfo?.role === "AUTHOR") {
            setIsUserIsAuthor(true);
        } else if (userInfo?.role === "PUBLISHING") {
            setIsUserIsPublisher(true);
        } 

        // console.log(userInfo);
    }, [userInfo, isUserIsAdmin, isUserIsAuthor, isUserIsPublisher]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        isUserIsAdmin: isUserIsAdmin,
        isUserIsAuthor: isUserIsAuthor,
        isUserIsPublisher: isUserIsPublisher,
        login: loginHandler,
        logout: logoutHandler,
        userInfo: userInfo,
        fetchingUser: fetchingUser,
        authLoading: isLoading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;