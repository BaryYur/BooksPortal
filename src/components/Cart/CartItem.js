import React, { useContext } from "react";

import { Link } from "react-router-dom";
import CartContext from "../../context/cart-context";

import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";

const CartItem = ({ name, id, price, category, img }) => {
    const cartCtx = useContext(CartContext);

    const deleteCartItemHandler = (id) => cartCtx.deleteFromCart(id);

    // const increaseHandler = () => {
    //     if (cartQuantity < quantity) {
    //         cartCtx.increaseCounter(id);
    //     } else {
    //         alert("This is maximum!")
    //     }
    // }

    // const decreaseHandler = () => {
    //     if (cartQuantity !== 1) {
    //         cartCtx.decreaseCounter(id);
    //     } else return;
    // }

    return (
        <li>
            <Card className="book-card">
                <div className="cart-item-box">
                    <Link onClick={cartCtx.closeCart} to={`/home/shop/categories/${category}/${id}`}>
                        {/* <img src={img} alt={name} /> */}
                    </Link>
                    <div>
                        <Link onClick={cartCtx.closeCart} to={`/home/shop/categories/${category}/${id}`}>{name}</Link>
                        <p>Category: {category} </p>
                    </div>
                </div>
                <div className="price-and-delete-container">
                    <div className="price-box">
                        {/*<button onClick={decreaseHandler}>-</button>*/}
                        {/*<div>*/}
                        {/*    {price * cartQuantity} <span>hrn</span> / {cartQuantity}*/}
                        {/*</div>*/}
                        <div>{price} hrn</div>
                        {/*<button onClick={increaseHandler}>+</button>*/}
                        <button className="price-box__delete-btn" title="Delete item" onClick={() => deleteCartItemHandler(id)}>
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                    <div className="order-box">
                        <Link to="/checkout" className="order-cart-item-box">
                            <Button variant="contained">Order</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default CartItem;