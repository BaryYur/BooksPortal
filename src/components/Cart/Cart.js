import React, { useContext } from "react";

import CartContext from "../../context/cart-context";

import CartItems from "./CartItems";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import "./Cart.css";

const Cart = () => {
    const cartCtx = useContext(CartContext);

    return (
        <div className="cart-container">
            <Modal
                open={cartCtx.cartIsOpen}
                onClose={cartCtx.closeCart}
                className="modal"
            >
                <Box className="cart-box">
                    <div className="cart-head">
                        <h2>Your Cart</h2>
                        <button onClick={cartCtx.closeCart}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="line"></div>
                    {cartCtx.cartItems.length === 0 ?
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