import React, {useContext, useEffect, useState} from "react";

import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Checkbox, FormControlLabel} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ItemsContext from "../../context/items-context";

const SubcategoryAuthorFiltering = ({ subcategory }) => {
    const { bookItemAuthorsList, fetchingAuthorsList, fetchingCategoryBooks, categoryBooks } = useContext(ItemsContext);
    const [catId, setCatId] = useState("");

    const fetchingAuthors = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                for (let cat of data) {
                    if (subcategory === cat.name.toLowerCase()) {
                        setCatId(cat.id);

                        fetch(`http://localhost:8081/book/category/${cat.id}/GOOD`)
                            .then(response => response.json())
                            .then(books => {
                                let authorIds = [];

                                for (let book of books) {
                                    authorIds.push(...book.authors);
                                }

                                let ids = [...new Set(authorIds)];
                                fetchingAuthorsList(ids);
                            })
                            .catch(error => {
                                alert("Oops...");
                            });
                    }
                }
            });
    }

    const [aIds, setAIds] = useState([]);

    const getAuthors = (id) => {
        if (!aIds.includes(id)) {
            setAIds(prevId => {
                return [...prevId, id];
            });

            const currentUrl = window.location.href;
            const updatedUrl = `${currentUrl}&authors=${id}`;
            window.history.replaceState(null, "", updatedUrl);
        } else {
            setAIds(aIds.filter(aid => aid !== id));

            const currentUrl = window.location.href;
            const updatedUrl = currentUrl.replace(`&authors=${id}`, "").replace("?&", "?");
            window.history.replaceState(null, "", updatedUrl);
        }

        setTimeout(() => {
            fetchingCategoryBooks(catId, window.location.href);
        }, 100);
    }

    useEffect(() => {
        fetchingAuthors();
    }, [categoryBooks, aIds]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.href);
        const authorsParam = urlParams.get("authors");

        if (authorsParam) {
            const ids = authorsParam.split(",");

            setAIds(ids);
        }
    }, []);

    return (
        <Accordion style={{ boxShadow: "none", border: "1px solid lightgrey", marginTop: "10px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography style={{ fontWeight: "600" }}>By authors</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "0px 10px 5px 10px" }}>
                {bookItemAuthorsList.map((author => (
                    <p key={author.id} className="item">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={window.location.href.split("&authors=").includes(author.id)}
                                    onChange={() => {
                                        getAuthors(author.id)
                                    }}
                                />
                            }
                            label={author.name}
                        />
                    </p>
                )))}
            </AccordionDetails>
        </Accordion>
    );
}

export default SubcategoryAuthorFiltering;