import React, {useContext, useEffect, useState} from "react";

import AuthContext from "../../context/auth-context";

import DeleteIcon from "@mui/icons-material/Delete";

const BookItemComment = ({ userId, bookId, commentId, commentText, commentDate, onFetchComments, onDeleteComment, commentIndex }) => {
    const { isUserIsAdmin, user } = useContext(AuthContext);
    const [commentInput, setCommentInput] = useState("");
    const [commentUserName, setCommentUserName] = useState("");
    let cDate = commentDate.split(" ")[0];
    let cTime = commentDate.split(" ")[1];

    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(cDate);
    let newCdate = date.toLocaleDateString("en-US", options);

    const updateCommentHandler = (event) => {
        event.preventDefault();

        if (commentInput === "") {
            alert("Comment should not be empty");

            return;
        }

        if (commentInput.length > 500) {
            alert("Comment is to long");

            return;
        }

        let commentBody = {
            id: commentId,
            bookId: bookId,
            dateTime: commentDate,
            name: commentUserName,
            text: commentInput,
            userId: userId,
            commentIndex: commentIndex,
        }

        fetch(`http://localhost:8081/comment/${commentId}`, {
            method: "PUT",
            body: JSON.stringify(commentBody),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setTimeout(() => {
            onFetchComments();
        }, 200);
    }

    const adjustTextareaHeight = () => {
        const textarea = document.getElementById("user-comment-textarea");

        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
        }
    }

    const fetchingUserName = () => {
        fetch(`http://localhost:8081/user/${userId}`)
            .then(response => response.json())
            .then(userData => {
                setCommentUserName(userData.name);
            })
    }

    useEffect(() => {
        setCommentInput(commentText);
        fetchingUserName();

        setTimeout(() => {
            adjustTextareaHeight();
        }, 100);
    }, []);

    return (
        <li className="comment-item">
            <div className="comment-item__header">
                <p>{commentUserName}</p>
                <div>
                    <p>{newCdate} {cTime}</p>
                    {(isUserIsAdmin || user.id === userId) && <button onClick={onDeleteComment}>
                        <DeleteIcon />
                    </button>}
                </div>
            </div>
            <div className="comment-item__text">
                {user.id === userId ? <form onSubmit={updateCommentHandler}>
                        <textarea
                            id="user-comment-textarea"
                            className="comment-input"
                            value={commentInput}
                            onInput={adjustTextareaHeight}
                            onChange={(e) => setCommentInput(e.target.value)}
                        ></textarea>
                        <div>
                            <button type="submit">change</button>
                        </div>
                </form>:
                <p>{commentText}</p>
                }
            </div>
        </li>
    );
}

export default BookItemComment;