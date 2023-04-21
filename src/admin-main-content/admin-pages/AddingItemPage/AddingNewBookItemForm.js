import React, { useContext, useEffect, useState } from "react";

import { useGetImage } from "../../../hooks/useGetImage";

import AdminMainContext from "../../admin-context/admin-main-context";
import itemsContext from "../../../context/items-context";

import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Select } from "../../../components/Forms/Select";
import Box from "@mui/material/Box";
import "./AddingNewBookItemForm.css";

const AddingNewBookItemForm = () => {
    const mainAdminCtx = useContext(AdminMainContext);
    const itemsCtx = useContext(itemsContext);
    const [chosenCategories, setChosenCategories] = useState([]);
    const [chosenAuthors, setChosenAuthors] = useState([]);
    const [existingAuthors, setExistingAuthors] = useState([]);

    const [bookNameInput, setBookNameInput] = useState("");
    const [authorNameInput, setAuthorNameInput] = useState("");
    const [publisherNameInput, setPublisherNameInput] = useState("");
    const [pagesCountInput, setPagesCountInput] = useState(0);
    const [priceInput, setPriceInput] = useState(0);
    const [descriptionInput, setDescriptionInput] = useState("");
    const [publishDateInput, setPublishDateInput] = useState("");
    const [languageInput, setLanguageInput] = useState("");
    const { image, changeImage } = useGetImage();

    const [openNameInputModal, setOpenNameInputModal] = useState(false);
    const [createAuthorBtn, setCreateAuthorBtn] = useState(false);
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(true);

    const closeNameInputModalHandler = () => {
        setOpenNameInputModal(false);
    }

    const changeNameInputHandler = (event) => {
        setAuthorNameInput(event.target.value);
    }

    const checkingAuthorExisting = () => {
        let counter = 0;

        if (chosenAuthors.length > 0) {
            for (let author of chosenAuthors) {
                if (author.name === authorNameInput) counter++;
            }
        }

        if (counter > 0) {
            alert("You already add this author");

            return false;
        } else return true;
    }

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && authorNameInput.length > 3) {
            if (checkingAuthorExisting() === true) {
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
            alert("Author Name is to short");
            setCreateAuthorBtn(false);
        }
    }

    const fetchingExistingAuthors = () => {
        if (authorNameInput !== "") {
            fetch(`http://localhost:8081/author/all/${authorNameInput}`)
                .then(response => response.json())
                .then(data => {
                    setExistingAuthors(data);
                })
        } else if (authorNameInput === "") {
            setExistingAuthors([]);
        }
    }

    const createNewAuthorHandler = () => {
        if (checkingAuthorExisting() === true) {
            fetch("http://localhost:8081/author", {
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

    const deleteChosenAuthor = (id) => {
        setChosenAuthors(chosenAuthors.filter(author => author.id !== id));
    }

    const clearChosenAuthors = (e) => {
        e.stopPropagation();

        setChosenAuthors([]);
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

        let body = {
            name: bookNameInput,
            authors: selectedAuthors,
            genres: categories,
            publisher: publisherNameInput,
            description: descriptionInput,
            publishDate: publishDateInput,
            language: languageInput,
            file: image,
            pagesCount: Number(pagesCountInput),
            price: Number(priceInput),
        }

        itemsCtx.fetchingAddingBookItem(body);
    }

    useEffect(() => {
        if (
            bookNameInput.length > 3 && chosenAuthors.length > 0 &&
            publisherNameInput.length > 3 && publishDateInput !== "" &&
            languageInput !== "" && image !== "" &&
            pagesCountInput !== "" && priceInput !== "" &&
            descriptionInput !== "" && chosenCategories.length > 0
        ) {
            setDisabledAddingBtn(false);
        } else {
            setDisabledAddingBtn(true);
        }

        itemsCtx.fetchingAllCategories();

        if (authorNameInput.length <= 3) {
            setCreateAuthorBtn(false);
        }

        fetchingExistingAuthors();
    }, [
        bookNameInput,
        authorNameInput,
        chosenAuthors,
        publisherNameInput,
        publishDateInput,
        chosenCategories,
        languageInput,
        pagesCountInput,
        priceInput,
        image,
        descriptionInput,
    ]);

    return (
        <div className="adding-book-form-wrapper">
            <div className="adding-item-form-container">
                <form onSubmit={addingFormSubmitHandler}>
                    <h2>What do you want to add?</h2>
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
                            <label htmlFor="">Publisher</label>
                            <input
                                id=""
                                type="text"
                                value={publisherNameInput}
                                onChange={(e) => setPublisherNameInput(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="author-name-input">Author Name</label>
                            <div
                                id="author-name-input"
                                className="author-name-input"
                                tabIndex={0}
                                onClick={() => setOpenNameInputModal(true)}
                            >
                                <ul className="input-authors-list">
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
                                        onClick={() => setOpenNameInputModal(true)}
                                    ></div>
                                </button>
                            </div>
                        </div>
                        <div className="control">
                            <label htmlFor="">Publish Date</label>
                            <input
                                id=""
                                type="date"
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
                        <div className="number-inputs">
                            <div className="control">
                                <label htmlFor="">Price (hrn)</label>
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
                        {!mainAdminCtx.adminLoading && <Button type="submit" variant="contained" disabled={disabledAddingBtn}>
                            Add new item
                        </Button>}
                        {/*{mainAdminCtx.adminLoading && <Button variant="contained" disabled={true}>*/}
                        {/*    Loading...*/}
                        {/*</Button>}*/}
                    </div>
                </form>
            </div>

            <div className="modal-name-input-container">
                <Modal
                    open={openNameInputModal}
                    onClose={closeNameInputModalHandler}
                >
                    <Box className="input-name-modal">
                        <label>Author name</label>
                        <input
                            type="text"
                            list="existing-authors"
                            value={authorNameInput}
                            onKeyPress={handleKeyPress}
                            onChange={changeNameInputHandler}
                        />
                        {/*<datalist id="existing-authors">*/}
                        {/*    {existingAuthors.map(author => (*/}
                        {/*        <option key={author.id} value={author.name} />*/}
                        {/*    ))}*/}
                        {/*</datalist>*/}
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
        </div>
    );
}

export default AddingNewBookItemForm;