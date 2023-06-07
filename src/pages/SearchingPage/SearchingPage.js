import React, { useContext, useEffect, useState, memo, useMemo } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import TuneIcon from "@mui/icons-material/Tune";
import SearchingItemsPage from "./SearchingItemsPage";
import AuthorFiltering from "./AuthorFiltering";
import PriceFiltering from "./PriceFiltering";
import YearFiltering from "./YearFiltering";
import CategoryFiltering from "./CategoryFiltering";
import "./SearchingPage.css";

const SearchingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchingFilteringItems, searchingItems } = useContext(ItemsContext);
    const [searchingText, setSearchingText] = useState("");

    // const itemsLength = useMemo(() => searchingFilteringItems.length, [searchingFilteringItems]);

    useEffect(() => {
        let searching = decodeURIComponent(window.location.href.split("?text=")[1].split("/")[0].replace(/%20/g, ' '));
        setSearchingText(searching);

        if (location.search.length < 7) navigate("/home");
    }, [window.location.href]);

    return (
        <div data-testid="searching-page-component">
            <div className="searching-page-header">
                <h2>
                    Search: "<span>{searchingText}</span>"
                </h2>
                <h2>Found <span>{searchingFilteringItems.length}</span> {searchingFilteringItems.length !== 1 ? <span>items</span> : <span>item</span>}</h2>
            </div>
            <div className="searching-page__main-container">
                <div className="searching-page__filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    {searchingItems.length > 1 ? <div className="filtering-box">
                        <div>
                            <AuthorFiltering />
                            <CategoryFiltering />
                            <PriceFiltering />
                            <YearFiltering />
                        </div>
                    </div>:
                    <p className="no-items-paragraph" style={{ marginTop: "10px" }}>No filters</p>}
                </div>
                <Routes>
                    <Route path="/" element={<SearchingItemsPage search={location.search} />} />
                </Routes>
            </div>
        </div>
    );
}

export default memo(SearchingPage);