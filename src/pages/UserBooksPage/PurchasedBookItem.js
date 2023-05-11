import React from "react";

import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import "./PurchasedBookItem.css";

const PurchasedBookItem = ({ bookId, bookName, file }) => {
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
            <p>{bookName}</p>
            <Button onClick={downloadBookHandler}>
                <DownloadIcon />
                <span>Download</span>
            </Button>
        </li>
    );
}

export default PurchasedBookItem;