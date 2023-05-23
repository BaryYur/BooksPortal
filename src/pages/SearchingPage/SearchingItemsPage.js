import React, { useContext, useEffect, useState, useMemo, memo } from "react";

import { useScrollToTop } from "../../hooks/useScrollToTop";

import { useNavigate } from "react-router-dom";

import ItemsContext from "../../context/items-context";

// import Stack from "@mui/material/Stack";
// import Pagination from "@mui/material/Pagination";
import BookItemsList from "../../components/BookItems/BookItemsList";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

const SearchingItemsPage = ({ search }) => {
    const navigate = useNavigate();
    const itemsCtx = useContext(ItemsContext);
    const searchingBooks = useMemo(() => itemsCtx.searchingFilteringItems, [itemsCtx.searchingFilteringItems]);
    const page = Number(1);
    const [currentBookItems, setCurrentBookItems] = useState([]);
    const [searchingPagesCounter, setSearchingPagesCounter] = useState(1);
    const { scrollToTop } = useScrollToTop();

    useEffect(() => {
        if (searchingBooks !== []) {
            setCurrentBookItems([]);

            for (let i = 0; i < searchingBooks.length; i++) {
                if (i + 1 > (page * 12) - 12 && i + 1 <= page * 12) {
                    setCurrentBookItems(prevItem => {
                        return [...prevItem, searchingBooks[i]];
                    });
                }
            }
        } else {
            setCurrentBookItems([]);
        }

        setSearchingPagesCounter(Math.ceil(searchingBooks.length / 12));

        // if (searchingPagesCounter < page) {
        //     navigate("/home/shop");
        // }

        document.documentElement.scrollTop = 0;
    }, [search, searchingBooks, searchingPagesCounter, navigate, page]);

    useEffect(() => {
        let currentUrl = window.location.href;

        itemsCtx.fetchingFilteringSearching(currentUrl);
    }, []);

    return (
        <div className="searching-items-container">
            <div className="searching-page__items-box">
                {currentBookItems.length !== 0 ?
                    <BookItemsList booksData={itemsCtx.searchingFilteringItems} />:
                    <p className="no-items-paragraph">Books not found</p>
                }
            </div>
            {/*{searchingPagesCounter > 1 && (*/}
            {/*    <Stack spacing={2} className="pagination-stack">*/}
            {/*        <Pagination*/}
            {/*            count={searchingPagesCounter}*/}
            {/*            page={page}*/}
            {/*            shape="rounded"*/}
            {/*            onChange={(e, value) => {*/}
            {/*                navigate(`/home/shop/search/${search.split('/')[0]}/page/${value}`);*/}
            {/*                scrollToTop();*/}
            {/*            }}*/}
            {/*        />*/}
            {/*    </Stack>*/}
            {/*)}*/}
            <Modal open={itemsCtx.loading}>
                <Box className="searching-modal">
                    <CircularProgress />
                </Box>
            </Modal>
        </div>
    );
};

export default memo(SearchingItemsPage);