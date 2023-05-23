import React, {useContext, useEffect, useState} from "react";

import {useNavigate} from "react-router-dom";

import ItemsContext from "../../context/items-context";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const YearFiltering = () => {
    const navigate = useNavigate();
    const { searchingFilteringItems, fetchingFilteringSearching } = useContext(ItemsContext);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(0);
    const [currentMinYear, setCurrentMinYear] = useState(0);
    const [currentMaxYear, setCurrentMaxYear] = useState(0);
    const [value, setValue] = useState([currentMinYear, currentMaxYear]);

    const gettingYears = () => {
        let search = window.location.href.split("?text=")[1].split("/")[0];

        fetch(`http://localhost:8081/book/all/${search}/GOOD`)
            .then(response => response.json())
            .then(data => {
                let values = [];

                for (let book of data) {
                    values.push(book.publishDate);
                }

                let min = values[0];
                let max = values[0];

                for (let year of values) {
                    if (year < min) {
                        min = year;
                    }

                    if (year > max) {
                        max = year;
                    }
                }

                setMinYear(min);
                setMaxYear(max);
            })
            .catch(error => {
                alert("Oops...");
            });

        const getMinMaxYearsFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minYear = searchParams.get('minYear');
            const maxYear = searchParams.get('maxYear');

            return {
                minYear: minYear ? parseFloat(minYear) : 0,
                maxYear: maxYear ? parseFloat(maxYear) : 0
            }
        }

        let years = getMinMaxYearsFromUrlString(window.location.href);

        setCurrentMinYear(years.minYear);
        setCurrentMaxYear(years.maxYear);
        setValue([years.minYear, years.maxYear]);
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const currentUrl = window.location.href;
        const url = new URL(currentUrl);

        let params = new URLSearchParams(url.search);

        if (!params.has("minYear") || !params.has("maxYear")) {
            params.set("minYear", newValue[0]);
            params.set("maxYear", newValue[1]);
        } else {
            params.set("minYear", newValue[0]);
            params.set("maxYear", newValue[1]);
        }

        const updatedParams = params.toString();
        const updatedUrl = `${url.origin}${url.pathname}${updatedParams ? `?${updatedParams}` : ""}`.replace(/%2F/g, "/");

        window.history.replaceState(null, "", updatedUrl);
    }

    const valuetext = (value) => {
        return `${value}`;
    }

    const submitYears = () => {
        navigate("?" + window.location.href.split("?")[1]);

        setTimeout(() => {
            fetchingFilteringSearching(window.location.href);
        }, 200);
    }

    useEffect(() => {
        gettingYears();
    }, [searchingFilteringItems]);

    return (
        <div className="range-input-controller">
            {<div>
                <p style={{ fontWeight: "600" }}>By year:</p>
                <Box sx={{ width: "100%" }}>
                    <Slider
                        getAriaLabel={() => "years"}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        min={minYear}
                        max={maxYear}
                    />
                </Box>
                <div className="max-min-numbers-box">
                    <p>{minYear}</p>
                    <p>{maxYear}</p>
                </div>
            </div>}
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "5px" }}>
                <Button onClick={submitYears} variant="contained">ok</Button>
            </div>
        </div>
    );
}

export default YearFiltering;