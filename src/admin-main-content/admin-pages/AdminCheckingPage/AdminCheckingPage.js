import React, { useContext, useEffect } from "react";

import ItemsContext from "../../../context/items-context";

import BookItemsList from "../../../components/BookItems/BookItemsList";

const AdminCheckingPage = () => {
    const { adminBooks, fetchingAdminBooks } = useContext(ItemsContext);

    useEffect(() => {
        fetchingAdminBooks();
    }, []);

    return (
        <div className="main-admin-wrapper admin-deleting-page-container">
            <div className="searching-items-container">
                {adminBooks.length !== 0 ?
                    <BookItemsList
                        adminItems={true}
                        booksData={adminBooks}
                    /> : <p className="no-items-paragraph">Not found books for update</p>
                }
            </div>
        </div>
    );
}

export default AdminCheckingPage;