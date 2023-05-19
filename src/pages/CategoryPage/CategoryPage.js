import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import BookItemsList from "../../components/BookItems/BookItemsList";
import CircularProgress from "@mui/material/CircularProgress";
import TuneIcon from "@mui/icons-material/Tune";
import CategoryAuthorFiltering from "./CategoryAuthorFiltering";
import "./CategoryPage.css";

const CategoryPage = () => {
    const { fetchingCategoryBooks, categoryBooks, loading } = useContext(ItemsContext);
    const params = useParams();

    const extractCategory = (urlString) => {
        const regex = /\/categories\/([^&/]+)/;
        const match = urlString.match(regex);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }

    const categoryName = extractCategory(window.location.href);

    const fetchingCategoryBookItems = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                for (let category of data) {
                    if (params.category === category.name.toLowerCase()) {
                        // fetchingCategoryBooks(category.id, window.location.href);
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
            <div className="category-main-container">
                <div className="filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    {/*<CategoryAuthorFiltering category={params.category} />*/}
                    {/*<PriceFiltering />*/}
                    {/*<YearFiltering />*/}
                </div>
                <div className="category-items-container">
                    {!loading && <BookItemsList booksData={categoryBooks} />}
                    {loading && (
                        <div className="loading-box">
                            <CircularProgress />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;