import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import BookItemsList from "../../components/BookItems/BookItemsList";
import CircularProgress from "@mui/material/CircularProgress";
import TuneIcon from "@mui/icons-material/Tune";
import SubcategoryAuthorFiltering from "../SubcategoryPage/SubcategoryAuthorFiltering";
import "./CategoryPage.css";
import CategoryItem from "../ShopPage/CategoryItemCard";

const CategoryPage = () => {
    const { fetchingSubcategories, categorySubcategories, loading } = useContext(ItemsContext);
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

    const fetchingCategoryItems = () => {
        fetch(`http://localhost:8081/genre`)
            .then(response => response.json())
            .then(data => {
                for (let category of data) {
                    if (params.category === category.name.toLowerCase()) {

                        fetchingSubcategories(category.id);
                    }
                }
            });
    }

    useEffect(() => {
        fetchingCategoryItems();
    }, [params.category]);

    return (
        <div className="main-wrapper">
            <h2>{params.category} subcategories</h2>
            <div className="category-main-container">
                <ul className="shop-categories-list">
                    {categorySubcategories.map(genre => (
                        <CategoryItem
                            key={genre.id}
                            id={genre.id}
                            title={genre.name}
                            img={genre.file}
                            subcategories={true}
                        />
                    ))}
                </ul>
                {loading && <div className="loading-box">
                    <CircularProgress />
                </div>}
            </div>
        </div>
    );
}

export default CategoryPage;