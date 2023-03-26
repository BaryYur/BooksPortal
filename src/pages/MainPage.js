import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";

import AuthContext from "../context/auth-context";

import HomePage from "./HomePage/HomePage";
import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";
import ShopPage from "./ShopPage/ShopPage";
import Layout from "../components/Layout/Layout";
import CategoryPage from "./CategoryPage";
import BookItemPage from "./BookItemPage";
import NotFoundPage from "./NotFoundPage";

const MainPage = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
                    {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
                    <Route path="/shop/*" element={<ShopPage />} />
                    <Route path="/shop/categories/:category" element={<CategoryPage />} />
                    <Route path="/shop/categories/:category/:id" element={<BookItemPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default MainPage;