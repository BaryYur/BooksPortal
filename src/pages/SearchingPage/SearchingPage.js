import React, { useContext, useEffect, useState, memo, useMemo } from "react";

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import TuneIcon from "@mui/icons-material/Tune";
import SearchingItemsPage from "./SearchingItemsPage";
import AuthorFiltering from "./AuthorFiltering";
import "./SearchingPage.css";
import PriceFiltering from "./PriceFiltering";
import YearFiltering from "./YearFiltering";
import PublisherFiltering from "./PublisherFiltering";

const SearchingPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { searchingItems } = useContext(ItemsContext);
    const [searchingText, setSearchingText] = useState("");

    const itemsLength = useMemo(() => searchingItems.length, [searchingItems]);

    useEffect(() => {
        if (location.search.split("").includes("=")) {
            setSearchingText(location.search.split("=")[1].split("%20").join(" ").split("/")[0]);
        } else {
            setSearchingText("");
            navigate("/home");
        }

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
                {itemsLength !== 0 && (<div className="searching-page__filtering-box">
                    <div className="filtering-head">
                        <p>Filters</p>
                        <TuneIcon />
                    </div>
                    <div className="filtering-box">
                            <div>
                                <AuthorFiltering />
                                <PublisherFiltering />
                                <PriceFiltering />
                                <YearFiltering />
                            </div>
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