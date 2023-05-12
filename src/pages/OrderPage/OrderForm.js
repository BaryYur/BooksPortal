import { useState, useEffect, useContext } from "react";

import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";

import CartItems from "../../components/Cart/CartItems";
import PaymentIcon from "@mui/icons-material/Payment";
import { Button } from "@mui/material";

const OrderForm = () => {
    const { user, fetchingUserData } = useContext(AuthContext);
    const { cartItems, fetchingBuyingOrder } = useContext(CartContext);
    const [cartItemsIds, setCartItemsIds] = useState([]);
    const [cartItemsTotalPrice, setCartItemsTotalPrice] = useState(0);

    const submitBuyingFormHandler = () => {
        let body = {
            id: user.id,
            ids: cartItemsIds,
        }

        fetchingBuyingOrder(body);
    }

    const countingItems = () => {
        setCartItemsTotalPrice(0);
        setCartItemsIds([]);

        for (let book of cartItems) {
            setCartItemsIds(prevBookId => {
                return [
                    ...prevBookId,
                    book.id,
                ];
            });

            setCartItemsTotalPrice(cartItemsTotalPrice => cartItemsTotalPrice + book.price);
        }
    }

    const openPayFormHandler = () => {
        setTimeout(() => {
            const form = document.querySelector("form");
            form.setAttribute("target", "_blank");
        }, 200);
    }

    useEffect(() => {
        fetchingUserData();
        openPayFormHandler();
    }, [cartItems]);

    useEffect(() => {
        countingItems();
        submitBuyingFormHandler();
    }, [cartItems, user]);

    return (
        <div>
            <CartItems />
            <div className="order-page__order-box">
                {cartItemsTotalPrice !== 0 && <div>
                    <h2>Total price: {cartItemsTotalPrice}$</h2>
                    <Button
                        variant="contained"
                        color="success"
                        className="buy-books-btn"
                        style={{ position: "absolute", zIndex: 1 }}
                    >
                        <PaymentIcon />
                        <span>Buy this books</span>
                    </Button>
                    <div id="pay-btn" className="pay-book-btn"></div>
                </div>}
            </div>
            {cartItemsTotalPrice === 0 &&  <p className="no-items-paragraph">Nothing here yet</p>}
        </div>
    );
}

export default OrderForm;