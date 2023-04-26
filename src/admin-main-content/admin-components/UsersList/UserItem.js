import React, { useContext, useState } from "react";

import AdminMainContext from "../../admin-context/admin-main-context";

import BlockIcon from "@mui/icons-material/Block";

const UserItem = ({ id, name, email, userStatus, password, role }) => {
    const { fetchingUpdateUserStatus } = useContext(AdminMainContext);

    const updateUserStatus = () => {
        if (userStatus === "ACTIVE") {
            fetchingUpdateUserStatus(id, "BANNED", email, name, password, role);
        } else {
            fetchingUpdateUserStatus(id, "ACTIVE", email, name, password, role);
        }
    }

    return (
        <li className="user-info-item-box">
            <div>
                <span>{name}</span>
            </div>
            <div>
                <span>{email}</span>
            </div>
            <div className={userStatus !== "ACTIVE" ? "blocked-user" : "not-blocked-user"}>
                {userStatus === "ACTIVE" && <span>User is active</span>}
                {userStatus !== "ACTIVE" && <span>User is blocked</span>}
            </div>
            <button
                onClick={updateUserStatus}
                title={userStatus === "BANNED" ? "Unblock user" : "Block user"}
            >
                <BlockIcon />
            </button>
        </li>
    );
}

export default UserItem;