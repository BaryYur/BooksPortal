import AuthorBookItem from "./AuthorBookItem";
import "./AuthorBooks.css";

const AuthorBooks = ({ books, status, fetchingAuthorBooksData }) => {
    return (
        <div className="author-books-container">
            {status === "GOOD" && <h2>Approved books</h2>}
            {status === "CONSIDERATION" && <h2>Books on consideration</h2>}
            {status === "BAD" && <h2>Not approved books</h2>}
            <ul>
                {books.map(book => (
                    <AuthorBookItem
                        key={book.id}
                        bookId={book.id}
                        name={book.name}
                        img={book.file}
                        price={book.price}
                        books={books}
                        fetchingAuthorBooksData={fetchingAuthorBooksData}
                    />
                ))}
            </ul>
            {books.length === 0 && <p className="no-items-paragraph">No items</p>}
        </div>
    );
}

export default AuthorBooks;