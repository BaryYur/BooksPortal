import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import TabsPanel from "../../components/Tabs/TabsPanel";
import AuthorBooks from "./AuthorBooks";
import AddingNewBookItemForm from "../../admin-main-content/admin-pages/AddingItemPage/AddingNewBookItemForm";

const AuthorPage = () => {
    const [authorData, setAuthorData] = useState(
        JSON.parse(localStorage.getItem("userData")) || ""
    );
    const { fetchingAuthorBooks, authorConsiderationBooks, authorGoodBooks, authorBadBooks } = useContext(ItemsContext);

    let tabsInfo = [
        {
            name: "Your books",
            description: (
                <div className="author-books-lists">
                    <AuthorBooks books={authorGoodBooks} />
                    <AuthorBooks books={authorConsiderationBooks} />
                    <AuthorBooks books={authorBadBooks} />
                </div>
            )
        },
        {
            name: "Add book",
            description: <AddingNewBookItemForm isAuthor={true} />
        },
    ];

    useEffect(() => {
        if (authorData) {
            fetchingAuthorBooks(authorData.id, "CONSIDERATION");
            fetchingAuthorBooks(authorData.id, "GOOD");
            fetchingAuthorBooks(authorData.id, "BAD");
        }
    }, [authorData]);

    return (
        <div className="main-wrapper">
            <h1>Here you can add your new book</h1>
            <TabsPanel tabsInfo={tabsInfo} />
        </div>
    );
}

export default AuthorPage;