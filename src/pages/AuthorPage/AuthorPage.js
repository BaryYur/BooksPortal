import React, { useContext, useEffect } from "react";

import itemsContext from "../../context/items-context";

import TabsPanel from "../../components/Tabs/TabsPanel";
import AuthorBooks from "./AuthorBooks";
import AddingNewBookItemForm from "../../admin-main-content/admin-pages/AddingItemPage/AddingNewBookItemForm";

const AuthorPage = () => {
    const { fetchingGenreBooks } = useContext(itemsContext);

    let tabsInfo = [
        {
            name: "Your books",
            description: <AuthorBooks books={[ { id: "id1", name: "My first book" }, { id: "id2", name: "My second book" } ]} />,
        },
        {
            name: "Add book",
            description: <AddingNewBookItemForm />
        },
    ];

    useEffect(() => {
        fetchingGenreBooks();
    }, [])

    return (
        <div className="main-wrapper">
            <h1>Here you can add your new book</h1>
            <TabsPanel tabsInfo={tabsInfo} />
        </div>
    );
}

export default AuthorPage;