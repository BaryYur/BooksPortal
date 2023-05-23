import React, {useContext, useEffect} from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import BookItemsList from "../../components/BookItems/BookItemsList";
import TuneIcon from "@mui/icons-material/Tune";
import SubcategoryAuthorFiltering from "./SubcategoryAuthorFiltering";
import "./SubcategoryPage.css";

const SubcategoryPage = () => {
    const params = useParams();
    const { loading, fetchingCategoryBooks, categoryBooks } = useContext(ItemsContext);

    const gettingSubcategoryItems = () => {
        fetch("http://localhost:8081/category")
            .then(response => response.json())
            .then(data => {
                let subName = params.subcategoryId.split("&");

                for (let subcategory of data) {
                    if (subcategory.name.toLowerCase() === subName[0] && subName.length === 1) {
                        fetchingCategoryBooks(subcategory.id, "");
                    } else if (subcategory.name.toLowerCase() === subName[0] && subName.length !== 1) {
                        fetchingCategoryBooks(subcategory.id, window.location.href);
                    }
                }
            });
    }

    useEffect(() => {
        gettingSubcategoryItems();
    }, [params]);

    return (
        <div className="main-wrapper">
            <h2>{params.subcategoryId.split("&")[0]}</h2>
            <div className="subcategory-items-container">
                <div className="searching-page__filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    <div>
                        <SubcategoryAuthorFiltering subcategory={params.subcategoryId.split("&")[0]} />
                    </div>
                </div>

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