import React, {useEffect, useState} from "react";

import BookItemComment from "./BookItemComment";
import "./BookItemComments.css";
import {Button} from "@mui/material";

const BookItemComments = ({ bookId, userId, userName }) => {
    const [commentInput, setCommentInput] = useState("");
    const [comments, setComments] = useState([]);

    const fetchingBookComments = () => {
        fetch(`http://localhost:8081/comment/book/${bookId}`)
            .then(response => response.json())
            .then(comments => {
                setComments(comments);
            })
            .catch(() => console.log("fetching comment error"));
    }

    const fetchingAddingComment = (commentBody) => {
        fetch("http://localhost:8081/comment", {
            method: "POST",
            body: JSON.stringify(commentBody),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .catch(() => console.log("adding comment error"));
    }

    const submitCommentHandler = (e) => {
        e.preventDefault();

        if (commentInput.length < 4) {
            alert("Message to short");

            return;
        }

        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        let commentBody = {
            bookId: bookId,
            dateTime: formattedDate,
            name: userName,
            text: commentInput,
            userId: userId,
        }

        fetchingAddingComment(commentBody);

        setTimeout(() => {
            fetchingBookComments();
            setCommentInput("");
        }, 500);
    }

    useEffect(() => {
        fetchingBookComments();
    }, []);

    return (
      <div className="book-comments-container">
          <form onSubmit={submitCommentHandler}>
              <div className="control">
                  <label htmlFor="comment-textarea">Add comment for this book</label>
                  <textarea
                      id="comment-textarea"
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                  ></textarea>
              </div>
              <Button type="submit" variant="contained">Add comment</Button>
          </form>

          <ul>
              {comments.map(comment => (
                  <BookItemComment
                      key={comment.id}
                      userName={comment.name}
                      commentText={comment.text}
                      commentDate={comment.dateTime}
                  />
              ))}
          </ul>
      </div>
    );
}

export default BookItemComments;