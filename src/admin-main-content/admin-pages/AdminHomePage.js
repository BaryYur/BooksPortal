import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import AdminHeader from "../admin-components/AdminLayout/AdminHeader";
import AdminNavBar from "../admin-components/AdminNavBar/AdminNavBar";
import AdminStartingPage from "./AdminStartingPage";
import ProfilePage from "../../pages/ProfilePage";
import AdminAddingCategoryPage from "./AddingCategoryPage/AdminAddingCategoryPage";
import AddingCategoryNewPage from "./AddingCategoryPage/AddingCategoryNewPage";
import AdminAddingBookItemPage from "./AddingItemPage/AdminAddingBookItemPage";
import DeletingItemPage from "./DeletingItemPage/DeletingItemPage";
import AdminCheckingPage from "./AdminCheckingPage/AdminCheckingPage";
import AdminBookPage from "../../pages/AdminBookPage";
import NotFoundPage from "../../pages/NotFoundPage";
import ChangingMainPage from "./ChangingMainPage";
import "./AdminHomePage.css";

const AdminHomePage = () => {
    return (
        <div className="admin-home-wrapper">
            <AdminNavBar />
            <div className="admin-main-wrapper">
                <AdminHeader />
                <Routes>
                    <Route path="/starting/page/:number" element={<AdminStartingPage />} />
                    <Route path="/starting" element={<Navigate to="/admin/starting/page/1" replace />} />
                    <Route path="/starting/page" element={<Navigate to="/admin/starting/page/1" replace />} />
                    <Route path="/" element={<Navigate to="/admin/starting" replace />} />
                    <Route path="/user-admin" element={<ProfilePage isAdmin={true} />} />
                    <Route path="/adding-category" element={<AdminAddingCategoryPage />} />
                    <Route path="/adding-category/new" element={<AddingCategoryNewPage />} />
                    <Route path="/adding-item" element={<AdminAddingBookItemPage />} />
                    <Route path="/check-books" element={<AdminCheckingPage />} />
                    <Route path="/book/:id" element={<AdminBookPage isAdmin={true} />} />
                    <Route path="/deleting-item" element={<DeletingItemPage />} />
                    <Route path="/main-page-handling" element={<ChangingMainPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default AdminHomePage;