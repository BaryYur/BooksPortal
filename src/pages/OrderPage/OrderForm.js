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

        console.log(body);

        fetchingBuyingOrder(body);
    }

    useEffect(() => {
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

        fetchingUserData();
    }, [cartItems]);

    useEffect(() => {
        submitBuyingFormHandler();
    }, [cartItems]);

    return (
        <div>
            <CartItems />
            <div className="order-page__order-box">
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
            </div>
        </div>
    );
}

export default OrderForm;