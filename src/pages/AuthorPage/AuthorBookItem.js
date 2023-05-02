import DeleteIcon from "@mui/icons-material/Delete";

const AuthorBookItem = ({ bookId, name, img, price, fetchingAuthorBooksData }) => {
    const deleteAuthorBook = () => {
        fetch(`http://localhost:8081/book/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchingAuthorBooksData();
                }
            })
            .catch(error => console.log("deleting book error"));
    }

    return (
        <li>
            <div className="book-item__image-box">
                <img src={img} alt={name} />
                <div>
                    <p>{name}</p>
                    <p>Price: {price} $</p>
                </div>
            </div>
            <div>
                <button
                    onClick={deleteAuthorBook}
                >
                    <DeleteIcon />
                </button>
            </div>
        </li>
    );
}


export default AuthorBookItem;