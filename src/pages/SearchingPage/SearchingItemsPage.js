import React, { useContext, useEffect, useState, useMemo, memo, useRef } from "react";

import { useNavigate } from "react-router-dom";

import ItemsContext from "../../context/items-context";

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import BookItemsList from "../../components/BookItems/BookItemsList";

const SearchingItemsPage = ({ search }) => {
    const navigate = useNavigate();
    const itemsCtx = useContext(ItemsContext);
    const searchingBooks = useMemo(() => itemsCtx.searchingItems, [itemsCtx.searchingItems]);
    const page = Number(search.split("/")[2]);
    const [currentBookItems, setCurrentBookItems] = useState([]);
    const [searchingPagesCounter, setSearchingPagesCounter] = useState(1);
    const mainWrapperRef = useRef(null);

    useEffect(() => {
        setCurrentBookItems(
            searchingBooks.filter((_, i) => i + 1 > (page * 12) - 12 && i + 1 <= page * 12)
        );
        setSearchingPagesCounter(Math.ceil(searchingBooks.length / 12));

        if (!page || searchingPagesCounter < page) {
            navigate("/home/shop");
        }

        document.documentElement.scrollTop = 0;
    }, [search, searchingBooks, searchingPagesCounter, navigate, page]);

    return (
        <div className="searching-items-container">
            <div className="searching-page__items-box">
                <BookItemsList booksData={currentBookItems} />
            </div>
            {searchingPagesCounter > 1 && (
                <Stack spacing={2} className="pagination-stack">
                    <Pagination
                        count={searchingPagesCounter}
                        page={page}
                        shape="rounded"
                        onChange={(e, value) => {
                            navigate(`/home/shop/search/${search.split('/')[0]}/page/${value}`);
                            mainWrapperRef.current.scrollTop = 0;
                            document.documentElement.scrollTop = 0;
                        }}
                    />
                </Stack>
            )}
        </div>
    );
};

export default memo(SearchingItemsPage);

// const SearchingItemsPage = ({ search }) => {
//     const navigate = useNavigate();
//     const itemsCtx = useContext(ItemsContext);
//     const searchingBooks = itemsCtx.searchingItems;
//     let page = Number(search.split("/")[2]);
//     const [currentBookItems, setCurrentBookItems] = useState([]);
//     const [searchingPagesCounter, setSearchingPagesCounter] = useState(1);
//
//     useEffect(() => {
//         setCurrentBookItems([]);
//
//         for (let i = 0; i < searchingBooks.length; i++) {
//             if (i + 1 > (page * 12) - 12 && i + 1 <= page * 12) {
//                 setCurrentBookItems(prevItem => {
//                     return [...prevItem, searchingBooks[i]];
//                 });
//             }
//         }
//
//         let counter = itemsCtx.searchingItems.length / 12;
//         setSearchingPagesCounter(Number(counter.toString().split(".")[0]) + 1);
//
//         if (!page || counter + 1 < page) {
//             navigate("/home/shop");
//         }
//     }, [search])
//
//     return(
//         <div className="searching-items-container">
//             <div className="searching-page__items-box">
//                 <BookItemsList booksData={currentBookItems} />
//             </div>
//             {searchingPagesCounter > 1 && (
//                  <Stack spacing={2} className="pagination-stack">
    //                  <Pagination
    //                     count={searchingPagesCounter}
    //                     page={page}
    //                     shape="rounded"
    //                     onChange={(e, value) => {
    //                         navigate(`/home/shop/search/${search.split("/")[0]}/page/${value}`);
    //                         document.querySelector(".main-wrapper").scrollTop = 0;
    //                         document.documentElement.scrollTop = 0;
    //                     }}
    //                  />
//                  </Stack>
//             )}
//         </div>
//     );
// }
//
// export default SearchingItemsPage;