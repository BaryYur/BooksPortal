import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import { useNavigate } from "react-router-dom";

import RangeInput from "../../components/Forms/RangeInput";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

const PriceFiltering = () => {
    const navigate = useNavigate();
    const { searchingFilteringItems, fetchingFilteringSearching } = useContext(ItemsContext);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minCurrentPrice, setMinCurrentPrice] = useState(0);
    const [maxCurrentPrice, setMaxCurrentPrice] = useState(0);

    const gettingPrices = () => {
        let search = window.location.href.split("?text=")[1].split("/")[0];

        fetch(`http://localhost:8081/book/all/${search}/GOOD`)
            .then(response => response.json())
            .then(data => {
                let values = [];

                for (let book of data) {
                    values.push(book.price);
                }

                let min = values[0];
                let max = values[0];

                for (let price of values) {
                    if (price < min) {
                        min = price;
                    }

                    if (price > max) {
                        max = price;
                    }
                }

                setMinPrice(min);
                setMaxPrice(max);
            })
            .catch(error => {
                console.log('price error');
                // alert("Oops...");
            });

        const getMinMaxPricesFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minPrice = searchParams.get('minPrice');
            const maxPrice = searchParams.get('maxPrice');

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
        const params = new URLSearchParams(currentUrl.search);

        params.set("minPrice", newValue[0]);
        params.set("maxPrice", newValue[1]);

        const updatedSearch = params.toString().replace(/\+/g, "%20").replace(/\//g, "%2F");
        currentUrl.search = updatedSearch;

        const updatedUrl = decodeURIComponent(currentUrl.toString());
        window.history.replaceState(null, "", updatedUrl);
    }

    const valuetext = (value) => {
        return `${value}`;
    }

    const submitPrices = () => {
        navigate("?" + window.location.href.split("?")[1]);

        setTimeout(() => {
            fetchingFilteringSearching(window.location.href);
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

export default PriceFiltering;