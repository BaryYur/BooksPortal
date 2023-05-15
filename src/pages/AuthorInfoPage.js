import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import EmailIcon from "@mui/icons-material/Email";
import Person4Icon from "@mui/icons-material/Person4";
import BookItemsList from "../components/BookItems/BookItemsList";
import "./AuthorInfoPage.css";

const AuthorInfoPage = () => {
    const params = useParams();
    const [books, setBooks] = useState([]);
    const [author, setAuthor] = useState({});

    const fetchingAuthorData = () => {
        fetch(`http://localhost:8081/author/${params.id}`)
            .then(response => response.json())
            .then(data => {
                setAuthor(data);
            });
    }

    const fetchingAuthorBooks = () => {
        fetch(`http://localhost:8081/book/author/${params.id}/GOOD`)
            .then(response => response.json())
            .then(data => {
                setBooks(data);
            });
    }

     useEffect(() => {
         fetchingAuthorBooks();
         fetchingAuthorData();
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
          </div>
          <div className="author-info-container-books">
              <BookItemsList booksData={books} />
          </div>
      </div>
    );
}

export default AuthorInfoPage;