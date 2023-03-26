import React, { useState, useContext, useEffect } from "react";

import AdminMainContext from "../../admin-context/admin-main-context";

import { Button } from "@mui/material";
import "./AddingCategoryNewPage.css";

const AddingCategoryNewPage = () => {
    const mainAdminCtx = useContext(AdminMainContext);
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [categoryImageInput, setCategoryImageInput] = useState("");
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(true);

    const imageUploadedHandler = (e) => {
        let file = e.target.files[0];
        let reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setCategoryImageInput(reader.result);
            }
        } else {
            setCategoryImageInput("");
        }
    }

    const addingNewCategoryHandler = (event) => {
        event.preventDefault();

        let body = {
            categoryName: categoryNameInput,
            image: categoryImageInput,
        }

        if (mainAdminCtx.fetchingAddingCategory(body) === true) {
            setCategoryNameInput("");
            document.getElementById("category-image-input").value = "";
        }
    }

    useEffect(() => {
        if (categoryImageInput !== "" && categoryNameInput !== "") {
            setDisabledAddingBtn(false);
        } else {
            setDisabledAddingBtn(true);
        }
    }, [categoryImageInput, categoryNameInput])

    return (
        <div className="admin-page-wrapper">
            <div className="adding-category-form-container">
                <form onSubmit={addingNewCategoryHandler}>
                    <h2>Add new category</h2>
                    <div className="control">
                        <label htmlFor="category-name-input">Category name</label>
                        <input
                            id="category-name-input"
                            type="text"
                            value={categoryNameInput}
                            onChange={e => setCategoryNameInput(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="category-image-input">Categories image cover</label>
                        <input
                            id="category-image-input"
                            type="file"
                            onChange={imageUploadedHandler}
                            className="image-input"
                        />
                    </div>
                    <div className="form-bottom">
                        {!mainAdminCtx.adminLoading && <Button type="submit" variant="contained" disabled={disabledAddingBtn}>
                            Add new category
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

export default AddingCategoryNewPage;