import React, { useContext, useEffect, useState, memo } from "react";

import { useGetImage } from "../../../hooks/useGetImage";

import AdminMainContext from "../../admin-context/admin-main-context";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import "./AdminAddingCategoryPage.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import AdminCategoryCard from "./AdminCategoryCard";
import CloseIcon from "@mui/icons-material/Close";

const AdminAddingCategoryPage = () => {
    const { categories, adminLoading, fetchingCategories, fetchingChangingCategory, fetchingDeleteCategory } = useContext(AdminMainContext);
    const [openChangeModal, setChangeOpenModal] = useState(false);
    const [openDeleteModal, setDeleteOpenModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameId, setCategoryNameId] = useState("");
    const [categoryNameInput, setCategoryNameInput] = useState("");
    const { image, changeImage } = useGetImage();
    const [categoryImageInput, setCategoryImageInput] = useState("");

    const openChangeModalHandler = () => setChangeOpenModal(true);
    const closeChangeModalHandler = () => setChangeOpenModal(false);

    const openDeleteModalHandler = () => setDeleteOpenModal(true);
    const closeDeleteModalHandler = () => setDeleteOpenModal(false);

    const getCategoryName = (name) => setCategoryName(name);

    const deleteCategoryHandler = (category) => {
        fetchingDeleteCategory(categoryNameId, category);

        closeDeleteModalHandler();
    }

    const changeCategoryHandler = (event) => {
        event.preventDefault();

        if (categoryNameInput.length < 3) {
            alert("Category name is to short");

            return;
        }

        fetchingChangingCategory(categoryNameId, categoryName, categoryNameInput, categoryImageInput);
        closeChangeModalHandler();
    }

    useEffect(() => {
        fetchingCategories("genre");
        setCategoryImageInput(image);
    }, [image]);

    return (
        <div className="admin-page-wrapper category-box">
            <h1>Here you can <span>add</span>, <span>change</span> or <span>delete</span> category</h1>
            <div className="admin-categories-container">
                <h2>Existing categories:</h2>
                <div className="admin-categories-container__categories">
                    <div className="adding-category-box">
                        <Link to="/admin/adding-category/new">
                            <AddIcon />
                            <span>Add category</span>
                        </Link>
                    </div>
                    <ul>
                        {categories.length > 0 && categories.map(categoryItem => (
                            <AdminCategoryCard
                                key={categoryItem.id}
                                id={categoryItem.id}
                                name={categoryItem.name}
                                img={categoryItem.file}
                                openChangeModal={openChangeModalHandler}
                                openDeleteModal={openDeleteModalHandler}
                                onDeleteCategory={() => {
                                    getCategoryName(categoryItem.name);
                                    setCategoryNameId(categoryItem.id);
                                }}
                                onChangeCategory={() => {
                                    getCategoryName(categoryItem.name);
                                    setCategoryNameId(categoryItem.id);
                                    setCategoryNameInput(categoryItem.name);
                                    setCategoryImageInput(categoryItem.file);
                                }}
                            />
                        ))}
                        {/* {categories.length === 0 && <p>Nothing here yet</p>} */}
                        {adminLoading &&
                            <div className="loading-box">
                                <CircularProgress />
                            </div>
                        }
                    </ul>
                </div>
            </div>

            <Modal
                open={openChangeModal}
                onClose={closeChangeModalHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="change-category-modal">
                    <form onSubmit={changeCategoryHandler}>
                        <h3>Change category</h3>
                        <div className="control">
                            <label htmlFor="category-name-input">New name</label>
                            <input
                                id="category-name-input"
                                type="text"
                                value={categoryNameInput}
                                onChange={e => setCategoryNameInput(e.target.value)}
                            />
                        </div>
                        <div className="control">
                            <label htmlFor="category-image-input">New image cover</label>
                            <input
                                id="category-image-input"
                                type="file"
                                onChange={changeImage}
                                className="image-input"
                            />
                        </div>
                        <div className="form-bottom">
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Change
                            </Button>
                            <Button
                                onClick={closeChangeModalHandler}
                                color="secondary"
                            >Cancel</Button>
                            {/*{mainAdminCtx.adminLoading && <Button variant="contained" disabled={true}>*/}
                            {/*    Loading...*/}
                            {/*</Button>}*/}
                        </div>
                    </form>
                </Box>
            </Modal>

            <Modal
                open={openDeleteModal}
                onClose={closeDeleteModalHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="delete-modal">
                    <h3>You really want to delete this category?</h3>
                    <div className="delete-modal-btns">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteCategoryHandler(categoryName)}
                        >Delete</Button>
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={closeDeleteModalHandler}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default memo(AdminAddingCategoryPage);