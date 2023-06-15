import React, { useContext, useState } from "react";

import AuthContext from "../../context/auth-context";
import ItemsContext from "../../context/items-context";

import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import SendIcon from "@mui/icons-material/Send";

const AuthorNotifications = () => {
    const { user } = useContext(AuthContext);
    const { fetchingPurchaseMessages, purchaseMessages } = useContext(ItemsContext);
    const [openAnswerModal, setOpenAnswerModal] = useState(false);
    const [pubName, setPubName] = useState("");
    const [answerInput, setAnswerInput] = useState("");
    const [answerBody, setAnswerBody] = useState({});

    const fetchingUpdatingMessage = (body, messageId) => {
        fetch(`http://localhost:8081/purchaseRequest/${messageId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    fetchingPurchaseMessages(user);
                }
            });
    }

    const approveProposalHandler = (message) => {
        fetchingUpdatingMessage(message, message.id);

        // update book
        setTimeout(() => {
            fetch(`http://localhost:8081/book/${message.bookId}`)
            .then(response => response.json())
            .then(bookItem => {
                let bookBody = {
                    authors: bookItem.authors,
                    categories: bookItem.categories,
                    description: bookItem.description,
                    dislikes: bookItem.dislikes,
                    file: bookItem.file,
                    language: bookItem.language,
                    likes: bookItem.likes,
                    name: bookItem.name,
                    pagesCount: bookItem.pagesCount,
                    price: bookItem.price,
                    publishDate: bookItem.publishDate,
                    publishers: bookItem.publishers,
                    status: bookItem.status,
                    publisherId: message.publisherId, // new
                    authorId: null,
                    demoFile1: bookItem.demoFile1,
                }
        
                fetch(`http://localhost:8081/book/${bookItem.id}`, {
                    method: "PUT",
                    body: JSON.stringify(bookBody),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then(response => response.json())
            });
        }, 200);
    }

    const disapproveProposalHandler = (message) => {
        fetchingUpdatingMessage(message, message.id);
    }

    const giveAnswerHandler = (e) => {
        e.preventDefault();

        let message = {
            ...answerBody,
            text: answerInput,
        }

        fetchingUpdatingMessage(message, message.id);
    }

    const openAnswerModalHandler = (publisherName) => {
        setOpenAnswerModal(true);
        setPubName(publisherName);
    }

    const closeAnswerModalHandler = () =>  setOpenAnswerModal(false);

    const fetchingDeletingMessage = (messageId) => {
        fetch(`http://localhost:8081/purchaseRequest/${messageId}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    fetchingPurchaseMessages(user);
                }
            });
    }

    return (
        <div className="purchase-messages-container">
            <ul>
                {purchaseMessages.map((purchaseMessage) => (
                    <li key={purchaseMessage.id}>
                        <div className="purchase-message-info-box">
                            {purchaseMessage.text === "Author is agreed" &&
                                <h4 style={{ color: "#197" }}>The author has agreed</h4>
                            }
                            {(purchaseMessage.text !== "Author is agreed" && !purchaseMessage.reviewed) && <h4><span>{purchaseMessage.name}</span> want to buy rights on your book</h4>}
                            {(purchaseMessage.text !== "Author is agreed" && purchaseMessage.reviewed) && <h4>Answer from author</h4>}
                            <div>
                                <p>Book name: <span>{purchaseMessage.bookName}</span></p>
                                <p>Proposal price: <span>{purchaseMessage.price} $</span></p>
                                {purchaseMessage.text !== "Author is agreed" && <p>Message: <span>{purchaseMessage.text}</span></p>}
                            </div>
                        </div>
                        <div className="message-btns-box">
                            <div>
                                {!purchaseMessage.reviewed && <div className="agree-btns">
                                    <button
                                       onClick={() => {
                                        let message = {
                                            id: purchaseMessage.id,
                                            authorId: purchaseMessage.authorId,
                                            bookId: purchaseMessage.bookId,
                                            bookName: purchaseMessage.bookName,
                                            price: purchaseMessage.price,
                                            publisherId: purchaseMessage.publisherId,
                                            reviewed: true,
                                            text: "Author is agreed",
                                            name: purchaseMessage.name,
                                        }

                                        approveProposalHandler(message);
                                       }}
                                    >Agree</button>
                                    <button
                                        onClick={() => {
                                            let message = {
                                                id: purchaseMessage.id,
                                                authorId: purchaseMessage.authorId,
                                                bookId: purchaseMessage.bookId,
                                                bookName: purchaseMessage.bookName,
                                                price: purchaseMessage.price,
                                                publisherId: purchaseMessage.publisherId,
                                                reviewed: true,
                                                text: "Author is disagreed",
                                                name: purchaseMessage.name,
                                            }
    
                                            disapproveProposalHandler(message);
                                           }}
                                    >Disagree</button>
                                </div>}

                                {(purchaseMessage.text === "Author is agreed" ||  purchaseMessage.text === "Author is disagreed") && <button
                                    className="delete-message-btn"
                                    onClick={() => fetchingDeletingMessage(purchaseMessage.id)}
                                >
                                    <DeleteIcon />
                                </button>}
                            </div>
                            {purchaseMessage.text !== "Author is agreed" && (
                                <Button
                                    variant="contained"
                                    className="message-answer-btn"
                                    onClick={() => {
                                        let rew;

                                        if (purchaseMessage.reviewed === false) {
                                            rew = true;
                                        } else {
                                            rew = false;
                                        }

                                        setAnswerBody({
                                            id: purchaseMessage.id,
                                            authorId: purchaseMessage.authorId,
                                            bookId: purchaseMessage.bookId,
                                            bookName: purchaseMessage.bookName,
                                            price: purchaseMessage.price,
                                            publisherId: purchaseMessage.publisherId,
                                            name: purchaseMessage.name,
                                            reviewed: rew,
                                        });

                                        openAnswerModalHandler(purchaseMessage.name)
                                    }}
                                >Give answer</Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {purchaseMessages.length === 0 && <p className="no-items-paragraph">No messages yet</p>}

            <Modal
                open={openAnswerModal}
                onClose={closeAnswerModalHandler}
            >
                <Box className="delete-modal buying-rules-modal">
                   <form onSubmit={giveAnswerHandler}>
                       <div className="control">
                           <label>Message for ({pubName})</label>
                           <textarea
                               type="text"
                               value={answerInput}
                               onChange={(e) => setAnswerInput(e.target.value)}
                           />
                       </div>
                       <div>
                           <Button type="submit" variant="contained">
                                <SendIcon />
                                <span>Send</span>
                            </Button>
                       </div>
                   </form>

                    <div>
                        <button
                            className="close-btn"
                            variant="contained"
                            onClick={closeAnswerModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AuthorNotifications;