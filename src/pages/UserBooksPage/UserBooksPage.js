import React, { useContext, useEffect } from "react";

import ItemsContext from "../../context/items-context";

import PurchasedBookItem from "./PurchasedBookItem";

const UserBooksPage = () => {
    const { purchasedBooks, fetchingPurchasedBooks } = useContext(ItemsContext);

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
                        purchasedDate={book.date}
                    />
                ))}
                {purchasedBooks.length === 0 && <p className="no-items-paragraph">Nothing here yet</p>}
            </ul>
        </div>
    );
}

export default UserBooksPage;