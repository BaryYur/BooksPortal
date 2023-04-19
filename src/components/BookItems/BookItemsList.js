import React , { memo } from "react";

import BookItemCard from "./BookItemCard";
import "./BookItemsList.css";

const BookItemsList = ({ booksData, adminItems }) => {
    return (
        <div className="list-of-book-items-container">
            <ul>
                {booksData.map(bookItem => (
                    <BookItemCard
                        key={bookItem.id}
                        id={bookItem.id}
                        name={bookItem.name}
                        price={bookItem.price}
                        link={`/home/shop/categories/${bookItem.category.toLowerCase()}/${bookItem.id}`}
                        adminItems={adminItems}
                    />
                ))}
            </ul>
        </div>
    );
}

export default memo(BookItemsList);