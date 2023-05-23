import React, {useContext, useEffect} from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import BookItemsList from "../components/BookItems/BookItemsList";

const SubcategoryPage = () => {
    const params = useParams();
    const { loading, fetchingCategoryBooks, categoryBooks } = useContext(ItemsContext);

    const gettingSubcategoryItems = () => {
        fetch("http://localhost:8081/category")
            .then(response => response.json())
            .then(data => {
                for (let subcategory of data) {
                    if (subcategory.name.toLowerCase() === params.subcategoryId) {
                        fetchingCategoryBooks(subcategory.id);
                    }
                }
            });
    }

    useEffect(() => {
        gettingSubcategoryItems();
    }, [params.subcategoryId]);

    return (
        <div className="main-wrapper">
            <h2>{params.subcategoryId}</h2>
            <div className="category-items-container">
                {!loading && <BookItemsList booksData={categoryBooks} />}
                {loading && (
                    <div className="loading-box">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SubcategoryPage;