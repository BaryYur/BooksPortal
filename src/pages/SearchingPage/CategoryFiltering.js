import React, { useContext, useEffect, useState } from "react";

import ItemsContext from "../../context/items-context";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";

const CategoryFiltering = () => {
    const { searchingFilteringItems, bookItemCategoriesList, fetchingCategoriesList, fetchingFilteringSearching } = useContext(ItemsContext);

    const fetchingCategories = () => {
        let search = window.location.href.split("?text=")[1].split("/")[0];

        fetch(`http://localhost:8081/book/all/${search}/GOOD`)
            .then(response => response.json())
            .then(data => {
                let categoryIds = [];

                for (let book of data) {
                    categoryIds.push(...book.categories);
                }

                let ids = [...new Set(categoryIds)];
                fetchingCategoriesList(ids);
            })
            .catch(error => {
                alert("Oops...");
            });
    }

    const [cIds, setCIds] = useState([]);

    const getCategories = (id) => {
        if (!cIds.includes(id)) {
            setCIds(prevId => {
                return [...prevId, id];
            });

            const currentUrl = window.location.href;
            const updatedUrl = `${currentUrl}&category=${id}`;
            window.history.replaceState(null, "", updatedUrl);
        } else {
            setCIds(cIds.filter(cid => cid !== id));

            const currentUrl = window.location.href;
            const updatedUrl = currentUrl.replace(`&category=${id}`, "").replace("?&", "?");
            window.history.replaceState(null, "", updatedUrl);
        }

        fetchingFilteringSearching(window.location.href, "");
    }

    const urlParams = new URLSearchParams(window.location.href.substring(window.location.href.indexOf("?") + 1));
    const categoriesIds = urlParams.getAll("category");

    useEffect(() => {
        fetchingCategories();
    }, [searchingFilteringItems]);

    return (
        <Accordion style={{ boxShadow: "none", border: "1px solid lightgrey", marginTop: "3px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography style={{ fontWeight: "600" }}>By category</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "0px 10px 5px 10px" }}>
                {bookItemCategoriesList.map((category => (
                    <p key={category.id} className="item">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={categoriesIds.includes(category.id)}
                                    onChange={() => {
                                        getCategories(category.id)}
                                    }
                                />
                            }
                            label={category.name}
                            onChange={() => console.log(category.id)}
                        />
                    </p>
                )))}
            </AccordionDetails>
        </Accordion>
    );
}

export default CategoryFiltering;