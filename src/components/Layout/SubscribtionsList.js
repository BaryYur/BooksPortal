import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../../context/auth-context";

import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const SubscribtionsList = () => {
    const { user, fetchingUserData } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const userSubs = () => {

    }

    useEffect(() => {
        fetchingUserData();
    }, []);

    useEffect(() => {
        if (user.name) {
            setUserSubscriptions([...user.subscriptionOnAuthors, ...user.subscriptionOnPublishers]);
        }
    }, []);

    return (
        <div className="categories-menu-box">
            <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
                endIcon={<KeyboardArrowDownIcon />}
                size="small"
            >
                Subscriptions
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
                style={{ marginTop: "5px" }}
            >
                <div>
                    {userSubscriptions.map(sub => (
                        <div key={Math.random()}>
                            <Link to={"/"}>
                                <MenuItem style={{ color: "#464646", display: "block", width: "120px", }}>{sub}</MenuItem>
                            </Link>
                        </div>
                    ))}
                </div>
            </Menu>
        </div>
    );
}

export default SubscribtionsList;