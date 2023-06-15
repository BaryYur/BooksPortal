import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import ItemsContext from "../../context/items-context";

import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Person4Icon from "@mui/icons-material/Person4";
import "./SubscriptionsList.css";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

const SubscriptionsList = () => {
    const { user, fetchingUserData } = useContext(AuthContext);
    const { bookItemAuthorsList, bookItemPublishersList, fetchingPublishersList, fetchingAuthorsList } = useContext(ItemsContext);
    const [openSubsModal, setOpenSubsModal] = useState(false);
    const [userSubscriptions, setUserSubscriptions] = useState([]);

    const openSubsModalHandler = () => {
        setOpenSubsModal(true);

        userSubs(user.subscriptionOnAuthors, user.subscriptionOnPublishers);
    }

    const closeSubsModalHandler = () => setOpenSubsModal(false);

    const userSubs = (authorSubs, publisherSubs) => {
        fetchingUserData();

        fetchingAuthorsList(authorSubs);
        fetchingPublishersList(publisherSubs);

        let subsList = [];

        for (let author of bookItemAuthorsList) {
            let sub = {
                subId: author.id,
                subRole: "AUTHOR",
                subName: author.name,
            }

            subsList.push(sub);
        }

        for (let publisher of bookItemPublishersList) {
            let sub = {
                subId: publisher.id,
                subRole: "PUBLISHER",
                subName: publisher.name,
            }

            subsList.push(sub);
        }

        setUserSubscriptions([...subsList]);
    }

    useEffect(() => {
        fetchingUserData();
    }, []);

    useEffect(() => {
        if (user.name) {
            fetchingAuthorsList(user.subscriptionOnAuthors);
            fetchingPublishersList(user.subscriptionOnPublishers);
        }
    }, [user.name]);

    return (
        <div className="subs-list">
            <Button variant="contained" onClick={openSubsModalHandler}>Subscriptions</Button>

            <Modal
                open={openSubsModal}
                onClose={closeSubsModalHandler}
            >
                <Box className="subscriptions-modal">
                    <ul>
                        {userSubscriptions.map(sub => (
                            <li key={sub.subId}>
                                <Link
                                    to={sub.subRole === "PUBLISHER" ? `/home/publisher-info/${sub.subId}` : `/home/author-info/${sub.subId}`}
                                    onClick={closeSubsModalHandler}
                                >
                                    {sub.subRole === "PUBLISHER" ? <OtherHousesIcon /> : <Person4Icon />}
                                    <span>{sub.subName}</span>
                                </Link>
                            </li>)
                        )}
                        {userSubscriptions.length === 0 && <p className="no-items-paragraph" style={{ margin: "10px auto" }}>No subscriptions yet</p>}
                    </ul>

                    <div>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeSubsModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default SubscriptionsList;