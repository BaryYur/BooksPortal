import React, { useState, useContext, useEffect } from "react";

import { useGetImage } from "../../../hooks/useGetImage";

import ItemsContext from "../../../context/items-context";
import AdminMainContext from "../../admin-context/admin-main-context";

import { Button } from "@mui/material";
import "./AddingCategoryNewPage.css";

const AddingCategoryNewPage = ({ subcategory, categoryId }) => {
    const itemsCtx = useContext(ItemsContext);
    const mainAdminCtx = useContext(AdminMainContext);
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const [disabledAddingBtn, setDisabledAddingBtn] = useState(true);
    const { image, changeImage } = useGetImage();

    const addingNewCategoryHandler = (event) => {
        event.preventDefault();

        let body;
        body = {
            name: categoryNameInput,
            file: image,
        }

        if (subcategory) {
            body = {
                genreId: categoryId,
                ...body,
            }
        }

        if (subcategory) {
            mainAdminCtx.fetchingAddingSubcategory(body);
        } else {
            mainAdminCtx.fetchingAddingCategory(body);
        }

        setTimeout(() => {
            itemsCtx.fetchingAllCategories();
        }, 500);

        setCategoryNameInput("");
        setDisabledAddingBtn(false);
        document.getElementById("category-image-input").value = "";
    }

    useEffect(() => {
        if (categoryNameInput.length >= 3 && image !== "") {
            setDisabledAddingBtn(false);
        } else {
            setDisabledAddingBtn(true);
        }
    }, [image, categoryNameInput]);

    return (
        <div className="admin-page-wrapper">
            <div className="adding-category-form-container">
                <form onSubmit={addingNewCategoryHandler}>
                    <h2>Add new {subcategory ? <span>subcategory</span> : <span>category</span>}</h2>
                    <div className="control">
                        <label htmlFor="category-name-input">
                            {subcategory ? <span>Subcategory</span> : <span>Category</span>} name
                        </label>
                        <input
                            id="category-name-input"
                            type="text"
                            value={categoryNameInput}
                            onChange={e => setCategoryNameInput(e.target.value)}
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="category-image-input">{subcategory ? <span>Subcategory</span> : <span>Category</span>} image cover</label>
                        <input
                            id="category-image-input"
                            type="file"
                            onChange={changeImage}
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