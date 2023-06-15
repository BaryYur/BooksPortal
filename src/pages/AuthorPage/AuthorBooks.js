import AuthorBookItem from "./AuthorBookItem";
import "./AuthorBooks.css";

const AuthorBooks = ({ books, status, fetchingAuthorBooks }) => {
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
                        fetchingAuthorBooksData={fetchingAuthorBooks}
                        status={book.status}
                        description={book.description}
                        publishDate={book.publishDate}
                        pagesCount={book.pagesCount}
                        language={book.language}
                        categories={book.categories}
                        authors={book.authors}
                        publishers={book.publishers}
                        likes={book.likes}
                        dislikes={book.dislikes}
                        authorId={book.authorId}
                        publisherId={book.publisherId}
                        demoFile1={book.demoFile1}
                    />
                ))}
            </ul>
            {books.length === 0 && <p className="no-items-paragraph">No items</p>}
        </div>
    );
}

export default AuthorBooks;