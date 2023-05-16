import React, {useContext, useEffect} from "react";

import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {Checkbox, FormControlLabel} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import ItemsContext from "../../context/items-context";

const PublisherFiltering = () => {
    const { searchingItems, fetchingPublishersList, bookItemPublishersList } = useContext(ItemsContext);

    const fetchingPublishers = () => {
        let publisherIds = [];

        for (let book of searchingItems) {
            publisherIds.push(...book.publishers);
        }

        let ids = [...new Set(publisherIds)];
        fetchingPublishersList(ids);
    }

    useEffect(() => {
        fetchingPublishers();
    }, [searchingItems]);

    return (
        <Accordion style={{ boxShadow: "none", border: "1px solid lightgrey", marginTop: "10px" }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Typography style={{ fontWeight: "600" }}>By publishers</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: "0px 10px 5px 10px" }}>
                {bookItemPublishersList.map((publisher => (
                    <p key={publisher.id} className="item">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={publisher}
                                    // onClick={(e) => switchPublisherAndAuthor(e)}
                                />
                            }
                            label={publisher.name}
                        />
                    </p>
                )))}
            </AccordionDetails>
        </Accordion>
    );
}

export default PublisherFiltering;