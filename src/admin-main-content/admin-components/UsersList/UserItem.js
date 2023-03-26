import React, { useState } from "react";

import BlockIcon from "@mui/icons-material/Block";

const UserItem = ({ name, lastName, email }) => {
    const [isBlocked, setIsBlocked] = useState(false);

    return (
        <li className="user-info-item-box">
            <div>
                <span>{name} {lastName}</span>
            </div>
            <div>
                <span>{email}</span>
            </div>
            <div className={isBlocked ? "blocked-user" : "not-blocked-user"}>
                {isBlocked && <span>User is blocked</span>}
                {!isBlocked && <span>User is not blocked</span>}
            </div>
            <button
                onClick={() => setIsBlocked(active => !active)}
                title={isBlocked ? "Unblock user" : "Block user"}
            >
                <BlockIcon />
            </button>
        </li>
    );
}

export default UserItem;