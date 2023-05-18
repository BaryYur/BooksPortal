import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";

import BookItemsList from "../components/BookItems/BookItemsList";
import CircularProgress from "@mui/material/CircularProgress";
import AuthorFiltering from "./SearchingPage/AuthorFiltering";
import PriceFiltering from "./SearchingPage/PriceFiltering";
import YearFiltering from "./SearchingPage/YearFiltering";
import "./CategoryPage.css";
import TuneIcon from "@mui/icons-material/Tune";

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
            <div className="category-main-container">
                <div className="filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    {/*<AuthorFiltering />*/}
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