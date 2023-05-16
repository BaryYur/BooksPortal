import React, { useContext, useEffect } from "react";

import ItemsContext from "../../context/items-context";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Checkbox, FormControlLabel} from "@mui/material";

const AuthorFiltering = () => {
    const { searchingItems, fetchingAuthorsList, bookItemAuthorsList } = useContext(ItemsContext);

    const fetchingAuthors = () => {
        let authorIds = [];

        for (let book of searchingItems) {
            authorIds.push(...book.authors);
        }

        let ids = [...new Set(authorIds)];
        fetchingAuthorsList(ids);
    }

    useEffect(() => {
        fetchingAuthors();
    }, [searchingItems]);

    return (
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
                                    // checked={publisher}
                                    // onClick={(e) => switchPublisherAndAuthor(e)}
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

export default AuthorFiltering;