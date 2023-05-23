import React, { useEffect, useContext, memo } from "react";

import ItemsContext from "../../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import CategoryItem from "./CategoryItemCard";

const ShopPageCategories = () => {
    const { booksCategories, fetchingCategories, loading } = useContext(ItemsContext);

    useEffect(() => {
        fetchingCategories();
    }, [])

    return (
        <div className="shop-categories">
            <h2>Categories</h2>
            <ul className="shop-categories-list">
                {booksCategories.map(genre => (
                    <CategoryItem
                        key={genre.id}
                        id={genre.id}
                        title={genre.name}
                        img={genre.file}
                    />
                ))}
            </ul>
            {loading && <div className="loading-box">
                <CircularProgress />
            </div>}
        </div>
    );
}

export default memo(ShopPageCategories);