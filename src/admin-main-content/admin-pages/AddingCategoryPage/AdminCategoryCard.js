import React, { useMemo, memo, useState, useContext } from "react";

import { Link } from "react-router-dom";

import AdminMainContext from "../../admin-context/admin-main-context";

import { useCutText } from "../../../hooks/useCutText";

import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";

const AdminCategoryCard = ({ id, name, img, openChangeModal, openDeleteModal, onDeleteCategory, onChangeCategory }) => {
    const { changeText } = useCutText();
    const adminCtx = useContext(AdminMainContext);
    const [openModal, setOpenModal] = useState(false);

    const changedName = useMemo(() => changeText(name, 14),[name]);

    const openSubcategoriesModalHandler = () => {
        setOpenModal(true);
        adminCtx.fetchingSubcategories(id);
    }

    const deleteSubcategoryHandler = (subId) => {
        adminCtx.fetchingDeleteSubcategory(subId);

        setTimeout(() => {
            adminCtx.fetchingSubcategories(id);
        }, 200);
    }

    return (
        <li>
            <div className="category-card-wrapper"></div>
            <img src={img} alt="image" />
            <div className="category-card-bottom" title={name}>
                {changedName}
            </div>
            <button
                className="edit-btn"
                title="Change category"
                onClick={() => {
                    openChangeModal();
                    onChangeCategory(id, name);
                }}
            >
                <EditIcon />
            </button>
            <button
                className="delete-btn"
                title="Delete category"
                onClick={() => {
                    openDeleteModal();
                    onDeleteCategory(name, id);
                }}
            >
                <DeleteIcon />
            </button>
            <Button onClick={openSubcategoriesModalHandler}>Subcategories</Button>

            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="delete-modal subcategories-modal">
                    <ul>
                        {adminCtx.categorySubcategories.length !== 0 ? adminCtx.categorySubcategories.map(subcategory => (
                            <li key={subcategory.id}>
                                <div>
                                    <img src={subcategory.file} />
                                    <span>{subcategory.name}</span>
                                </div>
                                <div>
                                    <button onClick={() => deleteSubcategoryHandler(subcategory.id)}>
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </li>
                        )):
                            <p className="no-items-paragraph" style={{ margin: "10px 0" }}>No subcategories yet</p>
                        }
                    </ul>
                    <div className="delete-modal-btns">
                        <button
                            className="close-btn"
                            variant="contained"
                            color="secondary"
                            onClick={() => setOpenModal(false)}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <Link to={`/admin/adding-category/${id}/subcategory`}>
                        <Button>Add subcategory</Button>
                    </Link>
                </Box>
            </Modal>
        </li>
    );
}

export default memo(AdminCategoryCard);