const BookItemComment = ({ commentText, userName, commentDate }) => {
    let comment = commentDate.split(" ")[0];

    return (
        <li className="comment-item">
            <div className="comment-item__header">
                <p>{userName}</p>
                <p>{comment}</p>
            </div>
            <div className="comment-item__text">
                {commentText}
            </div>
        </li>
    );
}

export default BookItemComment;