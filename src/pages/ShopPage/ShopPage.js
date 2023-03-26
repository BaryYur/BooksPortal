import { Routes, Route } from "react-router-dom";

import SearchingForm from "../../components/Forms/SearchingForm";
import SearchingPage from "../SearchingPage/SearchingPage";
import ShopPageCategories from "./ShopPageCategories";

const ShopPage = () => {
    return (
        <div className="main-wrapper">
            <h1>Books shop</h1>
            <SearchingForm />
            <Routes>
                <Route path="/search/*" element={<SearchingPage />} />
                <Route path="/" element={<ShopPageCategories />} />
            </Routes>
        </div>
    );
}

export default ShopPage;