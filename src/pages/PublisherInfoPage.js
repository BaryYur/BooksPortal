import {useContext, useEffect, useState} from "react";

import { useParams } from "react-router-dom";

import AuthContext from "../context/auth-context";
import ItemsContext from "../context/items-context";

import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import BookItemsList from "../components/BookItems/BookItemsList";
import {Button} from "@mui/material";
import "./AuthorInfoPage.css";

const PublisherInfoPage = () => {
    const params = useParams();
    const { user, fetchingUserData, isLoggedIn } = useContext(AuthContext);
    const { fetchingPublishersList, fetchingAuthorsList } = useContext(ItemsContext);
    const [books, setBooks] = useState([]);
    const [publisher, setPublisher] = useState({});

    const fetchingPublisherData = () => {
        fetch(`http://localhost:8081/publishing/${params.id}`)
            .then(response => response.json())
            .then(publisherData => {
                setPublisher(publisherData);
            });
    }

    const fetchingPublisherBooks = () => {
        fetch(`http://localhost:8081/book/publisher/${params.id}/GOOD`)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }

    const subscribeOnPublisherHandler = ()  => {
        if (isLoggedIn) {
            let subPublishers = user.subscriptionOnPublishers;

            if (!subPublishers.includes(publisher.id)) {
                subPublishers.push(publisher.id);
            } else {
                subPublishers = subPublishers.filter(publisherId => publisherId !== publisher.id);
            }

            let userBody = {
                id: user.id,
                name: user.name,
                basket: user.basket,
                dislikes: user.dislikes,
                email: user.email,
                likes: user.likes,
                password: user.password,
                role: user.role,
                status: user.status,
                subscriptionOnAuthors: user.subscriptionOnAuthors,
                subscriptionOnPublishers: subPublishers
            }

            fetch(`http://localhost:8081/user/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(userBody),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (response.ok) {
                        fetchingUserData();

                        fetchingAuthorsList(user.subscriptionOnAuthors);
                        fetchingPublishersList(subPublishers);
                    }
                })
                .catch(() => console.log("user error"));
        } else {
            alert("You need authenticated first");
        }
    }

    useEffect(() => {
        fetchingPublisherBooks();
        fetchingPublisherData();
        fetchingUserData();
    }, []);

    return (
        <div className="main-wrapper author-wrapper">
            <div className="author-info-container">
                <p>
                    <OtherHousesIcon />
                    <span>{publisher.name}</span>
                </p>
                {publisher.active && isLoggedIn &&
                    <Button
                        className={user.subscriptionOnPublishers.includes(publisher.id) ? "sub-btn" : "not-sub-btn"}
                        variant="contained"
                        onClick={subscribeOnPublisherHandler}
                    >
                        {user.subscriptionOnPublishers.includes(publisher.id) ? <span>Unsubscribe</span> : <span>Subscribe</span>}
                    </Button>
                }
                {!isLoggedIn && <Button
                    className="not-sub-btn"
                    variant="contained"
                    onClick={subscribeOnPublisherHandler}
                >
                    <span>Subscribe</span>
                </Button>}
            </div>
            <div className="author-info-container-books">
                <BookItemsList booksData={books} />
            </div>
        </div>
    );
}

export default PublisherInfoPage;