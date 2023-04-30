import React, { useContext } from "react";

import ItemsContext from "../../../context/items-context";

import BookItemsList from "../../../components/BookItems/BookItemsList";
import AdminSearchingForm from "./AdminSearchingForm";
import CircularProgress from "@mui/material/CircularProgress";
import "./DeletingItemPage.css";

const DeletingItemPage = () => {
    const { searchingItems, loading } = useContext(ItemsContext);

    return (
        <div className="admin-page-wrapper admin-deleting-page-container">
            <div className="admin-searching-box">
                <AdminSearchingForm />
            </div>
            <div className="searching-items-container">
                {!loading &&
                    <BookItemsList
                        adminItems={true}
                        booksData={searchingItems}
                        searchingName={JSON.parse(localStorage.getItem("admin-search"))}
                    />
                }
                {!loading && searchingItems.length === 0 && <p className="no-items-paragraph">Nothing found</p>}
                {loading &&
                    <div className="loading-box">
                        <CircularProgress />
                    </div>
                }
            </div>
        </div>
    );
}

export default DeletingItemPage;