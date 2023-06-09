import React, { memo } from "react";

import BookItemCard from "./BookItemCard";
import "./BookItemsList.css";

const BookItemsList = ({ booksData, adminItems, searchingName }) => {
    return (
        <div className="list-of-book-items-container">
            <ul>
                {booksData.map(bookItem => (
                    <BookItemCard
                        key={bookItem.id}
                        id={bookItem.id}
                        name={bookItem.name}
                        price={bookItem.price}
                        link={`/home/shop/books/${bookItem.categories[0]}/${bookItem.id}`}
                        adminItems={adminItems}
                        status={bookItem.status}
                        img={bookItem.file}
                        description={bookItem.description}
                        publishDate={bookItem.publishDate}
                        pagesCount={bookItem.pagesCount}
                        language={bookItem.language}
                        categories={bookItem.categories}
                        authors={bookItem.authors}
                        publishers={bookItem.publishers}
                        searchingName={searchingName}
                        likes={bookItem.likes}
                        dislikes={bookItem.dislikes}
                        authorId={bookItem.authorId}
                        publisherId={bookItem.publisherId}
                        demoFile1={bookItem.demoFile1}
                    />
                ))}
            </ul>
        </div>
    );
}

export default memo(BookItemsList);