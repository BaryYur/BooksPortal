import React, { useContext, useEffect, useState } from "react";

import { useGetImage } from "../../hooks/useGetImage";
import { useOpenFormModal } from "../../hooks/useOpenFormModal";

import AdminMainContext from "../../admin-main-content/admin-context/admin-main-context";
import itemsContext from "../../context/items-context";

import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Select } from "./Select";
import Box from "@mui/material/Box";
import "./AddingNewBookItemForm.css";

const AddingNewBookItemForm = ({ isAuthor, isPublisher, isAdmin, authorModal, publisherModal, bookFields }) => {
    const mainAdminCtx = useContext(AdminMainContext);
    const itemsCtx = useContext(itemsContext);
    const [chosenCategories, setChosenCategories] = useState([]);
    const [chosenAuthors, setChosenAuthors] = useState([]);
    const [existingAuthors, setExistingAuthors] = useState([]);
    const [author, setAuthor] = useState({});
    const [chosenPublishers, setChosenPublishers] = useState([]);
    const [existingPublishers, setExistingPublishers] = useState([]);
    const [publisher, setPublisher] = useState({});

    const [bookNameInput, setBookNameInput] = useState("");
    const [authorNameInput, setAuthorNameInput] = useState("");
    const [publisherNameInput, setPublisherNameInput] = useState("");
    const [pagesCountInput, setPagesCountInput] = useState(0);
    const [priceInput, setPriceInput] = useState(0);
    const [bookPreviewPagesInput, setBookPreviewPagesInput] = useState([]);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [publishDateInput, setPublishDateInput] = useState("");
    const [languageInput, setLanguageInput] = useState("");
    const [bookFileInput, setBookFileInput] = useState("");
    const { image, changeImage } = useGetImage();
    const { closeModalHandler } = useOpenFormModal();

    const [openAuthorNameInputModal, setOpenAuthorNameInputModal] = useState(false);
    const [openPublisherNameInputModal, setOpenPublisherNameInputModal] = useState(false);
    const [createAuthorBtn, setCreateAuthorBtn] = useState(false);
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(true);
    const [createPublisherBtn, setCreatePublisherBtn] = useState(false);

    const closeAuthorNameInputModalHandler = () => setOpenAuthorNameInputModal(false);
    const closePublisherNameInputModalHandler = () => setOpenPublisherNameInputModal(false);

    const changeAuthorNameInputHandler = (event) => setAuthorNameInput(event.target.value);
    const changePublisherNameInputHandler = (event) => setPublisherNameInput(event.target.value);

    const checkingExisting = (currentAuthor) => {
        let counter = 0;

        if (currentAuthor) {
            if (chosenAuthors.length > 0) {
                for (let author of chosenAuthors) {
                    if (author.name === authorNameInput) counter++;
                }
            }
        } else {
            if (chosenPublishers.length > 0) {
                for (let publisher of chosenPublishers) {
                    if (publisher.name === publisherNameInput) counter++;
                }
            }
        }

        if (isAuthor) {
            if (authorNameInput === author.name) counter++;
        }

        if (isPublisher) {
            if (publisherNameInput === publisher.name) counter++;
        }

        if (counter > 0) {
            if (currentAuthor) {
                alert("You already add this author");
            } else {
                alert("You already add this publisher");
            }

            return false;
        } else return true;
    }

    const handleAuthorKeyPress = (event) => {
        if (event.key === "Enter" && authorNameInput.length > 3) {
            if (checkingExisting(true, false) === true) {
                fetch(`http://localhost:8081/author/all/${authorNameInput}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length !== 0 && data[0].name === authorNameInput) {
                            setChosenAuthors(prevAuthor => {
                                return [...prevAuthor, data[0]];
                            });

                            setAuthorNameInput("");
                            setCreateAuthorBtn(false);
                        } else if ((data.length === 0 || data[0].name !== authorNameInput) && authorNameInput.length > 3) {
                            alert("This author not exist");
                            setCreateAuthorBtn(true);
                        }
                    })
            }
        }

        if (event.key === "Enter" && authorNameInput.length <= 3) {
            alert("Author name is to short");
            setCreateAuthorBtn(false);
        }
    }

    const handlePublisherKeyPress = (event) => {
        if (event.key === "Enter" && publisherNameInput.length > 3) {
            if (checkingExisting(false, true) === true) {
                fetch(`http://localhost:8081/publishing/all/${publisherNameInput}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length !== 0 && data[0].name === publisherNameInput) {
                            setChosenPublishers(prevPublisher => {
                                return [...prevPublisher, data[0]];
                            });

                            setPublisherNameInput("");
                            setCreatePublisherBtn(false);
                        } else if ((data.length === 0 || data[0].name !== publisherNameInput) && publisherNameInput.length > 3) {
                            alert("This publisher not exist");
                            setCreatePublisherBtn(true);
                        }
                    })
            }
        }

        if (event.key === "Enter" && publisherNameInput.length <= 3) {
            alert("Publisher name is to short");
            setCreatePublisherBtn(false);
        }
    }

    const fetchingExistingAuthors = () => {
        if (authorNameInput !== "") {
            fetch(`http://localhost:8081/author/all/${authorNameInput}`)
                .then(response => response.json())
                .then(data => {
                    setExistingAuthors(data);
                });
        } else if (authorNameInput === "") {
            setExistingAuthors([]);
        }
    }

    const fetchingExistingPublishers = () => {
        if (publisherNameInput !== "") {
            fetch(`http://localhost:8081/publishing/all/${publisherNameInput}`)
                .then(response => response.json())
                .then(data => {
                    setExistingPublishers(data);
                });
        } else if (publisherNameInput === "") {
            setExistingPublishers([]);
        }
    }

    const createNewAuthorHandler = () => {
        if (checkingExisting(true, false) === true) {
            fetch(`http://localhost:8081/author`, {
                method: "POST",
                body: JSON.stringify({
                    name: authorNameInput,
                    isActive: false,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(() => {
                    fetch(`http://localhost:8081/author/all/${authorNameInput}`)
                        .then(response => response.json())
                        .then(data => {
                            setChosenAuthors(prevAuthor => {
                                return [...prevAuthor, data[0]];
                            });
                        })
                })

            setAuthorNameInput("");
            setCreateAuthorBtn(false);
        }
    }

    const createNewPublisherHandler = () => {
        if (checkingExisting(true, false) === true) {
            fetch(`http://localhost:8081/publishing`, {
                method: "POST",
                body: JSON.stringify({
                    name: publisherNameInput,
                    isActive: false,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    fetch(`http://localhost:8081/publishing/all/${publisherNameInput}`)
                        .then(response => response.json())
                        .then(data => {
                            setChosenPublishers(prevPublisher => {
                                return [...prevPublisher, data[0]];
                            });
                        })
                })

            setPublisherNameInput("");
            setCreatePublisherBtn(false);
        }
    }

    const deleteChosenAuthor = (id) => setChosenAuthors(chosenAuthors.filter(author => author.id !== id));
    const deleteChosenPublisher = (id) => setChosenPublishers(chosenPublishers.filter(publisher => publisher.id !== id));

    const clearChosenAuthors = (e) => {
        e.stopPropagation();

        setChosenAuthors([]);
    }

    const clearChosenPublishers = (e) => {
        e.stopPropagation();

        setChosenPublishers([]);
    }

    const bookFileHandler = (e) => setBookFileInput(e.target.files[0]);

    const handlePreviewUpload = async (event) => {
        const file = event.target.files[0];
        const byteArray = await convertPDFToByteArray(file);

        setBookPreviewPagesInput(byteArray);
    }

    const convertPDFToByteArray = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const byteArray = Array.from(new Uint8Array(arrayBuffer));
                resolve(byteArray);
            };

            reader.onerror = (event) => {
                reject(event.target.error);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const addingFormSubmitHandler = (event) => {
        event.preventDefault();

        let categories = [];

        for (let item of chosenCategories) {
            categories.push(item.id);
        }

        let selectedAuthors = [];

        for (let item of chosenAuthors) {
            selectedAuthors.push(item.id);
        }

        const selectedPublishers = [];

        for (let item of chosenPublishers) {
            selectedPublishers.push(item.id);
        }

        if (isAuthor) {
            selectedAuthors.push(author.id);
        }

        if (isPublisher) {
            selectedPublishers.push(publisher.id);
        }

        let bookStatus = "CONSIDERATION";

        if (isAdmin) {
            bookStatus = "GOOD";
        }

        let likes = 0;
        let dislikes = 0;

        if (authorModal || publisherModal) {
            likes = bookFields.likes;
            dislikes = bookFields.dislikes;
        }

        let coverImage = image;
        // let demoFile = bookPreviewPagesInput;

        // if (isAuthor || isPublisher) {
        //     if (authorModal && image === "") {
        //         coverImage = bookFields.file;
        //     }
        //
        //     if (authorModal && bookPreviewPagesInput !== "") {
        //         demoFile = bookFields.demoFile1;
        //     }
        //
        //     if (!authorModal) {
        //         coverImage = image;
        //         demoFile = bookPreviewPagesInput;
        //     }
        // } else {
        //     coverImage = image;
        //     demoFile = bookPreviewPagesInput;
        // }

        // console.log(bookPreviewPagesInput);

        let body = {
            name: bookNameInput,
            authors: selectedAuthors,
            categories: categories,
            publishers: selectedPublishers,
            description: descriptionInput,
            publishDate: Number(publishDateInput),
            language: languageInput,
            file: coverImage,
            pagesCount: Number(pagesCountInput),
            price: Number(priceInput),
            demoFile1: bookPreviewPagesInput,
            status: bookStatus,
            likes: likes,
            dislikes: dislikes,
        }

        let newBody = {};

        if (isAuthor) {
            newBody = {
                authorId: author.id,
                ...body,
            }
        } else if (isPublisher) {
            newBody = {
                publisherId: publisher.id,
                ...body,
            }
        } else {
            newBody = body;
        }

        // if (
        //   newBody.authors.length === 0 || newBody.description === "" ||
        //   newBody.language === "" || newBody.name === "" ||
        //   newBody.publishDate === undefined || newBody.file !== ""
        // ) {
        //     alert("You missed something");
        //
        //     return;
        // }

        // console.log(newBody);

        const authorItems = () => {
            setTimeout(() => {
                itemsCtx.fetchingAuthorBooks(author.id, "author", "CONSIDERATION");
                itemsCtx.fetchingAuthorBooks(author.id, "author", "GOOD");
                itemsCtx.fetchingAuthorBooks(author.id, "author", "BAD");
            }, 500);
        }

        const publisherItems = () => {
            setTimeout(() => {
                itemsCtx.fetchingAuthorBooks(publisher.id, "publisher", "CONSIDERATION");
                itemsCtx.fetchingAuthorBooks(publisher.id, "publisher", "GOOD");
                itemsCtx.fetchingAuthorBooks(publisher.id, "publisher", "BAD");
            }, 500);
        }

        if (authorModal) {
            itemsCtx.fetchingChangingBookItem(bookFields.id, newBody, bookFileInput);

            if (isPublisher) {
                publisherItems();
            } else if (isAuthor) {
                authorItems();
            }

            closeModalHandler();
        } else if (publisherModal) {
            itemsCtx.fetchingChangingBookItem(bookFields.id, newBody, bookFileInput);

            if (isPublisher) {
                publisherItems();
            } else if (isAuthor) {
                authorItems();
            }

            closeModalHandler();
        } else {
            itemsCtx.fetchingAddingBookItem(newBody, bookFileInput);

            if (isPublisher) {
                publisherItems();
            } else if (isAuthor) {
                authorItems();
            }
        }
    }

    useEffect(() => {
        if (!isAuthor && !isPublisher) {
            if (
                bookNameInput !== "" && priceInput !== "" &&
                publishDateInput !== "" && bookPreviewPagesInput !== "" &&
                languageInput !== "" && pagesCountInput !== "" &&
                descriptionInput !== "" && chosenCategories.length !== 0 &&
                image !== "" && chosenPublishers.length !== 0 &&
                chosenAuthors.length !== 0 && bookFileInput !== undefined &&
                bookPreviewPagesInput !== undefined
            ) {
                setDisabledAddingBtn(false);
            } else {
                setDisabledAddingBtn(true);
            }
        } else if (isAuthor || isPublisher) {
            if (
              bookNameInput !== "" && priceInput !== "" &&
              publishDateInput !== "" && languageInput !== "" &&
              pagesCountInput !== "" && descriptionInput !== ""
              && chosenCategories.length !== 0
            ) {
                setDisabledAddingBtn(false);
            } else {
                setDisabledAddingBtn(true);
            }
        }

        if (authorNameInput.length <= 3) {
            setCreateAuthorBtn(false);
        }

        if (isAuthor) {
            let authorData = JSON.parse(localStorage.getItem("userData"));

            // fetch(`http://localhost:8081/user/${authorData.id}`)
            //     .then(response => response.json())
            //     .then(data => {
                    fetch(`http://localhost:8081/author/user/${authorData.id}`)
                        .then(response => response.json())
                        .then(author => {
                            // if (author.length !== 0) {
                                // CHANGE+
                                setAuthor(author);
                            // }
                        });
                // });
        }

        if (isPublisher) {
            let publisherData = JSON.parse(localStorage.getItem("userData"));

            // fetch(`http://localhost:8081/user/${publisherData.id}`)
            //     .then(response => response.json())
            //     .then(data => {
                    fetch(`http://localhost:8081/publishing/user/${publisherData.id}`)
                        .then(response => response.json())
                        .then(publisher => {
                            // CHANGE+
                            setPublisher(publisher);
                        });
                // });
        }

        fetchingExistingAuthors();
        fetchingExistingPublishers();
    }, [
        bookNameInput,
        authorNameInput,
        publisherNameInput,
        chosenAuthors,
        chosenPublishers,
        publishDateInput,
        chosenCategories,
        languageInput,
        pagesCountInput,
        priceInput,
        image,
        bookFileInput,
        bookPreviewPagesInput,
        descriptionInput,
    ]);

    useEffect(() => {
        if (isAuthor || isPublisher) {
            if (authorModal) {
                setBookNameInput(bookFields.name);
                setDescriptionInput(bookFields.description);
                setPublishDateInput(bookFields.publishDate);
                setLanguageInput(bookFields.language);
                setPriceInput(bookFields.price);
                setPagesCountInput(bookFields.pagesCount);
            }

            // console.log(bookFields);
        }
    }, []);

    return (
        <div className="adding-book-form-wrapper">
            <div className={(authorModal || publisherModal) ? "adding-item-form-container modal-form-container" : "adding-item-form-container"}>
                <form onSubmit={addingFormSubmitHandler}>
                    {(authorModal || publisherModal) ?
                        <h2>Changing book</h2> :
                        <h2>What do you want to add?</h2>
                    }
                    <div className="adding-item-form-container__controls">
                        <div className="control">
                            <label htmlFor="name-input">Title</label>
                            <input
                                id="name-input"
                                value={bookNameInput}
                                onChange={(e) => setBookNameInput(e.target.value)}
                            />
                        </div>

                        <div className="control">
                            <label htmlFor="author-name-input">Author Name</label>
                            <div
                                id="author-name-input"
                                className="author-name-input"
                                tabIndex={0}
                                onClick={() => setOpenAuthorNameInputModal(true)}
                            >
                                <ul className="input-authors-list">
                                    {isAuthor && <li className="user-is-author">{author.name}</li>}
                                    {chosenAuthors.length > 0 && chosenAuthors.map(author => (
                                        <li
                                            key={author.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteChosenAuthor(author.id);
                                            }}
                                        >
                                            <span>{author.name}</span>
                                            <span className="remove-btn">&times;</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    onClick={(e) => clearChosenAuthors(e)}
                                    className="clear-btn"
                                >&times;</button>
                                <div className="divider"></div>
                                <button type="button" className="caret-btn">
                                    <div
                                        className="caret"
                                        onClick={() => setOpenAuthorNameInputModal(true)}
                                    ></div>
                                </button>
                            </div>
                        </div>

                        {!isAuthor && <div className="control">
                            <label htmlFor="">Publisher Name</label>
                            <div
                                id="publisher-name-input"
                                className="publisher-name-input"
                                tabIndex={0}
                                onClick={() => setOpenPublisherNameInputModal(true)}
                            >
                                <ul className="input-authors-list">
                                    {isPublisher && <li className="user-is-author">{publisher.name}</li>}
                                    {chosenPublishers.length > 0 && chosenPublishers.map(publisher => (
                                        <li
                                            key={publisher.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                deleteChosenPublisher(publisher.id);
                                            }}
                                        >
                                            <span>{publisher.name}</span>
                                            <span className="remove-btn">&times;</span>
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    type="button"
                                    onClick={(e) => clearChosenPublishers(e)}
                                    className="clear-btn"
                                >&times;</button>
                                <div className="divider"></div>
                                <button type="button" className="caret-btn">
                                    <div
                                        className="caret"
                                        onClick={() => setOpenPublisherNameInputModal(true)}
                                    ></div>
                                </button>
                            </div>
                        </div>}

                        <div className="control">
                            <label htmlFor="">Publish Year</label>
                            <input
                                id=""
                                type="text"
                                value={publishDateInput}
                                onChange={(e) => setPublishDateInput(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="category-select" htmlFor="category-lebel">Categories</label>
                            <Select
                                id="category-select"
                                multiple
                                options={itemsCtx.categoriesForSelect}
                                value={chosenCategories}
                                onChange={o => setChosenCategories(o)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Language</label>
                            <input
                                id=""
                                type="language"
                                value={languageInput}
                                onChange={(e) => setLanguageInput(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Cover image</label>
                            <input
                                id=""
                                type="file"
                                className="image-input"
                                onChange={changeImage}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Book file</label>
                            <input
                                id="book-file"
                                type="file"
                                className="book-file-input"
                                accept="application/pdf"
                                onChange={bookFileHandler}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Book preview pages</label>
                            <input
                                id="book-preview-file"
                                type="file"
                                className="book-file-input"
                                accept="application/pdf"
                                onChange={handlePreviewUpload}
                            />
                        </div>
                        <div className="number-inputs">
                            <div className="control">
                                <label htmlFor="">Price ($)</label>
                                <input
                                    id=""
                                    type="number"
                                    min="0"
                                    value={priceInput}
                                    onChange={(e) => setPriceInput(e.target.value)}
                                />
                            </div>
                            <div className="control">
                                <label htmlFor="">Pages count</label>
                                <input
                                    id=""
                                    type="number"
                                    min="0"
                                    value={pagesCountInput}
                                    onChange={(e) => setPagesCountInput(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="control">
                        <label htmlFor="description-textarea">Book description</label>
                        <textarea
                            id="description-textarea"
                            value={descriptionInput}
                            onChange={(e) => setDescriptionInput(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-bottom">
                        {!mainAdminCtx.adminLoading && !authorModal && !publisherModal && <Button type="submit" variant="contained" disabled={disabledAddingBtn}>
                            Add new book
                        </Button>}
                        {/*{mainAdminCtx.adminLoading && <Button variant="contained" disabled={true}>*/}
                        {/*    Loading...*/}
                        {/*</Button>}*/}
                        {!mainAdminCtx.adminLoading && (authorModal || publisherModal) && <Button type="submit" variant="contained" disabled={disabledAddingBtn}>
                            Change book
                        </Button>}
                    </div>
                </form>
            </div>

            {/*// author*/}
            <div className="modal-name-input-container">
                <Modal
                    open={openAuthorNameInputModal}
                    onClose={closeAuthorNameInputModalHandler}
                >
                    <Box className="input-name-modal">
                        <label>Author name</label>
                        <input
                            type="text"
                            value={authorNameInput}
                            onKeyPress={handleAuthorKeyPress}
                            onChange={changeAuthorNameInputHandler}
                        />
                        {existingAuthors.length > 0 && <ul className="existing-authors-list">
                            {existingAuthors.map(author => (
                                <li
                                    key={author.id}
                                    onClick={() => {
                                        setAuthorNameInput(author.name);
                                        setExistingAuthors([]);
                                    }}
                                >
                                    <span>{author.name}</span>
                                </li>
                            ))}
                        </ul>}
                        <ul className="authors-list">
                            {chosenAuthors.length > 0 && chosenAuthors.map(author => (
                                <li
                                    key={author.id}
                                    onClick={() => deleteChosenAuthor(author.id)}
                                >
                                    <span>{author.name}</span>
                                    <span className="remove-btn">&times;</span>
                                </li>
                            ))}
                        </ul>
                        <div className="create-new-author-btn-box">
                            {createAuthorBtn && <Button
                                variant="contained"
                                className="create-new-author-btn"
                                onClick={createNewAuthorHandler}
                            >
                                Create author
                            </Button>}
                        </div>
                    </Box>
                </Modal>
            </div>

            {/* publisher*/}
            <div className="modal-name-input-container">
                <Modal
                    open={openPublisherNameInputModal}
                    onClose={closePublisherNameInputModalHandler}
                >
                    <Box className="input-name-modal">
                        <label>Publisher name</label>
                        <input
                            type="text"
                            value={publisherNameInput}
                            onKeyPress={handlePublisherKeyPress}
                            onChange={changePublisherNameInputHandler}
                        />
                        {existingPublishers.length > 0 && <ul className="existing-authors-list">
                            {existingPublishers.map(publisher => (
                                <li
                                    key={publisher.id}
                                    onClick={() => {
                                        setPublisherNameInput(publisher.name);
                                        setExistingPublishers([]);
                                    }}
                                >
                                    <span>{publisher.name}</span>
                                </li>
                            ))}
                        </ul>}
                        <ul className="authors-list">
                            {chosenPublishers.length > 0 && chosenPublishers.map(publisher => (
                                <li
                                    key={publisher.id}
                                    onClick={() => deleteChosenPublisher(publisher.id)}
                                >
                                    <span>{publisher.name}</span>
                                    <span className="remove-btn">&times;</span>
                                </li>
                            ))}
                        </ul>
                        <div className="create-new-author-btn-box">
                            {createPublisherBtn && <Button
                                variant="contained"
                                className="create-new-author-btn"
                                onClick={createNewPublisherHandler}
                            >
                                Create publisher
                            </Button>}
                        </div>
                    </Box>
                </Modal>
            </div>
        </div>
    );
}

export default AddingNewBookItemForm;