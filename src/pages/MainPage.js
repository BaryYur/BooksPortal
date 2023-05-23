import React, { useContext } from "react";

import { Route, Routes } from "react-router-dom";

import AuthContext from "../context/auth-context";

import HomePage from "./HomePage/HomePage";
import NewsPage from "./NewsPage/NewsPage";
import OrderPage from "./OrderPage/OrderPage";
import UserBooksPage from "./UserBooksPage/UserBooksPage";
import AuthorInfoPage from "./AuthorInfoPage";
// import PublishingPage from "./PublishingPage";
import AuthorPage from "./AuthorPage/AuthorPage";
import AuthPage from "./AuthPage";
import ProfilePage from "./ProfilePage";
import NotificationsPage from "./NotificationsPage";
import ShopPage from "./ShopPage/ShopPage";
import Layout from "../components/Layout/Layout";
import CategoryPage from "./CategoryPage/CategoryPage";
import SubcategoryPage from "./SubcategoryPage/SubcategoryPage";
import BookItemPage from "./BookItemPage/BookItemPage";
import NotFoundPage from "./NotFoundPage";

const MainPage = () => {
    const { isUserIsAuthor, isUserIsPublisher, isLoggedIn } = useContext(AuthContext);

    return (
        <div>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/news" element={<NewsPage />} />
                    {isLoggedIn && <Route path="/order" element={<OrderPage />} />}
                    {isLoggedIn && <Route path="/user-books" element={<UserBooksPage />} />}
                    {(isUserIsAuthor || isUserIsPublisher) &&<Route path="/notifications" element={<NotificationsPage />} />}
                    {isUserIsPublisher && <Route path="/publishing" element={<AuthorPage publisher={true} author={false} />} />}
                    {isUserIsAuthor && <Route path="/author" element={<AuthorPage publisher={false} author={true} />} />}
                    {!isLoggedIn && <Route path="/auth" element={<AuthPage />} />}
                    {isLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
                    <Route path="/shop/*" element={<ShopPage />} />
                    <Route path="/shop/categories/:category" element={<CategoryPage />} />
                    <Route path="/shop/categories/:category/:subcategoryId" element={<SubcategoryPage />} />
                    <Route path="/shop/books/:category/:id" element={<BookItemPage />} />
                    <Route path="/author-info/:id" element={<AuthorInfoPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </div>
    );
}

export default MainPage;