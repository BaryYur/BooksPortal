import React, { useEffect, useState } from "react";

import PurchasedBookItem from "./PurchasedBookItem";

const UserBooksPage = () => {
    const [purchasedBooks, setPurchasedBooks] = useState([]);

    const fetchingPurchasedBooks = () => {
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            fetch(`http://localhost:8081/shopping/id?id=${userData.id}`)
                .then(response => response.json())
                .then(data => {
                    setPurchasedBooks(data);
                });
        }
    }

    useEffect(() => {
        fetchingPurchasedBooks();
    }, []);

    return (
        <div className="main-wrapper purchased-books-container">
            <h2>Purchased books</h2>
            <ul>
                {purchasedBooks.map(book => (
                    <PurchasedBookItem
                        key={book.id}
                        bookName={book.bookName}
                        file={book.file}
                    />
                ))}
                {purchasedBooks.length === 0 && <p className="no-items-paragraph">Nothing here yet</p>}
            </ul>
        </div>
    );
}

export default UserBooksPage;