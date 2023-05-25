import React, { useContext } from "react";

import CartContext from "../../context/cart-context";

import CartItem from "./CartItem";
import "./CartItems.css";

const CartItems = () => {
    const cartCtx = useContext(CartContext);

    return (
        <div className="cart-items-container">
            <ul>
                {cartCtx.cartItems.map(cartItem => (
                    <CartItem
                        id={cartItem.id}
                        key={Math.random()}
                        name={cartItem.name}
                        price={cartItem.price}
                        img={cartItem.file}
                        pagesCount={cartItem.pagesCount}
                        language={cartItem.language}
                        category={cartItem.categories[0]}
                    />
                ))}
                {/*<div className="cart-bottom">*/}
                {/*    <h2>Total price: <span>{cartCtx.cartTotalPrice}</span>hrn</h2>*/}
                {/*</div>*/}
            </ul>
        </div>
    );
}

export default CartItems;