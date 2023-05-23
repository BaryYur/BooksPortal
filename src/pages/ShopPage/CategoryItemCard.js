import React, { useMemo } from "react";

import { useCutText } from "../../hooks/useCutText";

import { Link } from "react-router-dom";

import "./CategoryItemCard.css";

const CategoryItemCard = ({ title, img, subcategories }) => {
    const { changeText } = useCutText();

    const changedTitle = useMemo(() => changeText(title, 14),[title]);

    return (
        <li className="category-link-card">
            {subcategories ? <Link to={`${title.toLowerCase()}`}>
                <img src={img} title={title} />
                <div className="bottom-box">{changedTitle}</div>
                <div className="category-card-wrapper"></div>
            </Link>:
            <Link to={`categories/${title.toLowerCase()}`}>
                <img src={img} title={title} />
                <div className="bottom-box">{changedTitle}</div>
                <div className="category-card-wrapper"></div>
            </Link>}
        </li>
    );
}

export default CategoryItemCard;