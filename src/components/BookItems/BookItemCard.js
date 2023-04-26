import React, { useContext, useEffect, useMemo, useState } from "react";

import { useCutText } from "../../hooks/useCutText";
import { useScrollToTop } from "../../hooks/useScrollToTop";

import { Link, useNavigate } from "react-router-dom";

import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";
import ItemsContext from "../../context/items-context";

import { Button, Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";

const BookItemCard = ({ 
    id, 
    name, 
    price, 
    link, 
    adminItems, 
    status, 
    img, 
    categories, 
    authors, 
    description, 
    publishDate, 
    language, 
    pagesCount,
    publisher,
    searchingName,
}) => {
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const { fetchingDeletingBookItem, fetchingUnlockBook } = useContext(ItemsContext);
    const [activeAddingBtn, setActiveAddingBtn] = useState(false);
    const [openDeletingModal, setOpenDeletingModal] = useState(false);
    const { changeText } = useCutText();
    const { scrollToTop } = useScrollToTop();

    const addToCartHandler = () => {
        cartCtx.addToCart(id, {
            name: name,
            category: "cat 1",
            price: 20,
        });

        setActiveAddingBtn(true);
    }

    const btnIsActive = () => {
        let idArr = [];

        for (let item of cartCtx.cartItems) {
            if (item.id === id) {
                setActiveAddingBtn(true);
            }

            idArr.push(item.id);
        }

        if (!idArr.includes(id)) {
            setActiveAddingBtn(false);
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

    useEffect(() => {
        btnIsActive();
    }, [activeAddingBtn, cartCtx.cartItems])

    return (
        <li>
            <Card
                style={{
                    minHeight: "355px",
                    maxHeight: "355px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <Link
                    to={link}
                    title={name}
                    onClick={scrollToTop}
                >
                    <div className="book-card__head">
                        {/* <img src={defImg} className={adminItems ? "admin-card-img" : ""} /> */}
                        <img src={img} alt={name} />
                        <p>{changedName}</p>
                    </div>
                </Link>
                <div className="book-card__bottom">
                    {!adminItems && <div>
                        <h3>{price}</h3>
                        <span>hrn</span>
                    </div>}
                    {!adminItems && <Button
                        variant="contained"
                        disabled={activeAddingBtn}
                        className="adding-to-cart-btn"
                        onClick={addToCartHandler}
                    >Add</Button>}
                    {adminItems && <button
                        title="Delete this book"
                        className="delete-book-btn"
                        onClick={openDeletingModalHandler}
                    >
                        <span>
                            <DeleteIcon />
                        </span>
                    </button>}
                    {adminItems && <button
                        title={status ? "Block this book" : "Unlock this book"}
                        className="unlock-book-btn"
                        onClick={() => {
                            if (status === true) {
                                let body = {
                                    id: id,
                                    name: name,
                                    price: price,
                                    status: false,
                                    file: img,
                                    description: description,
                                    publishDate: publishDate,
                                    pagesCount: pagesCount,
                                    language: language,
                                    categories: categories,
                                    authors: authors,
                                }

                                fetchingUnlockBook(body, searchingName);
                            } else {
                                let body = {
                                    id: id,
                                    name: name,
                                    price: price,
                                    status: true,
                                    file: img,
                                    description: description,
                                    publishDate: publishDate,
                                    pagesCount: pagesCount,
                                    language: language,
                                    categories: categories,
                                    authors: authors,
                                }

                                fetchingUnlockBook(body, searchingName);
                            }
                        }}
                    >
                        <span>
                            <BlockIcon />
                        </span>
                    </button>}
                    {adminItems && (
                        <p className={status ? "active-book-status" : "inactive-book-status"}>
                            {status ? <span>active</span> : <span>not active</span>}
                        </p>
                    )}
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
        </li>
    );
}

export default BookItemCard;