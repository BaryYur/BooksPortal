import React, { useEffect, useContext, memo } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchingBooksGenres } from "../../redux-store/items-slice";
import ItemsContext from "../../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import CategoryItem from "./CategoryItemCard";

const ShopPageCategories = () => {
    // const dispatch = useDispatch(); // redux actions
    // const categories = useSelector(state => state.bookItems.booksGenres); // redux states
    const { booksCategories, fetchingAllCategories, loading } = useContext(ItemsContext);

    useEffect(() => {
        fetchingAllCategories();

        // dispatch(fetchingBooksGenres());
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