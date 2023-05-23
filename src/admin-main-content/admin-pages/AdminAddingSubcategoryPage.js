import React from "react";

import { useParams } from "react-router-dom";

import AddingCategoryNewPage from "./AddingCategoryPage/AddingCategoryNewPage";

const AdminAddingSubcategoryPage = () => {
    const params = useParams();

    return (
        <div className="admin-main-wrapper">
            <AddingCategoryNewPage subcategory={true} categoryId={params.categoryId} />
        </div>
    );
}

export default AdminAddingSubcategoryPage;