import React from "react";

import TabsPanel from "../../components/Tabs/TabsPanel";
import AuthorBooks from "./AuthorBooks";
import AddingNewBookItemForm from "../../admin-main-content/admin-pages/AddingItemPage/AddingNewBookItemForm";

const AuthorPage = () => {
    let tabsInfo = [
        {
            name: "Your books",
            description: <AuthorBooks books={[ { id: "id1", name: "My first book" }, { id: "id2", name: "My second book" } ]} />,
        },
        {
            name: "Add book",
            description: <AddingNewBookItemForm isAuthor={true} />
        },
    ];

    return (
        <div className="main-wrapper">
            <h1>Here you can add your new book</h1>
            <TabsPanel tabsInfo={tabsInfo} />
        </div>
    );
}

export default AuthorPage;