import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import AuthContext from "../context/auth-context";

import EmailIcon from "@mui/icons-material/Email";
import Person4Icon from "@mui/icons-material/Person4";
import BookItemsList from "../components/BookItems/BookItemsList";
import "./AuthorInfoPage.css";
import {Button} from "@mui/material";

const AuthorInfoPage = () => {
    const params = useParams();
    const { user, fetchingUserData } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [author, setAuthor] = useState({});

    const fetchingAuthorData = () => {
        fetch(`http://localhost:8081/author/${params.id}`)
            .then(response => response.json())
            .then(authorData => {
                setAuthor(authorData);
            });
    }

    const fetchingAuthorBooks = () => {
        fetch(`http://localhost:8081/book/author/${params.id}/GOOD`)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }

    const subscribeOnAuthorHandler = ()  => {
        let subAuthors = user.subscriptionOnAuthors;

        if (!subAuthors.includes(author.id)) {
            subAuthors.push(author.id);
        } else {
            subAuthors = subAuthors.filter(authorId => authorId !== author.id);
        }

        let userBody = {
            id: user.id,
            name: user.name,
            basket: user.basket,
            dislikes: user.dislikes,
            email: user.email,
            likes: user.likes,
            password: user.password,
            role: user.role,
            status: user.status,
            subscriptionOnAuthors: subAuthors,
            subscriptionOnPublishers: user.subscriptionOnPublishers
        }

        fetch(`http://localhost:8081/user/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(userBody),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchingUserData();
                }
            })
            .catch(() => console.log("user error"));
    }

     useEffect(() => {
         fetchingAuthorBooks();
         fetchingAuthorData();
         fetchingUserData();
     }, []);

    return (
      <div className="main-wrapper author-wrapper">
          <div className="author-info-container">
              <p>
                  <Person4Icon />
                  <span>{author.name}</span>
              </p>
              {author.email && <p>
                  <EmailIcon />
                  <span>{author.email}</span>
              </p>}
              {author.active && <Button
                  className={user.subscriptionOnAuthors.includes(author.id) ? "sub-btn" : "not-sub-btn"}
                  variant="contained"
                  onClick={subscribeOnAuthorHandler}
              >
                  {user.subscriptionOnAuthors.includes(author.id) ? <span>Unsubscribe</span> : <span>Subscribe</span>}
              </Button>}
          </div>
          <div className="author-info-container-books">
              <BookItemsList booksData={books} />
          </div>
      </div>
    );
}

export default AuthorInfoPage;