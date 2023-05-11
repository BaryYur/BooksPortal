import React, { useContext, useEffect } from "react";

import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";

import OrderForm from "./OrderForm";
import "./OrderPage.css";

const OrderPage = () => {
    const { fetchingCartItems } = useContext(CartContext);
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        let userId = JSON.parse(localStorage.getItem("userData")) || "";

        if (userId !== "" && isLoggedIn) {
            fetchingCartItems(userId.id);
        }
    }, []);

    return (
        <div className="main-wrapper">
            <div className="order-page-container">
                <OrderForm />
            </div>
        </div>
    );
}

export default OrderPage;