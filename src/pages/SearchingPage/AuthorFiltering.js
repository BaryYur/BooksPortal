import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel } from "@mui/material";
import {useParams} from "react-router-dom";

const AuthorFiltering = () => {
    const params = useParams();
    const { searchingFilteringItems, fetchingAuthorsList, bookItemAuthorsList, fetchingFilteringSearching } = useContext(ItemsContext);

    const fetchingAuthors = () => {
        let search = window.location.href.split("?text=")[1].split("/")[0];

        fetch(`http://localhost:8081/book/all/${search}/GOOD`)
            .then(response => response.json())
            .then(data => {
                let authorIds = [];

                for (let book of data) {
                    authorIds.push(...book.authors);
                }

                let ids = [...new Set(authorIds)];
                fetchingAuthorsList(ids);
            })
            .catch(error => {
                alert("Oops...");
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

        fetchingFilteringSearching(window.location.href, "");
    }

    useEffect(() => {
        fetchingAuthors();
    }, [searchingFilteringItems, aIds]);

    return (
        <>
            <Accordion style={{ boxShadow: "none", border: "1px solid lightgrey" }}>
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
                                            getAuthors(author.id)}
                                        }
                                    />
                                }
                                label={author.name}
                            />
                        </p>
                    )))}
                </AccordionDetails>
            </Accordion>
        </>
    );
}

export default AuthorFiltering;