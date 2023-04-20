import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

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
    const storedId = localStorage.getItem("userId");

    const remainingTime = calculateRemainingTime(storedExpirationDate);

    if (remainingTime <= 3600) {
      localStorage.removeItem("token");
      localStorage.removeItem("expirationTime");
      localStorage.removeItem("userId");

      return null;
    }

    return {
        token: storedToken,
        duration: remainingTime,
        storedId: storedId,
    }
}

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isUserIsAdmin, setIsUserIsAdmin] = useState(true);
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

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (token, expirationTime) => {
        setToken(token);

        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
    }

    const fetchingUser = (url, body) => {
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
                const decodedToken = jwt_decode(token);

                loginHandler(data.token, expirationTime.toISOString());
    
                setUserInfo(decodedToken);
                console.log(decodedToken); 

                if (userInfo.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }

                setIsLoading(false);
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
        if (userInfo.role === "admin") {
            setIsUserIsAdmin(true);
        } else if (userInfo.role === "author") {
            setIsUserIsAuthor(true);
        } else if (userInfo.role === "publishing") {
            setIsUserIsPublisher(true);
        }
    }, [])

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
    )
}

export default AuthContext;