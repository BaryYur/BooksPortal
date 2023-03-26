import React, { useMemo } from "react";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminCategoryCard = ({ name, img, openChangeModal, openDeleteModal, onDeleteCategory, onChangeCategory }) => {
    const changeName = () => {
        if (name.length < 23) {
            return name.charAt(0).toUpperCase() + name.slice(1);
        } else {
            return name.charAt(0).toUpperCase() + name.split("").splice(1, 20).join("") + "...";
        }
    }

    const changedName = useMemo(() => changeName(),[name]);

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
                    onChangeCategory(name);
                }}
            >
                <EditIcon />
            </button>
            <button
                className="delete-btn"
                title="Delete category"
                onClick={() => {
                    openDeleteModal();
                    onDeleteCategory(name);
                }}
            >
                <DeleteIcon />
            </button>
        </li>
    );
}

export default AdminCategoryCard;