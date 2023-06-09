import React, { useEffect, useState } from "react";

const CartContext = React.createContext({
    fetchingCartItems: (id) => {},
    addingToCart: () => {},
    deleteFromCart: (id) => {},
    fetchingBuyingOrder: (body) => {},
    dropCart: () => {},
});

export const CartContextProvider = ({ children }) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCounter, setCartItemsCounter] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [userId, setUserId] = useState(
        JSON.parse(localStorage.getItem("userData")) || ""
    );

    const closeCartHandler = () => setCartIsOpen(false);
    const openCartHandler = () => setCartIsOpen(true);

    const fetchingCartItems = (userId) => {
        setCartItemsCounter(0);

        fetch(`http://localhost:8081/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.basket.length !== 0) {
                    fetch(`http://localhost:8081/book/ids?ids=${data.basket}`)
                        .then(response => response.json())
                        .then(data => {
                            setCartItems(data);
                        });
                }

                setCartItemsCounter(0);

                for (let item of data.basket) {
                    setCartItemsCounter(counter => counter + 1);
                }
            });
    }

    const addingToCart = (userId, body) => {
        fetch(`http://localhost:8081/user/${userId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                fetchingCartItems(userId);
            })
            .catch(error => console.log(error));
    }

    const countTotalPrice = () => {
        setCartTotalPrice(0);

        for (let item of cartItems) {
            if (cartItems.length !== 0) {
                setCartTotalPrice(counter => counter + (item.cartQuantity * item.price));
            }
        }
    }

    const fetchingBuyingOrder = (body) => {
        fetch(`http://localhost:8081/pay?id=${body.id}&ids=${body.ids}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => response.text())
            .then(html => {
                document.getElementById("pay-btn").innerHTML = html;
            });
    }

    const deleteFromCart = (userId, body) => {
        fetch(`http://localhost:8081/user/${userId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (body.basket.length === 0) {
                    setCartItems([]);
                }

                fetchingCartItems(userId);
            })
            .catch(error => console.log(error));
    }

    const dropCart = () => {
        setCartItemsCounter(0);
        setCartItems([]);
    }

    useEffect(() => {
        countTotalPrice();
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartIsOpen: cartIsOpen,
                openCart: openCartHandler,
                closeCart: closeCartHandler,
                cartItems: cartItems,
                addToCart: addingToCart,
                cartItemsCounter: cartItemsCounter,
                cartTotalPrice: cartTotalPrice,
                deleteFromCart: deleteFromCart,
                fetchingCartItems: fetchingCartItems,
                fetchingBuyingOrder: fetchingBuyingOrder,
                dropCart: dropCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;