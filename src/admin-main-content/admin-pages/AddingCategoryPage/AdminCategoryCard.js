import React, { useMemo, memo } from "react";

import { useCutText } from "../../../hooks/useCutText";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminCategoryCard = ({ id, name, img, openChangeModal, openDeleteModal, onDeleteCategory, onChangeCategory }) => {
    const { changeText } = useCutText();

    const changedName = useMemo(() => changeText(name, 14),[name]);

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
        </li>
    );
}

export default memo(AdminCategoryCard);