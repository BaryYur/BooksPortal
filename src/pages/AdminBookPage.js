import BookItemPage from "./BookItemPage/BookItemPage";

const AdminBookPage = ({ isAdmin }) => {
    return (
        <div className="admin-main-wrapper">
            <BookItemPage isAdmin={true} />
        </div>
    );
}

export default AdminBookPage;