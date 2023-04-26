import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";

import AuthContext from "../context/auth-context";

import HomePage from "./HomePage/HomePage";
import NewsPage from "./NewsPage";
import OrderPage from "./OrderPage";
import PublishingPage from "./PublishingPage";
import AuthorPage from "./AuthorPage/AuthorPage";
import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";
import NotificationsPage from "./NotificationsPage";
import ShopPage from "./ShopPage/ShopPage";
import Layout from "../components/Layout/Layout";
import CategoryPage from "./CategoryPage";
import BookItemPage from "./BookItemPage";
import NotFoundPage from "./NotFoundPage";

const MainPage = () => {
    const { isUserIsAuthor, isUserIsPublisher, isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    <Route path="/order" element={<OrderPage />} />
                    {(isUserIsAuthor || isUserIsPublisher) &&<Route path="/notifications" element={<NotificationsPage />} />}
                    {isUserIsPublisher && <Route path="/publishing" element={<PublishingPage />} />}
                    {isUserIsAuthor && <Route path="/author" element={<AuthorPage />} />}
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