import React, { useContext, useEffect, useState } from "react";

import ItemsContext from "../../context/items-context";

import { useScrollToTop } from "../../hooks/useScrollToTop";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchingForm.css";

const SearchingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchingFilteringSearching } = useContext(ItemsContext);
    const [searchingInput, setSearchingInput] = useState("");
    const { scrollToTop } = useScrollToTop();

    const searchingSubmitHandler = (e) => {
        e.preventDefault();

        if (searchingInput === "") return;

        navigate(`/home/shop/search/?text=${searchingInput}/page/1`);
        setTimeout(() => {
            fetchingFilteringSearching(window.location.href);
        }, 200);
        scrollToTop();
    }

    useEffect(() => {
        if (location.pathname === "/home/shop/search/" && location.search.split("").includes("=")) {
             let searching = window.location.href.split("?text=")[1].split("/")[0].replace(/%20/g, ' ');

             setSearchingInput(searching);
        } else {
            setSearchingInput("");
        }

        console.log('render');
    }, []);

    return (
        <form onSubmit={searchingSubmitHandler} className="searching-form">
            <input
                id="searching-input"
                placeholder="Search..."
                value={searchingInput}
                onChange={e => setSearchingInput(e.target.value)}
            />
            {searchingInput.length !== 0 && <button
                className="cross-btn"
                onClick={() => setSearchingInput("")}
                type="button"
            >
                <CloseIcon />
            </button>}
            <Button type="submit">
                <SearchIcon />
            </Button>
        </form>
    );
}

export default SearchingForm;