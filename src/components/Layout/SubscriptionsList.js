import React, { useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Person4Icon from "@mui/icons-material/Person4";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import "./SubscriptionsList.css";

const SubscriptionsList = () => {
    const { user, fetchingUserData } = useContext(AuthContext);
    const [openSubsModal, setOpenSubsModal] = useState(false);
    const [userSubscriptions, setUserSubscriptions] = useState([]);
    const [subAuthorsList, setSubAuthorsList] = useState([]);
    const [subPublishersList, setSubPublishersList] = useState([]);

    const openSubsModalHandler = () => {
        setOpenSubsModal(true);

        userSubs(user.subscriptionOnAuthors, user.subscriptionOnPublishers);
    }

    const closeSubsModalHandler = () => setOpenSubsModal(false);

    const fetchingSubAuthorsList = (authors) => {
        fetch(`http://localhost:8081/author/ids?ids=${authors}`)
            .then(response => response.json())
            .then(authors => {
                setSubAuthorsList(authors);
            });
    }

    const fetchingSubPublishersList = (publishers) => {
        fetch(`http://localhost:8081/publishing/ids?ids=${publishers}`)
            .then(response => response.json())
            .then(publishers => {
                setSubPublishersList(publishers);
            });
    }

    const userSubs = (authorSubs, publisherSubs) => {
        fetchingUserData();

        fetchingSubAuthorsList(authorSubs);
        fetchingSubPublishersList(publisherSubs);

        let subsList = [];

        for (let author of subAuthorsList) {
            let sub = {
                subId: author.id,
                subRole: "AUTHOR",
                subName: author.name,
            }

            subsList.push(sub);
        }

        for (let publisher of subPublishersList) {
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
            fetchingSubAuthorsList(user.subscriptionOnAuthors);
            fetchingSubPublishersList(user.subscriptionOnPublishers);
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