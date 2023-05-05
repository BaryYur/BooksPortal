import React, { useContext } from "react";

import ItemsContext from "../../context/items-context";

import Masonry from "@mui/lab/Masonry";
import CircularProgress from "@mui/material/CircularProgress";
import NewsItem from "./NewsItem";
import "./NewsPage.css";

const NewsPage = () => {
    const { newsItems, loading } = useContext(ItemsContext);

    return (
        <div className="main-wrapper">
            <div className="news-page-container">
                <h2>News Page</h2>
                <Masonry columns={4} spacing={2}>
                    {newsItems.map(news => (
                        <NewsItem
                            key={Math.random()}
                            title={news.title}
                            newsImg={news.urlToImage}
                            url={news.url}
                            author={news.author}
                        />
                    ))}
                </Masonry>
                {loading && (
                    <div className="loading-box">
                        <CircularProgress />
                    </div>
                )}
            </div>
        </div>
    );
}

export default NewsPage;