import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

const SubcategoryPriceFiltering = ({ subcategory }) => {
    const { searchingFilteringItems, fetchingCategoryBooks } = useContext(ItemsContext);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minCurrentPrice, setMinCurrentPrice] = useState(0);
    const [maxCurrentPrice, setMaxCurrentPrice] = useState(0);

    const [catId, setCatId] = useState("");

    const gettingPrices = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                for (let cat of data) {
                    if (subcategory === cat.name.toLowerCase()) {
                        setCatId(cat.id);

                        fetch(`http://localhost:8081/book/category/${cat.id}/GOOD`)
                            .then(response => response.json())
                            .then(books => {
                                let prices = [];

                                for (let book of books) {
                                    prices.push(book.price);
                                }

                                let min = Math.min(...prices);
                                let max = Math.max(...prices);

                                setMinPrice(min);
                                setMaxPrice(max);
                            })
                            .catch(error => {
                                alert("Oops...");
                            });
                    }
                }
            });

        const getMinMaxPricesFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minPrice = searchParams.get("minPrice");
            const maxPrice = searchParams.get("maxPrice");

            return {
                minPrice: minPrice ? parseFloat(minPrice) : 0,
                maxPrice: maxPrice ? parseFloat(maxPrice) : 0
            }
        }

        let prices = getMinMaxPricesFromUrlString(window.location.href);

        setMinCurrentPrice(prices.minPrice);
        setMaxCurrentPrice(prices.maxPrice);
        setValue([prices.minPrice, prices.maxPrice]);
    }

    const [value, setValue] = useState([minCurrentPrice, maxCurrentPrice]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;

        searchParams.set("minPrice", newValue[0]);
        searchParams.set("maxPrice", newValue[1]);

        currentUrl.search = searchParams.toString();
        const updatedUrl = currentUrl.toString();

        window.history.replaceState(null, "", updatedUrl);
    }

    const valuetext = (value) => {
        return `${value}`;
    }

    const submitPrices = () => {
        setTimeout(() => {
            fetchingCategoryBooks(catId, window.location.href);
        }, 200);
    }

    useEffect(() => {
        gettingPrices();
    }, [searchingFilteringItems]);

    return (
        <div className="range-input-controller">
            {<div>
                <p style={{ fontWeight: "600" }}>By price:</p>
                <Box sx={{ width: "100%" }}>
                    <Slider
                        getAriaLabel={() => "price"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={minPrice}
                        max={maxPrice}
                    />
                </Box>
                <div className="max-min-numbers-box">
                    <p>{minPrice}$</p>
                    <p>{maxPrice}$</p>
                </div>
            </div>}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "5px", paddingBottom: "5px" }}>
                <Button onClick={submitPrices} variant="contained">ok</Button>
            </div>
        </div>
    );
}

export default SubcategoryPriceFiltering;