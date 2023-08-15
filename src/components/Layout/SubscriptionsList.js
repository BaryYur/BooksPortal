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
    const [subsLoading, setSubsLoading] = useState(false);

    const openSubsModalHandler = () => {
        setOpenSubsModal(true);

        userSubs(user.subscriptionOnAuthors, user.subscriptionOnPublishers);
    }

    const closeSubsModalHandler = () => setOpenSubsModal(false);

    const userSubs = (authorSubs, publisherSubs) => {
        fetchingUserData();
        setSubsLoading(true);

        fetch(`http://localhost:8081/publishing/ids?ids=${publisherSubs}`)
            .then(response => response.json())
            .then(publishers => {
                fetch(`http://localhost:8081/author/ids?ids=${authorSubs}`)
                    .then(response => response.json())
                    .then(authors => {
                        let subsList = [];

                        for (let author of authors) {
                            let sub = {
                                subId: author.id,
                                subRole: "AUTHOR",
                                subName: author.name,
                            }

                            subsList.push(sub);
                        }

                        for (let publisher of publishers) {
                            let sub = {
                                subId: publisher.id,
                                subRole: "PUBLISHER",
                                subName: publisher.name,
                            }

                            subsList.push(sub);
                        }

                        setUserSubscriptions([...subsList]);
                        setSubsLoading(false);
                    });
            });
    }

    useEffect(() => {
        fetchingUserData();
    }, []);

    return (
        <div className="subs-list">
            <Button variant="contained" onClick={openSubsModalHandler}>Subscriptions</Button>

            <Modal
                open={openSubsModal}
                onClose={closeSubsModalHandler}
            >
                <Box className="subscriptions-modal">
                    <h3>Subscriptions list</h3>
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
                        {!subsLoading && userSubscriptions.length === 0 && <p className="no-items-paragraph" style={{ margin: "10px auto" }}>No subscriptions yet</p>}
                        {subsLoading && userSubscriptions.length === 0 && <p className="no-items-paragraph" style={{ margin: "10px auto" }}>Loading...</p>}
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