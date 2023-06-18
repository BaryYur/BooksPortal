import React from "react";

import { Routes, Route } from "react-router-dom";

import SearchingForm from "../../components/Forms/SearchingForm";
import NotFoundPage from "../NotFoundPage";
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
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default ShopPage;