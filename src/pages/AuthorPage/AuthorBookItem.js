import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const AuthorBookItem = ({ bookId, name, img, price, fetchingAuthorBooksData }) => {
    const [openDeleteModal, setDeleteModalOpen] = useState(false);

    const deleteAuthorBookHandler = () => {
        fetch(`http://localhost:8081/book/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchingAuthorBooksData();
                }
            })
            .catch(error => console.log("deleting book error"));
    }

    const openDeletingModalHandler = () => setDeleteModalOpen(true);
    const closeDeletingModalHandler = () => setDeleteModalOpen(false);

    return (
        <li>
            <div className="book-item__image-box">
                <img src={img} alt={name} />
                <div>
                    <p>{name}</p>
                    <p>Price: {price} $</p>
                </div>
            </div>
            <div className="handling-btns">
                <button
                    onClick={openDeletingModalHandler}
                >
                    <DeleteIcon />
                </button>
                <button>
                    <EditIcon />
                </button>
            </div>

            <Modal open={openDeleteModal}>
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
        </li>
    );
}


export default AuthorBookItem;