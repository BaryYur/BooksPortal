import React, { useContext, useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import ItemsContext from "../../context/items-context";
import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";

import { Button } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DownloadIcon from "@mui/icons-material/Download";
import TabsPanel from "../../components/Tabs/TabsPanel";
import BookItemComments from "./BookItemComments";
import PaidIcon from "@mui/icons-material/Paid";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import "./BookItemPage.css";

const BookItemPage = ({ isAdmin }) => {
    const itemId = useParams().id;
    const {
        bookItem,
        fetchingBookItem,
        bookItemCategoriesList,
        bookItemAuthorsList,
        bookItemPublishersList,
        fetchingDownloadBook,
        purchasedBooks,
        fetchingUnlockBook
    } = useContext(ItemsContext);
    const { addToCart, cartItems } = useContext(CartContext);
    const { isLoggedIn, fetchingUserData, user } = useContext(AuthContext);
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(false);
    const [isActiveLikeBtn, setIsActiveLikeBtn] = useState(false);
    const [isActiveDislikeBtn, setIsActiveDislikeBtn] = useState(false);
    const [bookRating, setBookRating] = useState(0);
    const [bookLikes, setBookLikes] = useState(0);
    const [bookDislikes, setBookDislikes] = useState(0);
    const [openRightsModal, setOpenRightsModal] = useState(false);

    const [purchasePriceInput, setPurchasePriceInput] = useState(0);
    const [purchaseTextInput, setPurchaseTextInput] = useState("");

    let tabsInfo = [
        {
            name: "description",
            description: bookItem?.description,
        },
        {
            name: "comments",
            description: <BookItemComments
                bookId={itemId}
                userName={user?.name}
                userId={user?.id}
            />,
        }
    ];

    const addToCartHandler = (id) => {
        if (!isLoggedIn) {
            alert("You need authenticated first");
        } else {
            let newBasket = user.basket;
            newBasket.push(id);

            let userBody = {
                basket: newBasket,
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
                status: user.status,
                likes: user.likes,
                dislikes: user.dislikes,
                subscriptionOnAuthors: user.subscriptionOnAuthors,
                subscriptionOnPublishers: user.subscriptionOnPublishers
            }

            addToCart(user.id, userBody);
        }

        setDisabledAddingBtn(true);
    }

    const btnIsActive = () => {
        let idArr = [];

        for (let item of cartItems) {
            if (item.id === itemId) {
                setDisabledAddingBtn(true);
            }

            idArr.push(item.id);
        }

        let pArr = [];

        for (let book of purchasedBooks) {
            pArr.push(book.bookName);
        }

        if (!idArr.includes(itemId) && !pArr.includes(bookItem.name)) {
            setDisabledAddingBtn(false);
        } else {
            setDisabledAddingBtn(true);
        }

        return setDisabledAddingBtn;
    }

    const fetchingRatingBook = (like, number) => {
        let bookLikes = bookItem.likes;
        let bookDislikes = bookItem.dislikes;

        if (like && number === 0) {
            bookLikes = bookLikes + 1;
            bookDislikes = bookDislikes - 1;
        } else if (like && number === 1) {
            bookLikes = bookLikes + 1;
        } else if (like && number === -1) {
            bookLikes = bookLikes - 1;
        } else if (!like && number === 0) {
            bookLikes = bookLikes - 1;
            bookDislikes = bookDislikes + 1;
        } else if (!like && number === 1) {
            bookDislikes = bookDislikes + 1;
        } else if (!like && number === -1) {
            bookDislikes = bookDislikes - 1;
        }

        let bookBody = {
            authors: bookItem.authors,
            categories: bookItem.categories,
            description: bookItem.description,
            dislikes: bookDislikes,
            file: bookItem.file,
            language: bookItem.language,
            likes: bookLikes,
            name: bookItem.name,
            pagesCount: bookItem.pagesCount,
            price: bookItem.price,
            publishDate: bookItem.publishDate,
            publishers: bookItem.publishers,
            status: bookItem.status,
            publisherId: bookItem.publisherId,
            authorId: bookItem.authorId,
            demoFile1: bookItem.demoFile1,
        }

        fetch(`http://localhost:8081/book/${itemId}`, {
            method: "PUT",
            body: JSON.stringify(bookBody),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                calculateBookRating(data.likes, data.dislikes);
                fetchingBookItem(itemId);
            });
    }

    const calculateBookRating = (likes, dislikes) => {
        let rating = 0;

        if (likes > 0) {
            rating = likes / (likes + dislikes) * 10;
        } if (likes > 0 && dislikes === 0) {
            rating = 10;
        } else if (dislikes > 0 && likes === 0) {
            rating = 0;
        }

        let rounded = 0;
        rounded = rating.toFixed(1);

        setBookRating(rounded);
    }

    const checkingLikes = () => {
        if (user.likes && user.dislikes) {
            if (user.likes.includes(itemId) && !user.dislikes.includes(itemId)) {
                setIsActiveLikeBtn(true);
                setIsActiveDislikeBtn(false);
            } if (!user.likes.includes(itemId) && user.dislikes.includes(itemId)) {
                setIsActiveLikeBtn(false);
                setIsActiveDislikeBtn(true);
            } else if (!user.likes.includes(itemId) && !user.dislikes.includes(itemId)) {
                setIsActiveLikeBtn(false);
                setIsActiveDislikeBtn(false);
            }
        }
    }

    const likeBookHandler = (like) => {
        if (user) {
            let userLikes = user.likes;
            let userDislikes = user.dislikes;

            if (like) {
                if (!user.likes.includes(itemId)) {
                    userLikes.push(itemId);
                    userDislikes = userDislikes.filter(dis => dis !== itemId);

                    if (user.dislikes.includes(itemId)) {
                        // likes + 1, dis - 1
                        fetchingRatingBook(true, 0);
                    } else {
                        fetchingRatingBook(true, 1);
                        // likes + 1
                    }
                } else {
                    userLikes = userLikes.filter(like => like !== itemId);
                    fetchingRatingBook(true, -1);
                    // likes - 1
                }
            } else {
                if (!user.dislikes.includes(itemId)) {
                    userDislikes.push(itemId);
                    userLikes = userLikes.filter(dis => dis !== itemId);

                    if (user.likes.includes(itemId)) {
                        // dis + 1, likes - 1
                        fetchingRatingBook(false, 0);
                    } else {
                        fetchingRatingBook(false, 1);
                        // dis + 1
                    }
                } else {
                    userDislikes = userDislikes.filter(dis => dis !== itemId);
                    fetchingRatingBook(false, -1);
                    // dis - 1
                }
            }

            let userBody = {
                basket: user.basket,
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
                status: user.status,
                likes: userLikes,
                dislikes: userDislikes,
                subscriptionOnAuthors: user.subscriptionOnAuthors,
                subscriptionOnPublishers: user.subscriptionOnPublishers
            }

            fetch(`http://localhost:8081/user/${user.id}`, {
                method: "PUT",
                body: JSON.stringify(userBody),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => {
                    if (response.ok) {
                        fetchingUserData();
                        checkingLikes();
                    }
                });
        }
    }

    const blockBookHandler = (status) => {
        let body = {
            id: bookItem.id,
            name: bookItem.name,
            price: bookItem.price,
            status: status,
            file: bookItem.file,
            description: bookItem.description,
            publishDate: bookItem.publishDate,
            pagesCount: bookItem.pagesCount,
            language: bookItem.language,
            categories: bookItem.categories,
            authors: bookItem.authors,
            publishers: bookItem.publishers,
            likes: bookItem.likes,
            dislikes: bookItem.dislikes,
            demoFile1: bookItem.demoFile1,
            publisherId: bookItem.publisherId,
            authorId: bookItem.authorId,
        }

        fetchingUnlockBook(body);

        setTimeout(() => {
            fetchingBookItem(itemId);
        }, 200);
    }

    const fetchingDownloadBookPreview = () => {
        const byteCharacters = atob(bookItem.demoFile1);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        window.open(url, "_blank");
    }

    // Buying rights
    const openBuyingRightsModalHandler = () => setOpenRightsModal(true);
    const closeBuyingRightsModalHandler = () => setOpenRightsModal(false);

    const submitBuyingRightsHandler = (e) => {
        e.preventDefault();

        if (purchasePriceInput === 0 || purchaseTextInput === "") return;

        fetch(`http://localhost:8081/publishing/user/${user.id}`)
            .then(response => response.json())
            .then(publisher => {
                if (purchasePriceInput > publisher.score) {
                    alert("You not have much money");

                    return;
                } else {
                    let purchaseRightsBody = {
                        authorId: bookItem.authorId,
                        bookId: bookItem.id,
                        bookName: bookItem.name,
                        price: purchasePriceInput,
                        publisherId: publisher.id,
                        reviewed: false,
                        text: purchaseTextInput,
                        name: user.name,
                    }

                    fetch("http://localhost:8081/purchaseRequest", {
                        method: "POST",
                        body: JSON.stringify(purchaseRightsBody),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then(response => {
                            console.log(response);

                            if (response.ok) {
                                setActivePurchaseBtn(true);
                            }
                        });

                    setOpenRightsModal(false);
                }
            });
    }

    const [activePurchaseBtn, setActivePurchaseBtn] = useState(false);

    const checkingBuyingRules = (currentUser) => {
        fetch(`http://localhost:8081/publishing/user/${currentUser.id}`)
            .then(response => response.json())
            .then(publisher => {
                fetch(`http://localhost:8081/purchaseRequest/publisher/${publisher.id}`)
                    .then(response => response.json())
                    .then(purchasedReqs => {
                        let arr = [];

                        for (let req of purchasedReqs) {
                            arr.push(req.bookId);
                        }

                        if (arr.includes(bookItem.id)) {
                            setActivePurchaseBtn(true);
                        } else {
                            setActivePurchaseBtn(false);
                        }
                    });
            });
    }


    useEffect(() => {
        btnIsActive();
        fetchingBookItem(itemId);
        fetchingUserData();
        calculateBookRating(bookLikes, bookDislikes);
    }, [itemId, disabledAddingBtn, cartItems, isActiveDislikeBtn, isActiveLikeBtn, bookLikes, bookDislikes]);

    useEffect(() => {
        if (user.name) {
            checkingLikes();
            checkingBuyingRules(user);
        }

        setBookLikes(bookItem.likes);
        setBookDislikes(bookItem.dislikes);
    }, [user, fetchingBookItem]);

    return (
        <div className={isAdmin ? "main-wrapper admin-book-wrapper" : "main-wrapper"}>
            <div className="book-item-page-container">
                <div className="book-item-main-container">
                    <div className="book-item__image-container">
                        <div className="book-cover-wrapper">
                            <img src={bookItem?.file} alt="book-image" />
                        </div>
                        <div>
                            <p>Price: {bookItem?.price} $</p>
                            <p>Rating: {bookRating}/10</p>
                            {user &&<div className="book-likes-box">
                                <Button onClick={() => likeBookHandler(true)}>
                                    {isActiveLikeBtn && <ThumbUpIcon />}
                                    {!isActiveLikeBtn && <ThumbUpOffAltIcon />}
                                    <span>{bookLikes}</span>
                                </Button>
                                <Button onClick={() => likeBookHandler(false)} color="error">
                                    {isActiveDislikeBtn && <ThumbDownIcon />}
                                    {!isActiveDislikeBtn && <ThumbDownOffAltIcon />}
                                    <span>{bookDislikes}</span>
                                </Button>
                            </div>}
                            {!isAdmin && bookItem?.price !== 0 && <Button
                                variant="contained"
                                disabled={disabledAddingBtn}
                                className="add-cart-btn"
                                onClick={() => addToCartHandler(bookItem.id)}
                            >
                                <ShoppingCartIcon />
                                <span>Add to cart</span>
                            </Button>}
                            {(isAdmin || bookItem?.price === 0) && (
                                <Button
                                    variant="contained"
                                    className="download-btn"
                                    onClick={() => fetchingDownloadBook(itemId)}
                                >
                                    <DownloadIcon />
                                    <span>Download book</span>
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="book-item__main-info">
                        <div className="book-title-box">
                            <h1>{bookItem?.name}</h1>
                            <div>
                                {isAdmin && <Button
                                    title="Block this book"
                                    variant="contained"
                                    color="error"
                                    disabled={bookItem?.status === "BAD"}
                                    onClick={() => blockBookHandler("BAD")}
                                >Block</Button>}
                                {isAdmin && <Button
                                    title="Unlock this book"
                                    variant="contained"
                                    disabled={bookItem?.status === "GOOD"}
                                    onClick={() => blockBookHandler("GOOD")}
                                >Unblock</Button>}
                                {user.role === "PUBLISHING" && bookItem.authorId !== null &&
                                    <Button
                                        variant="contained"
                                        color="success"
                                        disabled={activePurchaseBtn}
                                        onClick={openBuyingRightsModalHandler}
                                    >
                                        <PaidIcon />
                                        <span style={{ marginLeft: "5px", fontWeight: "normal" }}>Buy rights</span>
                                    </Button>
                                }
                            </div>
                        </div>
                        <div className="main-info__top">
                            <ul>
                                <li>
                                    <p>Publish Year</p>
                                    <p>{bookItem?.publishDate}</p>
                                </li>
                                <li>
                                    <p>Language</p>
                                    <p>{bookItem?.language}</p>
                                </li>
                                <li>
                                    <p>Pages</p>
                                    <p>{bookItem?.pagesCount}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="book-item-details-container">
                            <h2>Book Details</h2>
                            <hr />
                            <div>
                                <ul>
                                    <li>
                                        <span>Authors:</span>
                                        {bookItemAuthorsList?.map((author => (
                                            <span key={author.id} className="item">
                                                <Link to={`/home/author-info/${author.id}`}>{author.name}</Link>
                                            </span>
                                        )))}
                                    </li>
                                    <li>
                                        <span>Categories:</span>
                                        {bookItemCategoriesList?.map((category => (
                                            <span key={category.id} className="item">
                                                <Link to={`/home/shop/subcategories/${category.name.toLowerCase()}`}>{category.name}</Link>
                                            </span>
                                        )))}
                                    </li>
                                    <li>
                                        <span>Publishers:</span>
                                        {bookItemPublishersList?.map((publisher => (
                                            <span key={publisher.id} className="item">
                                                <Link to={`/home/publisher-info/${publisher.id}`}>{publisher.name}</Link>
                                            </span>
                                        )))}
                                        {bookItemPublishersList?.length === 0 && <span>-</span>}
                                    </li>
                                    <li>
                                        <span>Read preview:</span>
                                        <Button
                                            onClick={() => fetchingDownloadBookPreview(itemId)}
                                            style={{ fontWeight: "normal", marginLeft: "10px" }}
                                        >
                                            <DownloadIcon />
                                            <span>Open preview</span>
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-panel-container">
                    <TabsPanel tabsInfo={tabsInfo} />
                </div>
            </div>

            <Modal
                open={openRightsModal}
                onClose={closeBuyingRightsModalHandler}
            >
                <Box className="delete-modal buying-rules-modal">
                   <form onSubmit={submitBuyingRightsHandler}>
                       <div className="control">
                           <label>Purchase price ($)</label>
                           <input
                               type="text"
                               value={purchasePriceInput}
                               onChange={(e) => setPurchasePriceInput(Number(e.target.value))}
                           />
                       </div>
                       <div className="control">
                           <label>Accompanying text</label>
                           <input
                               type="text"
                               value={purchaseTextInput}
                               onChange={(e) => setPurchaseTextInput(e.target.value)}
                           />
                       </div>
                       <div>
                           <Button type="submit" variant="contained">Send</Button>
                       </div>
                   </form>

                    <div>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeBuyingRightsModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default BookItemPage;