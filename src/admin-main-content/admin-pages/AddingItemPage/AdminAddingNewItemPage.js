import React, { useContext, useEffect, useState } from "react";

import AdminMainContext from "../../admin-context/admin-main-context";

import { Button } from "@mui/material";
import { Select } from "../../../components/Forms/Select";
import "./AdminAddingNewItemPage.css";

const AdminAddingNewItemPage = () => {
    const mainAdminCtx = useContext(AdminMainContext);
    const categories = [
        {
            label: "adventure",
            value: 1
        }, 
        {
            label: "fantasy",
            value: 2
        }, 
        {
            label: "detective",
            value: 3
        }, 
        {
            label: "history",
            value: 4
        }
    ];
    const [chosenCategories, setChosenCategories] = useState([]);

    const [disabledAddingBtn, setDisabledAddingBtn] = useState(true);
    const [itemNameInput, setItemNameInput] = useState("");
    const [authorNameInput, setAuthorNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");

    const addingFormSubmitHandler = (event) => {
        event.preventDefault();

        let categories = [];

        for (let item of chosenCategories) {
            categories.push(item.label);
        }

        let body = {
            name: itemNameInput,
            categories: categories,
        }

        console.log(body);
    }

    useEffect(() => {
        if (
            itemNameInput !== "" && authorNameInput !== "" &&
            descriptionInput !== "" && chosenCategories.length !== 0
        ) {
            setDisabledAddingBtn(false);
        } else {
            setDisabledAddingBtn(true);
        }
    }, [itemNameInput, authorNameInput, descriptionInput, chosenCategories])

    return (
        <div className="admin-page-wrapper">
            <div className="adding-item-form-container">
                <form onSubmit={addingFormSubmitHandler}>
                    <h2>What do you want to add?</h2>
                    <div className="adding-item-form-container__controls">
                        <div className="control">
                            <label htmlFor="name-input">Title</label>
                            <input
                                id="name-input"
                                value={itemNameInput}
                                onChange={(e) => setItemNameInput(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="author-name-input">Author Name</label>
                            <input
                                id="author-name-input"
                                value={authorNameInput}
                                onChange={(e) => setAuthorNameInput(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Publisher</label>
                            <input
                                id=""
                                type="text"
                            />
                        </div>

                        <div>
                            <label htmlFor="category-select">Categories</label>
                            <Select
                                id="category-select"
                                multiple
                                options={categories}
                                value={chosenCategories}
                                onChange={o => setChosenCategories(o)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="">Cover image</label>
                            <input
                                id=""
                                type="file"
                                className="image-input"
                            />
                        </div>
                        <div className="number-inputs">
                            <div className="control">
                                <label htmlFor="">Price</label>
                                <input
                                    id=""
                                    type="number"
                                    min="0"
                                />
                            </div>
                            <div className="control">
                                <label htmlFor="">Pages count</label>
                                <input
                                    id=""
                                    type="number"
                                    min="0"
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
                        {mainAdminCtx.adminLoading && <Button variant="contained" disabled={true}>
                            Loading...
                        </Button>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminAddingNewItemPage;