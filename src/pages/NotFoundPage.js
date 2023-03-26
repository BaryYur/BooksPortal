import React from "react";

import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import NotFoundImg from "../images/not-found-page-image.jpg";
// import AuthContext from "../context/auth-context";

const NotFoundPage = () => {
    // const authCtx = useContext(AuthContext);

    return (
        <div className="not-found-page-container">
            <div>
                <img src={NotFoundImg} alt="not-found-img" />
                <p>Page not found!</p>
                <Link to="/home">Back to home page</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;