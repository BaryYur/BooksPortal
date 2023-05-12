import React from "react";

import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import "./PurchasedBookItem.css";

const PurchasedBookItem = ({ bookId, bookName, file, purchasedDate }) => {
    const downloadBookHandler = () => {
        const linkSource = `data:application/pdf;base64,${file}`;
        const downloadLink = document.createElement("a");
        const fileName = "book.pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    return (
        <li key={bookId} className="purchased-book-item">
            <p className="book-name">
                <ImportContactsOutlinedIcon style={{ color: "#5d5c5c" }} />
                <span>{bookName}</span>
            </p>
            <div>
                <p>{purchasedDate}</p>
                <Button onClick={downloadBookHandler}>
                    <DownloadIcon />
                    <span>Download</span>
                </Button>
            </div>
        </li>
    );
}

export default PurchasedBookItem;