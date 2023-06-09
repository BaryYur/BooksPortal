import React from "react";

import AddingNewBookItemForm from "../../../components/Forms/AddingNewBookItemForm";

const AdminAddingBookItemPage = () => {
    return (
        <div className="admin-page-wrapper">
            <AddingNewBookItemForm isAuthor={false} isAdmin={true} />
        </div>
    );
}

export default AdminAddingBookItemPage;