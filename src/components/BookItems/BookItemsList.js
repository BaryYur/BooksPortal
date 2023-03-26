import BookItemCard from "./BookItemCard";
import "./BookItemsList.css";

const BookItemsList = ({ booksData }) => {
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
                    />
                ))}
            </ul>
        </div>
    );
}

export default BookItemsList;