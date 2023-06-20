import React, {useContext, useEffect, useState} from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import CircularProgress from "@mui/material/CircularProgress";
import BookItemsList from "../../components/BookItems/BookItemsList";
import TuneIcon from "@mui/icons-material/Tune";
import SubcategoryAuthorFiltering from "./SubcategoryAuthorFiltering";
import SubcategoryPriceFiltering from "./SubcategoryPriceFiltering";
import SubcategoryYearFiltering from "./SubcategoryYearFiltering";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./SubcategoryPage.css";

const SubcategoryPage = () => {
    const params = useParams();
    const { loading, fetchingCategoryBooks, categoryBooks } = useContext(ItemsContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const gettingSubcategoryItems = () => {
        fetch("http://localhost:8081/category")
            .then(response => response.json())
            .then(data => {
                let subName = params.subcategoryId.split("&");
                let path = window.location.href.split("&");

                for (let subcategory of data) {
                    if (subcategory.name.toLowerCase() === subName[0] && path.length === 1) {
                        fetchingCategoryBooks(subcategory.id, "");
                    } else if (subcategory.name.toLowerCase() === subName[0] && path.length > 1) {
                        fetchingCategoryBooks(subcategory.id, window.location.href);
                    }
                }
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }

    let subcategoryName = params.subcategoryId.split("&")[0];

    useEffect(() => {
        gettingSubcategoryItems();
    }, [params]);

    if (!isLoaded) {
        return (
            <div className="loading-box">
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="main-wrapper">
            <h2 style={{ textTransform: "capitalize" }}>{subcategoryName}</h2>
            <div className="subcategory-items-container" style={{ marginTop: "10px" }}>
                <div className="searching-page__filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    <div>
                        <SubcategoryAuthorFiltering subcategory={subcategoryName} />
                        <SubcategoryPriceFiltering subcategory={subcategoryName} />
                        <SubcategoryYearFiltering subcategory={subcategoryName} />
                    </div>
                </div>

                {!loading && <BookItemsList booksData={categoryBooks} />}
                {categoryBooks.length === 0 && <p className="no-items-paragraph" style={{ justifySelf: "center", position: "absolute", left: "50%" }}>Not found books</p>}
                <Modal open={loading}>
                    <Box className="searching-modal">
                        <CircularProgress />
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default SubcategoryPage;