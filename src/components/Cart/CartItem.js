import React, { useContext } from "react";

import { Link } from "react-router-dom";
import CartContext from "../../context/cart-context";

import { Button, Card } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartItem.css";

const CartItem = ({ name, id, price, category, img }) => {
    const cartCtx = useContext(CartContext);

    const deleteCartItemHandler = (id) => cartCtx.deleteFromCart(id);

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
                        <div>{price} hrn</div>
                        <button className="price-box__delete-btn" title="Delete item" onClick={() => deleteCartItemHandler(id)}>
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                    <div className="order-box">
                        <Link onClick={cartCtx.closeCart} to="/home/order" className="order-cart-item-box">
                            <Button variant="contained">Order</Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </li>
    );
}

export default CartItem;