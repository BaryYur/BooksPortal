import React, { useContext, useEffect, useMemo, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import CartContext from "../../context/cart-context";
import AuthContext from "../../context/auth-context";

import { Button, Card } from "@mui/material";

const BookItemCard = ({ id, name, price, link }) => {
    const navigate = useNavigate();
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const [activeAddingBtn, setActiveAddingBtn] = useState(false);

    const addToCartHandler = () => {
        if (authCtx.isLoggedIn) {
            cartCtx.addToCart(id, {
                name: name,
                category: "cat 1",
                price: 20,
            });

            setActiveAddingBtn(true);   
        } else {
            navigate("/home/auth");
        }
    }

    const btnIsActive = () => {
        let idArr = [];

        for (let item of cartCtx.cartItems) {
            if (item.id === id) {
                setActiveAddingBtn(true);
            }

            idArr.push(item.id);
        }

        if (!idArr.includes(id)) {
            setActiveAddingBtn(false);
        }

        return activeAddingBtn;
    }

    useEffect(() => {
        btnIsActive();
    }, [activeAddingBtn, cartCtx.cartItems])

    return (
        <li>
            <Card
                style={{
                    minHeight: "280px",
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <Link to={link} title={name}>
                    <div className="book-card__head">
                        {/*<img src={img} alt={name} />*/}
                        {name.length > 50 ?
                            <p>{name.split("").splice(0, 40).join("")}...</p> :
                            <p>{name}</p>
                        }
                    </div>
                </Link>
                <div className="book-card__bottom">
                    <div>
                        <h3>{price}</h3>
                        <span>hrn</span>
                    </div>
                    <Button
                        variant="contained"
                        disabled={activeAddingBtn}
                        className="adding-to-cart-btn"
                        onClick={addToCartHandler}
                    >Add</Button>
                </div>
            </Card>
        </li>
    );
}

export default BookItemCard;