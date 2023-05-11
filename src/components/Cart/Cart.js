import React, {useContext, useEffect, useState} from "react";

import { Link } from "react-router-dom";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import CartItems from "./CartItems";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import "./Cart.css";

const Cart = () => {
    const { cartIsOpen, closeCart, cartItems, fetchingCartItems, fetchingBuyingOrder } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        let userId = "";

        if (JSON.parse(localStorage.getItem("userData"))) {
            userId = JSON.parse(localStorage.getItem("userData")).id;
        }

        if (userId !== "" && isLoggedIn) {
            fetchingCartItems(userId);
        }
    }, []);

    const submitBuyingFormHandler = () => {
        let ids = [];
        let userId = "";

        if (JSON.parse(localStorage.getItem("userData"))) {
            userId = JSON.parse(localStorage.getItem("userData")).id;

            for (let book of cartItems) {
                ids.push(book.id);
            }

            let body = {
                id: userId,
                ids: ids,
            }

            fetchingBuyingOrder(body);
        }
    }

    return (
        <div className="cart-container">
            <Modal
                open={cartIsOpen}
                onClose={closeCart}
                className="modal"
            >
                <Box className="cart-box">
                    <div className="cart-head">
                        <h2>Your Cart</h2>
                        <button onClick={closeCart}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="line"></div>
                    {cartItems.length === 0 ?
                        <p className="no-items-paragraph">
                            Your cart is empty
                        </p> : <CartItems />
                    }

                    {cartItems.length > 0 && <Link onClick={closeCart} to="/home/order" className="order-box">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={submitBuyingFormHandler}
                            className="buy-books-btn"
                        >
                            <ShoppingBasketIcon />
                            <span>Order</span>
                        </Button>
                    </Link>}
                </Box>
            </Modal>
        </div>
    );
}

export default Cart;