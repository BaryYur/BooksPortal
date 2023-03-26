import React, { useEffect, useState } from "react";

const CartContext = React.createContext({
    fetchingCartItems: () => {},
    addingToCart: () => {},
    deleteFromCart: (id) => {},
    increaseCartItemsCounter: (id) => {},
    decreaseCartItemsCounter: (id) => {},
});

export const CartContextProvider = ({ children }) => {
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsCounter, setCartItemsCounter] = useState(0);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const userId = "";

    const closeCartHandler = () => setCartIsOpen(false);
    const openCartHandler = () => setCartIsOpen(true);

    const counter = () => {
        setCartItemsCounter(0);

        for (let item of cartItems) {
            if (cartItems.length !== 0) {
                setCartItemsCounter(counter => counter + item.cartQuantity);
            }
        }
    }

    const fetchingCartItems = () => {
        fetch(`https://.../${userId}/cart`)
            .then(response => response.json())
            .then(data => setCartItems(data))
    }

    const addingToCart = (id, body) => {
        // fetch(`https://.../${userId}/cart`, {
        //     method: "POST",
        //     body: JSON.stringify(body),
        // })

        setCartItems(prevItem => {
            return [...prevItem, {
                id: id,
                name: "String 4",
                category: "Category 4",
                price: 40,
                cartQuantity: 1,
            }];
        })
    }

    const deleteFromCart = (id) => {
        // fetch(`https://.../${userId}/cart/item/${id}`, {
        //     method: "DELETE",
        // })

        setCartItems(cartItems.filter(item => item.id !== id));
    }


    const increaseCartItemsCounter = (id) => {
        // fetch(`https://.../${userId}/cart/item/${id}`, {
        //     method: "PUT",
        // })

        for (let cartItem of cartItems) {
            if (cartItem.id === id) {
                cartItem.cartQuantity = cartItem.cartQuantity + 1; 
            }
        }

        counter();
    }

    const decreaseCartItemsCounter = (id) => {
        // fetch(`https://.../${userId}/cart/item/${id}`, {
        //     method: "PUT",
        // })

        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ title: 'React PUT Request Example' })
        // }

        // fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
        //     .then(response => response.json())
        //     .then(data => this.setState({ postId: data.id }));

        for (let cartItem of cartItems) {
            if (cartItem.id === id) {
                cartItem.cartQuantity = cartItem.cartQuantity - 1; 
            }
        }

        counter();
    }

    const countTotalPrice = () => {
        setCartTotalPrice(0);

        for (let item of cartItems) {
            if (cartItems.length !== 0) {
                setCartTotalPrice(counter => counter + (item.cartQuantity * item.price));
            }
        }
    }

    useEffect(() => {
        counter();
        countTotalPrice();
    }, [
        cartItems, 
        cartItemsCounter, 
        increaseCartItemsCounter, 
        decreaseCartItemsCounter,
        cartTotalPrice,
    ])   

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
                increaseCounter: increaseCartItemsCounter,
                decreaseCounter: decreaseCartItemsCounter,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;