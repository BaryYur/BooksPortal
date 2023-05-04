import React, {useEffect, useState} from "react";

import { useOpenFormModal } from "../../hooks/useOpenFormModal";

import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import AddingNewBookItemForm from "../../components/Forms/AddingNewBookItemForm";

const AuthorBookItem = (props) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openChangingBookModal, setOpenChangingBookModal] = useState(false);
    const [bookFields, setBookFields] = useState({});
    const [publisher, setPublisher] = useState(false);
    const [author, setAuthor] = useState(false);
    const { openModal, openModalHandler, closeModalHandler } = useOpenFormModal();

    const deleteAuthorBookHandler = () => {
        fetch(`http://localhost:8081/book/${props.bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.ok) {
                    props.fetchingAuthorBooksData();
                }
            })
            .catch(error => console.log("deleting book error"));
    }

    const openDeletingModalHandler = () => setOpenDeleteModal(true);
    const closeDeletingModalHandler = () => setOpenDeleteModal(false);

    const changeAuthorBookHandler = () => {
        let bookBody = {
            id: props.bookId,
            name: props.name,
            price: props.price,
            status: props.status,
            file: props.img,
            description: props.description,
            publishDate: props.publishDate,
            pagesCount: props.pagesCount,
            language: props.language,
            categories: props.categories,
            authors: props.authors,
            publishers: props.publishers,
        }

        setBookFields(bookBody);
    }

    const openChangingModalHandler = () => {
        openModalHandler();
        changeAuthorBookHandler();
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("userData"))) {
            let user = JSON.parse(localStorage.getItem("userData"));

            if (user.role === "PUBLISHING") {
                setPublisher(true);
                setAuthor(false);
            } else if (user.role === "AUTHOR") {
                setAuthor(true);
                setPublisher(false);
            }
        }
    }, [author, publisher]);

    return (
        <li>
            <div className="book-item__image-box">
                <img src={props.img} alt={props.name} />
                <div>
                    <p>{props.name}</p>
                    <p>Price: {props.price} $</p>
                </div>
            </div>
            <div className="handling-btns">
                <button
                    onClick={openDeletingModalHandler}
                >
                    <DeleteIcon />
                </button>
                <button onClick={openChangingModalHandler}>
                    <EditIcon />
                </button>
            </div>

            <Modal open={openDeleteModal} onClose={closeDeletingModalHandler}>
                <Box className="delete-modal">
                    <h3>You really want to delete this book?</h3>
                    <div className="delete-modal-btns">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={deleteAuthorBookHandler}
                        >Delete</Button>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeDeletingModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>

            <Modal
                open={openModal}
                onClose={closeModalHandler}
            >
                <Box className="form-modal">
                    <AddingNewBookItemForm isPublisher={publisher} isAuthor={author} authorModal={true} bookFields={bookFields} />
                </Box>
            </Modal>
        </li>
    );
}


export default AuthorBookItem;