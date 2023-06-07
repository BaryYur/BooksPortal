import React, {useContext, useEffect, useState} from "react";

import { Link } from "react-router-dom";

import ItemsContext from "../../context/items-context";
import AuthContext from "../../context/auth-context";

import PurchasedBookItem from "./PurchasedBookItem";

const UserBooksPage = () => {
    const { purchasedBooks, fetchingPurchasedBooks } = useContext(ItemsContext);
    const { userInfo } = useContext(AuthContext);
    const [userLikedBooks, setUserLikedBooks] = useState([]);

    const fetchingUserLikedBooks = () => {
        fetch(`http://localhost:8081/user/${userInfo.id}`)
            .then(response => response.json())
            .then(user => {
                fetch(`http://localhost:8081/book/ids?ids=${user.likes}`)
                    .then(response => response.json())
                    .then(likedBooks => {
                        setUserLikedBooks(likedBooks);
                    });
            });
    }

    useEffect(() => {
        fetchingPurchasedBooks();
        fetchingUserLikedBooks();
    }, []);

    return (
        <div className="main-wrapper purchased-books-wrapper">
            <div className="purchased-books-container">
                <h2>Purchased books</h2>
                <ul>
                    {purchasedBooks.map(book => (
                        <PurchasedBookItem
                            key={book.id}
                            bookName={book.bookName}
                            file={book.file}
                            purchasedDate={book.date}
                        />
                    ))}
                    {purchasedBooks.length === 0 && <p className="no-items-paragraph">Nothing here yet</p>}
                </ul>
            </div>
            <div className="liked-books-container">
                <h2>Liked books</h2>
                <ul>
                    {userLikedBooks.map(book => (
                        <li key={book.id} className="liked-book-item">
                            <div>
                                <Link to={`/home/shop/books/${book.categories[0]}/${book.id}`}>
                                    <img src={book.file} />
                                </Link>
                                <div>
                                    <Link to={`/home/shop/books/${book.categories[0]}/${book.id}`}>{book.name}</Link>
                                    <p>Pages: {book.pagesCount}</p>
                                    <p>Language: {book.language}</p>
                                </div>
                            </div>
                            <div className="box">
                                <p>{book.price}$</p>
                            </div>
                        </li>
                    ))}
                    {userLikedBooks.length === 0 && <p className="no-items-paragraph">Nothing here yet</p>}
                </ul>
            </div>
        </div>
    );
}

export default UserBooksPage;