import React, { useContext } from "react";

import BookItemsList from "../../../components/BookItems/BookItemsList";

import "./DeletingItemPage.css";
import AdminSearchingForm from "./AdminSearchingForm";
import ItemsContext from "../../../context/items-context";

const DeletingItemPage = () => {
    const { searchingItems } = useContext(ItemsContext);

    return (
        <div className="admin-page-wrapper admin-deleting-page-container">
            <div className="admin-searching-box">
                <AdminSearchingForm />
            </div>
            <div className="searching-items-container">
                {searchingItems.length !== 0 ?
                    <BookItemsList
                        adminItems={true}
                        booksData={searchingItems}
                    /> : <p>Start typing</p>
                }
            </div>
        </div>
    );
}

export default DeletingItemPage;