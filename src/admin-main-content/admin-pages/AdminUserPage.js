import React from "react";

import AccountCircle from "@mui/icons-material/AccountCircle";
import "./AdminUserPage.js.css";

const AdminUserPage = () => {
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
            </div>
        </div>
    );
}

export default AdminUserPage;