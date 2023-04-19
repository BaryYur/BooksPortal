import AuthorBookItem from "./AuthorBookItem";
import "./AuthorBooks.css";

const AuthorBooks = ({ books }) => {
    return (
        <div className="author-books-container">
            <ul>
                {books.map(book => (
                    <AuthorBookItem
                        key={book.id}
                        id={book.id}
                        name={book.name}
                    />
                ))}
            </ul>
        </div>
    );
}

export default AuthorBooks;