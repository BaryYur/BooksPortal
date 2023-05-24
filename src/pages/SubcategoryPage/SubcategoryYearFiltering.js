import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

const SubcategoryYearFiltering = ({ subcategory }) => {
    const { searchingFilteringItems, fetchingCategoryBooks } = useContext(ItemsContext);
    const [minYear, setMinYear] = useState(0);
    const [maxYear, setMaxYear] = useState(0);
    const [minCurrentYear, setMinCurrentYear] = useState(0);
    const [maxCurrentYear, setMaxCurrentYear] = useState(0);

    const [catId, setCatId] = useState("");

    const gettingYears = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                for (let cat of data) {
                    if (subcategory === cat.name.toLowerCase()) {
                        setCatId(cat.id);

                        fetch(`http://localhost:8081/book/category/${cat.id}/GOOD`)
                            .then(response => response.json())
                            .then(books => {
                                let years = [];

                                for (let book of books) {
                                    years.push(book.publishDate);
                                }

                                let min = Math.min(...years);
                                let max = Math.max(...years);

                                setMinYear(min);
                                setMaxYear(max);
                            })
                            .catch(error => {
                                alert("Oops...");
                            });
                    }
                }
            });

        const getMinMaxYearsFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minYear = searchParams.get("minYear");
            const maxYear = searchParams.get("maxYear");

            return {
                minYear: minYear ? parseFloat(minYear) : 0,
                maxYear: maxYear ? parseFloat(maxYear) : 0
            }
        }

        let years = getMinMaxYearsFromUrlString(window.location.href);

        setMinCurrentYear(years.minYear);
        setMaxCurrentYear(years.maxYear);
        setValue([years.minYear, years.maxYear]);
    }

    const [value, setValue] = useState([minCurrentYear, maxCurrentYear]);

    const handleChange = (event, newValue) => {
        setValue(newValue);

        const currentUrl = new URL(window.location.href);
        const searchParams = currentUrl.searchParams;

        searchParams.set("minYear", newValue[0]);
        searchParams.set("maxYear", newValue[1]);

        currentUrl.search = searchParams.toString();
        const updatedUrl = currentUrl.toString();

        window.history.replaceState(null, "", updatedUrl);
    }

    const valuetext = (value) => {
        return `${value}`;
    }

    const submitYears = () => {
        setTimeout(() => {
            fetchingCategoryBooks(catId, window.location.href);
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
                        getAriaLabel={() => "price"}
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
            <div style={{ display: "flex", justifyContent: "center", paddingTop: "5px", paddingBottom: "5px" }}>
                <Button onClick={submitYears} variant="contained">ok</Button>
            </div>
        </div>
    );
}

export default SubcategoryYearFiltering;