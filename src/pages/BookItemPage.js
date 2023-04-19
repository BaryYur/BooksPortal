import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";
import CartContext from "../context/cart-context";

import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TabsPanel from "../components/Tabs/TabsPanel";
import "./BookItemPage.css";
import bookCover from "../images/book-cover.jpg";

const BookItemPage = () => {
    const itemId = useParams().id;
    const itemsCtx = useContext(ItemsContext);
    const cartCtx = useContext(CartContext);
    let tabsInfo = [
        {
            name: "description",
            description: itemsCtx.bookItem.description,
        },
        {
            name: "comments",
            description: "some text",
        }
    ];
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(false);

    const addToCartHandler = (id) => {
        cartCtx.addToCart(id, {
            name: itemsCtx.bookItem.name,
            category: "cat 1",
            price: 20,
        });

        setDisabledAddingBtn(true);
    }


    const btnIsActive = () => {
        let idArr = [];

        for (let item of cartCtx.cartItems) {
            if (item.id === itemId) {
                setDisabledAddingBtn(true);
            }

            idArr.push(item.id);
        }

        if (!idArr.includes(itemId)) {
            setDisabledAddingBtn(false);
        }

        return setDisabledAddingBtn;
    }

    useEffect(() => {
        btnIsActive();

        itemsCtx.fetchingBookItem(itemId, "");
    }, [itemId, disabledAddingBtn, cartCtx.cartItems])

    return (
        <div className="main-wrapper">
            <div className="book-item-page-container">
                <div className="book-item-main-container">
                    <div className="book-item__image-container">
                        <div className="book-cover-wrapper">
                            <img src={bookCover} alt="book-image" />
                        </div>
                        <div>
                            <p>Price: {itemsCtx.bookItem.price} hrn</p>
                            <Button
                                variant="contained"
                                disabled={disabledAddingBtn}
                                onClick={() => addToCartHandler(itemsCtx.bookItem.id)}
                            >
                                <ShoppingCartIcon />
                                <span>Add to cart</span>
                            </Button>
                        </div>
                    </div>
                    <div className="book-item__main-info">
                        <div>
                            <h1>{itemsCtx.bookItem.name}</h1>
                        </div>
                        <div className="main-info__top">
                            <ul>
                                <li>
                                    <p>Publish Date</p>
                                    <p>{itemsCtx.bookItem.publishDate}</p>
                                </li>
                                <li>
                                    <p>Publisher</p>
                                    <p>{itemsCtx.bookItem.publisher}</p>
                                </li>
                                <li>
                                    <p>Language</p>
                                    <p>{itemsCtx.bookItem.language}</p>
                                </li>
                                <li>
                                    <p>Pages</p>
                                    <p>{itemsCtx.bookItem.pages}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="book-item-details-container">
                            <h2>Book Details</h2>
                            <hr />
                            <div>
                                <ul>
                                    <li>test 1</li>
                                    <li>test 2</li>
                                    <li>test 3</li>
                                    <li>test 4</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="table-panel-container">
                    <TabsPanel tabsInfo={tabsInfo} />
                </div>
            </div>
        </div>
    );
}

export default BookItemPage;