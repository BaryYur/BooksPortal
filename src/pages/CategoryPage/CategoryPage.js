import React, { useState, useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import CategoryItem from "../ShopPage/CategoryItemCard";
import "./CategoryPage.css";

const CategoryPage = () => {
    const { fetchingSubcategories, categorySubcategories, loading } = useContext(ItemsContext);
    const params = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    const extractCategory = (urlString) => {
        const regex = /\/categories\/([^&/]+)/;
        const match = urlString.match(regex);

        if (match && match[1]) {
            return match[1];
        }

        return null;
    }

    const fetchingCategoryItems = () => {
        fetch(`http://localhost:8081/genre`)
            .then(response => response.json())
            .then(data => {
                for (let category of data) {
                    if (params.category === category.name.toLowerCase()) {
                        fetchingSubcategories(category.id);
                    }
                }
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        fetchingCategoryItems();
    }, [params.category]);

    if (!isLoaded) {
        return (
            <div className="loading-box">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="main-wrapper">
            <h2 style={{ textAlign: "center", margin: "20px 0", fontSize: "32px" }}><span style={{ color: "#318CE7", textTransform: "capitalize" }}>{params.category}</span> subcategories</h2>
            <div className="category-main-container">
                {!loading && <ul className="shop-categories-list">
                    {categorySubcategories.map(genre => (
                        <CategoryItem
                            key={genre.id}
                            id={genre.id}
                            title={genre.name}
                            img={genre.file}
                            subcategories={true}
                        />
                    ))}
                </ul>}
                {loading && <div className="loading-box">
                    <CircularProgress />
                </div>}
                {categorySubcategories.length === 0 && !loading && <p className="no-items-paragraph" style={{ margin: "30px auto" }}>Nothing found</p>}
            </div>
        </div>
    );
}

export default CategoryPage;