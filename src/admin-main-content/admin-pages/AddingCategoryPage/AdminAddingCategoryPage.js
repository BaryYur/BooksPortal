import React, { useContext, useState } from "react";

import AdminMainContext from "../../admin-context/admin-main-context";

import { Link } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import "./AdminAddingCategoryPage.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import AdminCategoryCard from "./AdminCategoryCard";

const AdminAddingCategoryPage = () => {
    const mainAdminCtx = useContext(AdminMainContext);
    const [openChangeModal, setChangeOpenModal] = useState(false);
    const [openDeleteModal, setDeleteOpenModal] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryNameInput, setCategoryNameInput] = useState("");

    const openChangeModalHandler = () => setChangeOpenModal(true);
    const closeChangeModalHandler = () => setChangeOpenModal(false);

    const openDeleteModalHandler = () => setDeleteOpenModal(true);
    const closeDeleteModalHandler = () => setDeleteOpenModal(false);

    const getCategoryName = (name) => setCategoryName(name);

    const deleteCategoryHandler = (category) => {
        mainAdminCtx.fetchingDeleteCategory("", category);

        closeDeleteModalHandler();
    }

    const changeCategoryHandler = (event) => {
        event.preventDefault();

        mainAdminCtx.fetchingChangingCategory("", categoryName, categoryNameInput);
        closeChangeModalHandler();
    }

    return (
        <div className="admin-page-wrapper category-box">
            <h1>Here you can <span>add</span> or <span>delete</span> category</h1>
            <div className="admin-categories-container">
                <h2>Existing categories:</h2>
                <div className="admin-categories-container__categories">
                    <div className="adding-category-box">
                        <Link to="/admin/adding-category/new">
                            <AddIcon style={{ fontSize: "60px" }} />
                            <span>Add category</span>
                        </Link>
                    </div>
                    <ul>
                        {mainAdminCtx.categories.map(categoryItem => (
                            <AdminCategoryCard
                                key={Math.random()}
                                name={categoryItem.name}
                                img={categoryItem.img}
                                openChangeModal={openChangeModalHandler}
                                openDeleteModal={openDeleteModalHandler}
                                onDeleteCategory={() => getCategoryName(categoryItem.name)}
                                onChangeCategory={() => getCategoryName(categoryItem.name)}
                            />
                        ))}
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
                                // onChange={imageUploadedHandler}
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
                <Box className="delete-category-modal" >
                    <h3>You really want to delete this category?</h3>
                    <div className="delete-modal-btns">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteCategoryHandler(categoryName)}
                        >Delete</Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={closeDeleteModalHandler}
                        >Close</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AdminAddingCategoryPage;