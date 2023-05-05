import React, { useEffect, useState } from "react";

const CartContext = React.createContext({
    fetchingCartItems: (id) => {},
    addingToCart: () => {},
    deleteFromCart: (id) => {},
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

        fetch(`${process.env.REACT_APP_MAIN_PATH}/user/${userId}`)
            .then(response => response.json())
            .then(data => {
                fetch(`${process.env.REACT_APP_MAIN_PATH}/book/ids?ids=${data.basket}`)
                    .then(response => response.json())
                    .then(data => {
                        setCartItems(data);
                    })

                setCartItemsCounter(0);

                for (let item of data.basket) {
                    setCartItemsCounter(counter => counter + 1);
                }
            });
    }

    const addingToCart = (userId, body) => {
        fetch(`${process.env.REACT_APP_MAIN_PATH}/user/${userId}`, {
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

    const deleteFromCart = (userId, body) => {
        fetch(`${process.env.REACT_APP_MAIN_PATH}/user/${userId}`, {
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
                dropCart: dropCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;