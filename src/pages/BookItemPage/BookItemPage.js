import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import ItemsContext from "../../context/items-context";
import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";

import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import TabsPanel from "../../components/Tabs/TabsPanel";
import BookItemComments from "./BookItemComments";
import "./BookItemPage.css";

const BookItemPage = () => {
    const navigate = useNavigate();
    const itemId = useParams().id;
    const { bookItem, fetchingBookItem, bookItemCategoriesList, bookItemAuthorsList } = useContext(ItemsContext);
    const { addToCart, cartItems } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(false);
    const [userData, setUserData] = useState({});

    let tabsInfo = [
        {
            name: "description",
            description: bookItem.description,
        },
        {
            name: "comments",
            description: <BookItemComments
                bookId={itemId}
                userName={userData.name}
                userId={userData.id}
            />,
        }
    ];

    const fetchingUserData = () => {
        let user = JSON.parse(localStorage.getItem("userData"));

        if (user) {
           let userId = JSON.parse(localStorage.getItem("userData")).id;

            fetch(`http://localhost:8081/user/${userId}`)
                .then(response => response.json())
                .then(user => {
                    setUserData(user);
                })
        }
    }

    const addToCartHandler = (id) => {
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
            }

            addToCart(userData.id, userBody);
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

        if (!idArr.includes(itemId)) {
            setDisabledAddingBtn(false);
        }

        return setDisabledAddingBtn;
    }

    useEffect(() => {
        btnIsActive();
        fetchingBookItem(itemId);
        fetchingUserData();

        // for () {
        //
        // }
        //
        // console.log(bookItemAuthorsList.join(", "));
    }, [itemId, disabledAddingBtn, cartItems]);

    return (
        <div className="main-wrapper">
            <div className="book-item-page-container">
                <div className="book-item-main-container">
                    <div className="book-item__image-container">
                        <div className="book-cover-wrapper">
                            <img src={bookItem.file} alt="book-image" />
                        </div>
                        <div>
                            <p>Price: {bookItem.price} $</p>
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
                                    <li>Authors:
                                        {bookItemAuthorsList.map((author => (
                                            <span key={author.id}>{author.name}</span>
                                        )))}
                                    </li>
                                    <li>Categories:
                                        {bookItemCategoriesList.map((category => (
                                            <span key={category.id}>{category.name}</span>
                                        )))}
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
        </div>
    );
}

export default BookItemPage;