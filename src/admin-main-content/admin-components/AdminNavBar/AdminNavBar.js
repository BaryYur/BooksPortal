import React, { useContext } from "react";

import { useScrollToTop } from "../../../hooks/useScrollToTop";

import { Link, NavLink } from "react-router-dom";

import AdminMainContext from "../../admin-context/admin-main-context";

import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import BrushIcon from "@mui/icons-material/Brush";
// import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import ListIcon from '@mui/icons-material/List';
import  "./AdminNavBar.css";
import booksShopLogo from "../../../images/book-icon.png";

const AdminNavBar = () => {
    const adminMainCtx = useContext(AdminMainContext);
    const { scrollToTop } = useScrollToTop();

    return (
        <div className={adminMainCtx.menuIsOpen ? "active-admin-nav-bar-container admin-nav-bar" : "admin-nav-bar-container admin-nav-bar"}>
            <div className="admin-nav-bar-head">
                <IconButton
                    size="large"
                    style={{ color: "white", marginBottom: "10px" }}
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={adminMainCtx.openMenu}
                >
                    <MenuIcon />
                </IconButton>
                <div className="admin-header__menu-box">
                    <Link
                        to="/admin/starting/page/1"
                        title="Admin Home"
                        onClick={scrollToTop}
                        className="admin-header__logo-box"
                    >
                        <img alt="logo" src={booksShopLogo} style={{ width: "35px", marginLeft: "-15px" }} />
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Books shop Admin</Typography>
                    </Link>
                </div>
            </div>
            <ul>
                <li>
                    <NavLink
                        to="/admin/starting/page/1"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Home"
                    >
                        <span>
                            <HomeIcon />
                        </span>
                        <span className="link-text">Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/adding-category"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Add new category"
                    >
                        <span>
                            <AddCircleIcon />
                        </span>
                        <span className="link-text">Add category</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/adding-item"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Add new item"
                    >
                        <span>
                            <LibraryAddIcon />
                        </span>
                        <span className="link-text">Add book</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/check-books"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Check books"
                    >
                        <span>
                            <ListIcon />
                        </span>
                        <span className="link-text">Check book</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/deleting-item"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Delete item"
                    >
                        <span>
                            <RemoveCircleIcon />
                        </span>
                        <span className="link-text">Delete book</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/main-page-handling"
                        onClick={scrollToTop}
                        style={({ isActive }) => {
                            return { backgroundColor: isActive ? "#52a8ff" : "#1976d2" }
                        }}
                        title="Main page handling"
                    >
                        <span>
                            <BrushIcon />
                        </span>
                        <span className="link-text">Main page interface</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default AdminNavBar;