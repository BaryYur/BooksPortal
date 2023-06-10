import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import CartContext from "../../context/cart-context";
// import ItemsContext from "../../context/items-context";

import { Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AuthContext from "../../context/auth-context";
import "./CartItem.css";

const CartItem = ({ name, id, price, category, img, pagesCount, language }) => {
    const cartCtx = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);
    // const { fetchingBookItem, bookItemCategoriesList, bookItemAuthorsList } = useContext(ItemsContext);
    const [userData, setUserData] = useState({});

    const fetchingUserData = () => {
        let userId = JSON.parse(localStorage.getItem("userData")).id;

        fetch(`http://localhost:8081/user/${userId}`)
            .then(response => response.json())
            .then(user => {
                setUserData(user);
            })
    }

    const deleteCartItemHandler = (id) => {
        let newBasket = [...userData.basket];
        newBasket = newBasket.filter(item => item !== id);

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

        cartCtx.deleteFromCart(userData.id, userBody);
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchingUserData();
            // fetchingBookItem(id);
        }
    }, [isLoggedIn]);

    return (
        <li>
            <Card className="book-card">
                <div className="cart-item-box">
                    <Link onClick={cartCtx.closeCart} to={`/home/shop/books/${category}/${id}`}>
                        <img src={img} alt={name} />
                    </Link>
                    <div>
                        <Link onClick={cartCtx.closeCart} to={`/home/shop/books/${category}/${id}`}>{name}</Link>
                        <p>Pages: <span>{pagesCount}</span></p>
                        <p>Language: <span>{language}</span></p>
                        {/*<div className="names-list">*/}
                        {/*    <span>Authors:</span>*/}
                        {/*    <ul>*/}
                        {/*        {bookItemAuthorsList.map((author => (*/}
                        {/*            <li key={author.id} className="item">{author.name}</li>*/}
                        {/*        )))}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                        {/*<div className="names-list">*/}
                        {/*    <span>Categories:</span>*/}
                        {/*    <ul>*/}
                        {/*        {bookItemCategoriesList.map((category => (*/}
                        {/*            <li key={category.id} className="item">{category.name}</li>*/}
                        {/*        )))}*/}
                        {/*    </ul>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div className="price-and-delete-container">
                    <div className="price-box">
                        <div>{price} $</div>
                        <button className="price-box__delete-btn" title="Delete item" onClick={() => deleteCartItemHandler(id)}>
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default CartItem;