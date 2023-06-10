import React, { useContext, useEffect, useMemo, useState } from "react";

import { useCutText } from "../../hooks/useCutText";
import { useScrollToTop } from "../../hooks/useScrollToTop";

import { Link, useNavigate } from "react-router-dom";

import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";
import ItemsContext from "../../context/items-context";

import { Button, Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const BookItemCard = ({ 
    id, 
    name, 
    price, 
    link,
    status, 
    img, 
    categories, 
    authors, 
    description, 
    publishDate, 
    language, 
    pagesCount,
    publishers,
    likes,
    dislikes,
    searchingName,
    adminItems,
    authorId,
    publisherId,
}) => {
    const navigate = useNavigate();
    const { addToCart, cartItems } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const { fetchingDeletingBookItem, fetchingUnlockBook, fetchingSearchingItems, purchasedBooks } = useContext(ItemsContext);
    const [activeAddingBtn, setActiveAddingBtn] = useState(false);
    const [openDeletingModal, setOpenDeletingModal] = useState(false);
    const [userData, setUserData] = useState({});
    const { changeText } = useCutText();
    const { scrollToTop } = useScrollToTop();
    const [searchingLoading, setSearchingLoading] = useState(false);

    const fetchingUserData = () => {
        let userId = JSON.parse(localStorage.getItem("userData")).id;

        fetch(`http://localhost:8081/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                setUserData(user);
            });
    }

    const addToCartHandler = () => {
        if (!isLoggedIn) {
            navigate("/home/auth");
        } else {
            let newBasket = userData.basket;
            newBasket.push(id);

            let userBody = {
                basket: newBasket,
                email: userData.email,
                name: userData.name,
                password: userData.password,
                role: userData.role,
                status: userData.status,
                likes: userData.likes,
                dislikes: userData.dislikes,
                subscriptionOnAuthors: userData.subscriptionOnAuthors,
                subscriptionOnPublishers: userData.subscriptionOnPublishers
            }

            addToCart(userData.id, userBody);
        }

        setActiveAddingBtn(true);
    }

    const btnIsActive = () => {
        let idArr = [];

        for (let item of cartItems) {
            if (item.id === id) {
                setActiveAddingBtn(true);
            }

            idArr.push(item.id);
        }

        let pArr = [];

        for (let book of purchasedBooks) {
            pArr.push(book.bookName);
        }

        if (!idArr.includes(id) && !pArr.includes(name)) {
            setActiveAddingBtn(false);
        } else {
            setActiveAddingBtn(true);
        }

        return activeAddingBtn;
    }

    const changedName = useMemo(() => changeText(name, 40), []);

    const closeDeletingModalHandler = () => setOpenDeletingModal(false);
    const openDeletingModalHandler = () => setOpenDeletingModal(true);

    const deleteItemHandler = (id) => {
        fetchingDeletingBookItem(id);

        setOpenDeletingModal(false);
    }

    const blockBookHandler = (status) => {
        let body = {
            id: id,
            name: name,
            price: price,
            status: status,
            file: img,
            description: description,
            publishDate: publishDate,
            pagesCount: pagesCount,
            language: language,
            categories: categories,
            authors: authors,
            publishers: publishers,
            likes: likes,
            dislikes: dislikes,
            publisherId: publisherId,
            authorId: authorId,
        }

        fetchingUnlockBook(body, searchingName);
        setSearchingLoading(true);

        setTimeout(() => {
            fetchingSearchingItems(searchingName, true);
            setSearchingLoading(false);
        }, 1000);
    }

    const [cardHeight, setCardHeight] = useState("");

    useEffect(() => {
        btnIsActive();

        if (isLoggedIn) {
            fetchingUserData();
        }

        adminItems ? setCardHeight("450px") : setCardHeight("415px");
    }, [activeAddingBtn, cartItems, isLoggedIn]);

    return (
        <li>
            <Card
                style={{
                    minHeight: cardHeight,
                    maxHeight: cardHeight,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <Link
                    to={adminItems ? `/admin/book/${id}` : link}
                    title={name}
                    onClick={scrollToTop}
                >
                    <div className="book-card__head">
                        <img src={img} alt={name} />
                        <p>{changedName}</p>
                    </div>
                </Link>
                <div className="book-card__bottom">
                    {!adminItems && <div>
                        <h3>{price}</h3>
                        <span>$</span>
                    </div>}
                    {!adminItems && price !== 0 && <Button
                        variant="contained"
                        disabled={activeAddingBtn}
                        className="adding-to-cart-btn"
                        onClick={addToCartHandler}
                    >Add</Button>}
                    {adminItems && <button
                        // color="error"
                        // title="Delete this book"
                        className="delete-book-btn"
                        style={{ position: "absolute" }}
                        onClick={openDeletingModalHandler}
                    >
                        <span>
                            <DeleteIcon />
                        </span>
                    </button>}
                    {adminItems && <Button
                        title="Block this book"
                        variant="contained"
                        color="error"
                        className="block-book-btn"
                        style={{ position: "absolute" }}
                        disabled={status === "BAD"}
                        onClick={() => blockBookHandler("BAD")}
                    >Block</Button>}
                    {adminItems && <Button
                        title="Unlock this book"
                        variant="contained"
                        className="unlock-book-btn"
                        style={{ position: "absolute" }}
                        disabled={status === "GOOD"}
                        onClick={() => blockBookHandler("GOOD")}
                    >Unblock</Button>}
                    {adminItems && status === "CONSIDERATION" &&
                        <p className="book-status">
                            <span>consideration</span>
                        </p>
                    }
                </div>
            </Card>

            <Modal open={openDeletingModal}>
                <Box className="delete-modal">
                    <h3>You really want to delete this book?</h3>
                    <div className="delete-modal-btns">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteItemHandler(id)}
                        >Delete</Button>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeDeletingModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
            <Modal open={searchingLoading}>
                <Box className="searching-modal">
                    <CircularProgress />
                </Box>
            </Modal>
        </li>
    );
}

export default BookItemCard;