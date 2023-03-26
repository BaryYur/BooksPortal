import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./SearchingForm.css";

const SearchingForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchingInput, setSearchingInput] = useState("");

    const searchingSubmitHandler = (e) => {
        e.preventDefault();

        if (searchingInput === "") return;

        localStorage.setItem("search", JSON.stringify(searchingInput.toLowerCase()));
        navigate(`/home/shop/search/?text=${searchingInput.toLowerCase()}/page/1`);

        document.querySelector("body").scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        if (location.pathname === "/home/shop/search/" && location.search.split("").includes("=")) {
             setSearchingInput(location.search.split("=")[1].split("%20").join(" ").split("/")[0]);
        } else {
            setSearchingInput("");
        }
    }, [location])

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