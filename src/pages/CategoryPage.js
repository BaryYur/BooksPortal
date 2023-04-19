import React, { useContext, useEffect } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";

const CategoryPage = () => {
    const booksCtx = useContext(ItemsContext);
    const params = useParams();

    useEffect(() => {
        booksCtx.fetchingGenreBooks(params.category);

        // for (let item of booksCtx.categoriesForSelect) {
        //     if (item.name === params.category) {
        //         booksCtx.fetchingGenreBooks(item.id);
        //     }
        // }

        console.log(booksCtx.genreBooks);
    }, [params.category])

    return (
        <div className="main-wrapper">
            <h2>Category</h2>
            {params.category}
            {/*{booksCtx.genreBooks.map()}*/}
        </div>
    );
}

export default CategoryPage;