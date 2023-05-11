import React, { useContext } from "react";

import AuthContext from "../../context/auth-context";

import DeleteIcon from "@mui/icons-material/Delete";

const BookItemComment = ({ commentText, userName, commentDate, onDeleteComment }) => {
    const { isUserIsAdmin } = useContext(AuthContext);
    let cDate = commentDate.split(" ")[0];
    let cTime = commentDate.split(" ")[1];

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(cDate);
    let newCdate = date.toLocaleDateString("en-US", options);

    return (
        <li className="comment-item">
            <div className="comment-item__header">
                <p>{userName}</p>
                <div>
                    <p>{newCdate} {cTime}</p>
                    {isUserIsAdmin && <button onClick={onDeleteComment}>
                        <DeleteIcon />
                    </button>}
                </div>
            </div>
            <div className="comment-item__text">
                {commentText}
            </div>
        </li>
    );
}

export default BookItemComment;