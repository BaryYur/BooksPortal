import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import ItemsContext from "../context/items-context";
import CartContext from "../context/cart-context";

import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TabsPanel from "../components/Tabs/TabsPanel";
import "./BookItemPage.css";
// import bookItemCard from "../components/BookItems/BookItemCard";

const BookItemPage = () => {
    const itemId = useParams().id;
    const { bookItem, fetchingBookItem } = useContext(ItemsContext);
    const cartCtx = useContext(CartContext);
    let tabsInfo = [
        {
            name: "description",
            description: bookItem.description,
        },
        {
            name: "comments",
            description: "some text",
        }
    ];
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(false);
    const [bookItemCategories, setBookItemCategories] = useState([]);

    const addToCartHandler = (id) => {
        cartCtx.addToCart(id, {
            name: bookItem.name,
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

    const categoriesList = () => {
        fetch("http://localhost:8081/category")
            .then(response => response.json())
            .then(data => {
                if (data !== []) {
                    for (let category of bookItem.categories) {
                        for (let i = 0; i < data.length; i++) {
                            if (category === data[i].id) {
                                setBookItemCategories(prevItem => {
                                    return [
                                        ...prevItem,
                                        {
                                            id: data[i].id,
                                            name: data[i].name,
                                        },
                                    ];
                                });
                            }
                        }
                    }
                }

                console.log(bookItemCategories);
            })
    }

    useEffect(() => {
        btnIsActive();

        fetchingBookItem(itemId);
        // categoriesList();
    }, [itemId, disabledAddingBtn, cartCtx.cartItems])

    return (
        <div className="main-wrapper">
            <div className="book-item-page-container">
                <div className="book-item-main-container">
                    <div className="book-item__image-container">
                        <div className="book-cover-wrapper">
                            <img src={bookItem.file} alt="book-image" />
                        </div>
                        <div>
                            <p>Price: {bookItem.price} hrn</p>
                            <Button
                                variant="contained"
                                disabled={disabledAddingBtn}
                                onClick={() => addToCartHandler(bookItem.id)}
                            >
                                <ShoppingCartIcon />
                                <span>Add to cart</span>
                            </Button>
                        </div>
                    </div>
                    <div className="book-item__main-info">
                        <div>
                            <h1>{bookItem.name}</h1>
                        </div>
                        <div className="main-info__top">
                            <ul>
                                <li>
                                    <p>Publish Date</p>
                                    <p>{bookItem.publishDate}</p>
                                </li>
                                <li>
                                    <p>Publisher</p>
                                    <p>{bookItem.publisher !== null ? <span>{bookItem.publisher}</span> : <span>-</span>}</p>
                                </li>
                                <li>
                                    <p>Language</p>
                                    <p>{bookItem.language}</p>
                                </li>
                                <li>
                                    <p>Pages</p>
                                    <p>{bookItem.pagesCount}</p>
                                </li>
                            </ul>
                        </div>
                        <div className="book-item-details-container">
                            <h2>Book Details</h2>
                            <hr />
                            <div>
                                <ul>
                                    {/*<li>*/}
                                        {/*Authors: {bookItem.authors[0]}*/}
                                    {/*</li>*/}
                                    {/*<li>Categories:*/}
                                    {/*    {bookItemCategories.map((category => (*/}
                                    {/*        <span key={category.id}>{category.name}</span>*/}
                                    {/*    )))}*/}
                                    {/*</li>*/}
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