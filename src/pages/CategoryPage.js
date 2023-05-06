import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";

import BookItemsList from "../components/BookItems/BookItemsList";
import "./CategoryPage.css";
import CircularProgress from "@mui/material/CircularProgress";

const CategoryPage = () => {
    const { fetchingCategoryBooks, categoryBooks, loading } = useContext(ItemsContext);
    const params = useParams();
    const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

    const fetchingCategoryBookItems = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                for (let category of data) {
                    if (params.category === category.name.toLowerCase()) {
                        fetchingCategoryBooks(category.id);
                    }
                }
            });
    }

    useEffect(() => {
        fetchingCategoryBookItems();
    }, [params.category]);

    return (
        <div className="main-wrapper">
            <h2>{categoryName} Category</h2>
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

export default CategoryPage;