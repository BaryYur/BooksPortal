import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthContext from "../context/auth-context";

import { Button } from "@mui/material";

const ProfilePage = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const logoutHandler = () => {
        logout();
        navigate("/");
    }

    return (
        <div className="main-wrapper">
            <h1>Profile page</h1>
            <Button
                variant="contained"
                color="error"
                style={{ display: "block", margin: "0 auto" }}
                onClick={logoutHandler}
            >Logout</Button>
        </div>
    );
}

export default ProfilePage;