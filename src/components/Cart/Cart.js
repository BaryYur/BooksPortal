import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/auth-context";
import CartContext from "../../context/cart-context";

import CartItems from "./CartItems";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";

const Cart = () => {
    const { cartIsOpen, closeCart, cartItems, fetchingCartItems } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem("userData")) || "";

        if (userId !== "" && isLoggedIn) {
            fetchingCartItems(userId.id);
        }
    }, []);

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
                </Box>
            </Modal>
        </div>
    );
}

export default Cart;