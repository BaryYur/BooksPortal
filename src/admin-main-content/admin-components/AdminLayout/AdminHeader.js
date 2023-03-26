import React, { useContext } from "react";

import { Link, NavLink } from "react-router-dom";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";

import "./AdminHeader.css";
import booksShopLogo from "../../../images/book-icon.png";
import Typography from "@mui/material/Typography";
import AdminMainContext from "../../admin-context/admin-main-context";

const AdminHeader = () => {
    const adminMainCtx = useContext(AdminMainContext);

    return (
        <div className="admin-header">
            <div className="admin-header__wrapper">
                <Toolbar className={!adminMainCtx.menuIsOpen ? "admin-header__toolbar" : "not-active-admin-header__toolbar"} style={{ padding: "0 10px" }}>
                     <div className={!adminMainCtx.menuIsOpen ? "admin-header__menu-box" : "invisible"}>
                        <Link to="/admin/starting" title="Admin Home" className="admin-header__logo-box">
                            <img alt="logo" src={booksShopLogo} style={{ width: "35px", marginLeft: "-15px" }} />
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Books shop Admin</Typography>
                        </Link>
                    </div>
                    <div>
                        <NavLink
                            to="/admin/user-admin"
                            title="User"
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </NavLink>
                    </div>
                </Toolbar>
            </div>
        </div>
    );
}

export default AdminHeader;