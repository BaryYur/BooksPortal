import React, { useContext, useState } from "react";

import ItemsContext from "../../../context/items-context";
import SearchIcon from "@mui/icons-material/Search";

const AdminSearchingForm = () => {
    const { searchingItemsFetch } = useContext(ItemsContext);
    const [searchingInput, setSearchingInput] = useState("");

    const submitSearchingHandler = (e) => {
        e.preventDefault();

        searchingItemsFetch(searchingInput);
        console.log(searchingInput);
    }

    return (
        <form onSubmit={submitSearchingHandler}>
            <h2>Searching needed items</h2>
            <div className="searching-control">
                <div className="searching-icon">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchingInput}
                    onChange={(e) => setSearchingInput(e.target.value)}
                />
            </div>
        </form>
    );
}

export default AdminSearchingForm;