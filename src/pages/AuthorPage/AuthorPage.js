import React, {useContext, useEffect, useState} from "react";

import ItemsContext from "../../context/items-context";

import { Badge } from "@mui/material";
import TabsPanel from "../../components/Tabs/TabsPanel";
import AuthorBooks from "./AuthorBooks";
import AddingNewBookItemForm from "../../components/Forms/AddingNewBookItemForm";
import AuthorNotifications from "./AuthorNotifications";

const AuthorPage = ({ publisher, author }) => {
    const {
        fetchingAuthorBooks,
        authorConsiderationBooks,
        authorGoodBooks,
        authorBadBooks,
        fetchingPurchaseMessages,
        counterPurchaseMessages
    } = useContext(ItemsContext);
    const [authorData, setAuthorData] = useState(
        JSON.parse(localStorage.getItem("userData")) || ""
    );

    const fetchingAllBooks = (name, user) => {
        let user1 = user;

        if (user === "publisher") {
            user1 = "publishing";
        }

        fetch(`http://localhost:8081/${user1}/all/${name}`)
            .then(response => response.json())
            .then(author => {
                if (author.length !== 0) {
                    fetchingAuthorBooks(author[0].id, user, "CONSIDERATION");
                    fetchingAuthorBooks(author[0].id, user, "GOOD");
                    fetchingAuthorBooks(author[0].id, user, "BAD");
                }
            });
    }

    const fetchingAuthorBooksData = () => {
        fetch(`http://localhost:8081/user/${authorData.id}`)
            .then(response => response.json())
            .then(data => {
                if (publisher) {
                    fetchingAllBooks(data.name, "publisher");
                } else {
                    fetchingAllBooks(data.name, "author");
                }
            });
    }

    const messagesHeader = <div>
        <Badge
            badgeContent={counterPurchaseMessages}
            sx={{
                "& .MuiBadge-badge": {
                    color: "white",
                    backgroundColor: "#197",
                    marginTop: "-5px",
                }
            }}
            max={99}
        >
            <span style={{ fontWeight: "normal" }}>Messages</span>
        </Badge>
    </div>;

    let tabsInfo = [
        {
            name: "Your books",
            description: (
                <div className="author-books-lists">
                    <AuthorBooks
                        books={authorGoodBooks}
                        status="GOOD"
                        fetchingAuthorBooks={fetchingAuthorBooksData}
                    />
                    <AuthorBooks
                        books={authorConsiderationBooks}
                        status="CONSIDERATION"
                        fetchingAuthorBooks={fetchingAuthorBooksData}
                    />
                    <AuthorBooks
                        books={authorBadBooks}
                        status="BAD"
                        fetchingAuthorBooks={fetchingAuthorBooksData}
                    />
                </div>
            )
        },
        {
            name: "Add book",
            description: <AddingNewBookItemForm isAuthor={author} isPublisher={publisher} />
        },
        {
            name: messagesHeader,
            description: <AuthorNotifications />,
        }
    ];

    useEffect(() => {
        if (authorData) {
            fetchingAuthorBooksData();
            fetchingPurchaseMessages(authorData);
        }
    }, [authorData]);

    return (
        <div className="main-wrapper">
            <h1 style={{ marginBottom: "30px" }}>Here you can manage your books</h1>
            <TabsPanel tabsInfo={tabsInfo} isAuthor={true} fetchingAuthorBooks={fetchingAuthorBooksData} />
        </div>
    );
}

export default AuthorPage;