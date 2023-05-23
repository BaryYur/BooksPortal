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
    const [authorScore, setAuthorScore] = useState({});
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
            })
    }

    const fetchingScore = () => {
        fetch(`http://localhost:8081/user/${authorData.id}`)
            .then(response => response.json())
            .then(data => {
                fetch(`http://localhost:8081/author/all/${data.name}`)
                    .then(response => response.json())
                    .then(authorData => {
                        if (authorData) {
                            setAuthorScore(authorData[0]);
                        }
                    });
            });
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
            fetchingScore();
        }
    }, [authorData]);

    return (
        <div className="main-wrapper">
            <h1>Here you can add your new book</h1>
            <h2>Score {authorScore?.score ? <span>{authorScore.score}</span>: <span>0</span>}$</h2>
            <TabsPanel tabsInfo={tabsInfo} />
        </div>
    );
}

export default AuthorPage;