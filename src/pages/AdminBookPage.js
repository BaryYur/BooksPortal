import BookItemPage from "./BookItemPage/BookItemPage";

const AdminBookPage = ({ isAdmin }) => {
    return (
        <div className="admin-main-wrapper">
            <BookItemPage isAdmin={isAdmin} />
        </div>
    );
}

export default AdminBookPage;