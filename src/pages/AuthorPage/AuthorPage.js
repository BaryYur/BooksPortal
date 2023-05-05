import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import TabsPanel from "../../components/Tabs/TabsPanel";
import AuthorBooks from "./AuthorBooks";
import AddingNewBookItemForm from "../../components/Forms/AddingNewBookItemForm";

const AuthorPage = ({ publisher, author }) => {
    const [authorData, setAuthorData] = useState(
        JSON.parse(localStorage.getItem("userData")) || ""
    );
    const { fetchingAuthorBooks, authorConsiderationBooks, authorGoodBooks, authorBadBooks } = useContext(ItemsContext);
    const fetchingAllBooks = (name, user) => {
        let user1 = user;

        if (user === "publisher") {
            user1 = "publishing";
        }

        fetch(`${process.env.REACT_APP_MAIN_PATH}/${user1}/all/${name}`)
            .then(response => response.json())
            .then(author => {
                fetchingAuthorBooks(author[0].id, user, "CONSIDERATION");
                fetchingAuthorBooks(author[0].id, user, "GOOD");
                fetchingAuthorBooks(author[0].id, user, "BAD");
            });
    }

    const fetchingAuthorBooksData = () => {
        fetch(`${process.env.REACT_APP_MAIN_PATH}/user/${authorData.id}`)
            .then(response => response.json())
            .then(data => {
                if (publisher) {
                    fetchingAllBooks(data.name, "publisher");
                } else {
                    fetchingAllBooks(data.name, "author");
                }
            })
    }

    let tabsInfo = [
        {
            name: "Your books",
            description: (
                <div className="author-books-lists">
                    <AuthorBooks
                        books={authorGoodBooks}
                        status="GOOD"
                        fetchingAuthorBooksData={fetchingAuthorBooksData}
                    />
                    <AuthorBooks
                        books={authorConsiderationBooks}
                        status="CONSIDERATION"
                        fetchingAuthorBooksData={fetchingAuthorBooksData}
                    />
                    <AuthorBooks
                        books={authorBadBooks}
                        status="BAD"
                        fetchingAuthorBooksData={fetchingAuthorBooksData}
                    />
                </div>
            )
        },
        {
            name: "Add book",
            description: <AddingNewBookItemForm isAuthor={author} isPublisher={publisher} />
        },
    ];

    useEffect(() => {
        if (authorData) {
            fetchingAuthorBooksData();
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