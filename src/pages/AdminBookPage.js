import BookItemPage from "./BookItemPage/BookItemPage";

const AdminBookPage = ({ isAdmin }) => {
    return (
        <div>
            <BookItemPage isAdmin={isAdmin} />
        </div>
    );
}

export default AdminBookPage;