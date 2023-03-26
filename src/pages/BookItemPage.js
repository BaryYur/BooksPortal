import React from "react";

import { useParams } from "react-router-dom";

import "./BookItemPage.css";

const BookItemPage = () => {
    const itemId = useParams().id;

    return (
        <div className="main-wrapper">
            <div className="book-item-page-container">
                <div>
                    <h2>Book item page "{itemId}"</h2>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default BookItemPage;