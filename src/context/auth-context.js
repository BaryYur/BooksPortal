import React, { useState, useEffect, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

let logoutTimer;

const AuthContext = React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token, id) => {},
    logout: () => {},
    userInfoHandler: (id) => {},
    fetchingUser: (url, body) => {},
});

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

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
    };
};

export const AuthContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const [isUserIsAdmin, setIsUserIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const tokenData = retrieveStoredToken();
    const navigate = useNavigate();

    let initialToken;

    if (tokenData) {
        initialToken = tokenData.token;
    }

    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        setUserId("");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");
        localStorage.removeItem("userId");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const fetchingUserData = (id) => {
        fetch(`https://.../user/${id}`, {
            method: "GET",
            headers: {
                Authorization: localStorage.getItem("token"),
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.admin === true) {
                    setIsUserIsAdmin(true);
                }

                setUserInfo(data);
            })
    }

    const loginHandler = (token, expirationTime, id) => {
        setToken(token);
        setUserId(id);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);
        localStorage.setItem("userId", id);

        const remainingTime = calculateRemainingTime(expirationTime);

        logoutTimer = setTimeout(logoutHandler, remainingTime);
        userInfoHandler(userId);
    };

    const userInfoHandler = (id) => {
       fetchingUserData(id);
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
                    return res.json().then((data) => {
                        let errorMessage = "Authentication failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                const expirationTime = new Date(new Date().getTime() + +"10048000");

                loginHandler(data.token, expirationTime.toISOString(), data.id);
                userInfoHandler(data.id);

                if (data.admin === true) {
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
                    text: "Incorrect email or password",
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
        if (tokenData) {
            userInfoHandler(userId);
        }
    }, [])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        isUserIsAdmin: isUserIsAdmin,
        login: loginHandler,
        logout: logoutHandler,
        userInfo: userInfo,
        userInfoHandler: userInfoHandler,
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