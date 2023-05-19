import React, { useContext, useEffect, useState, memo, useMemo } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import TuneIcon from "@mui/icons-material/Tune";
import SearchingItemsPage from "./SearchingItemsPage";
import AuthorFiltering from "./AuthorFiltering";
import PriceFiltering from "./PriceFiltering";
import YearFiltering from "./YearFiltering";
// import PublisherFiltering from "./PublisherFiltering";
import "./SearchingPage.css";
import CategoryFiltering from "./CategoryFiltering";

const SearchingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchingFilteringItems, searchingItems, fetchingSearchingItems } = useContext(ItemsContext);
    const [searchingText, setSearchingText] = useState("");

    const itemsLength = useMemo(() => searchingFilteringItems.length, [searchingFilteringItems]);

    useEffect(() => {
        setSearchingText(window.location.href.split("?text=")[1].split("/")[0].replace(/%20/g, ' '));
        fetchingSearchingItems(window.location.href.split("?text=")[1].split("/")[0].replace(/%20/g, ' '));

        if (location.search.length < 7) navigate("/home");
    }, [navigate, location, searchingText])

    return (
        <div>
            <div className="searching-page-header">
                <h2>
                    Search: "<span>{searchingText}</span>"
                </h2>
                <h2>Found <span>{itemsLength}</span> {itemsLength !== 1 ? <span>items</span> : <span>item</span>}</h2>
            </div>
            <div className="searching-page__main-container">
                {searchingItems.length !== 0 && (<div className="searching-page__filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    <div className="filtering-box">
                        {searchingItems.length !== 1 ? <div>
                            <AuthorFiltering />
                            {/*<PublisherFiltering />*/}
                            <CategoryFiltering />
                            <PriceFiltering />
                            <YearFiltering />
                        </div>:
                        <p className="no-items-paragraph" style={{ marginTop: 0 }}>No filters</p>}
                    </div>
                </div>)}
                <Routes>
                    <Route path="/" element={<SearchingItemsPage search={location.search} searchingText={searchingText} />} />
                </Routes>
            </div>
        </div>
    );
}

export default memo(SearchingPage);