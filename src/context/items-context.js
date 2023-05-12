import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

const ItemsContext = React.createContext({
    fetchingBookItem: (id, category) => {},
    fetchingAddingBookItem: (body, bookFile) => {},
    fetchingChangingBookItem: (body, bookFile) => {},
    fetchingDownloadBook: (bookId) => {},
    fetchingSearchingItems: (book) => {},
    fetchingDeletingBookItem: () => {},
    fetchingCategoryBooks: (genreName) => {},
    fetchingAllCategories: () => {},
    fetchingUnlockBook: (id) => {},
    fetchingAdminBooks: () => {},
    fetchingAuthorBooks: (id, status) => {},
    fetchingPurchasedBooks: () => {},
});

export const ItemsContextProvider = ({ children }) => {
    const [searchingItems, setSearchingItems] = useState([]);
    const [searchingItems1, setSearchingItems1] = useState([]);
    const [searchingItems2, setSearchingItems2] = useState([]);
    const [booksCategories, setBooksCategories] = useState([]);
    const [categoryBooks, setCategoryBooks] = useState([]);
    const [bookItemCategoriesList, setBookItemCategoriesList] = useState([]);
    const [bookItemAuthorsList, setBookItemAuthorsList] = useState([]);
    const [bookItemPublishersList, setBookItemPublishersList] = useState([]);
    const [bookItem, setBookItem] = useState({});
    const [adminBooks, setAdminBooks] = useState([]);
    const [categoriesForSelect, setCategoriesForSelect] = useState([]);
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const alert = (title, text, icon) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            width: 460,
            height: 400,
        })
    }

    const fetchingAllCategories = () => {
        setLoading(true);

        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                if (data !== []) {
                    setBooksCategories(data);
                    setCategoriesForSelect([]);

                    for (let i = 0; i < data.length; i++) {
                        setCategoriesForSelect(prevItem => {
                            return [
                                ...prevItem,
                                {
                                    id: data[i].id,
                                    label: data[i].name.toLowerCase(),
                                    value: i + 1,
                                },
                            ];
                        });
                    }
                }

                setLoading(false);
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
            })
    }

    const fetchingCategoryBooks = (categoryId) => {
        setLoading(true);

        fetch(`http://localhost:8081/book/category/${categoryId}/GOOD`)
            .then(response => response.json())
            .then(data => {
                setCategoryBooks(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert("Oops...", `Something went wrong!` , "error");
            })
    }

    const fetchingSearchingItems = (bookName, isAdmin) => {
        setLoading(true);
        setSearchingItems([]);
        setSearchingItems1([]);
        setSearchingItems2([]);

        fetch(`http://localhost:8081/book/all/${bookName}/GOOD`)
            .then(response => response.json())
            .then(data => {
                setSearchingItems1(data);
            })
            .catch(error => {
                setLoading(false);
                alert("Oops...", `Something went wrong!` , "error");
            });

        if (isAdmin) {
            fetch(`http://localhost:8081/book/all/${bookName}/BAD`)
            .then(response => response.json())
            .then(data => {
                setSearchingItems2(data);
            })
            .catch(error => {
                setLoading(false);
                alert("Oops...", `Something went wrong! ${error}` , "error");
            });
        }

        setLoading(false);
        setSearchingItems([ ...searchingItems1, ...searchingItems2 ]);
    }

    const fetchingDeletingBookItem = (id) => {
        fetch(`http://localhost:8081/book/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    setSearchingItems(searchingItems.filter(book => book.id !== id));
                    setAdminBooks(adminBooks.filter(book => book.id !== id));
                }
            })
            .catch(error => {
                alert("Oops...", `Something went wrong deleting book` , "error");
            });
    }

    const attachmentFileHandler = (id, file) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", file);

        fetch(`http://localhost:8081/attachment`, {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                if (!res.ok) {
                    console.log("attachment error");
                }
            })
            .catch(error => {
                alert("Oops...", `Something went wrong!` , "error");
            });
    }

    const fetchingAddingBookItem = (body, bookFile) => {
        fetch(`http://localhost:8081/book`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    alert("Great", "Adding successfully","success");

                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .then(data => {
                attachmentFileHandler(data.id, bookFile);
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! ${error}` , "error");
            });
    }

    const fetchingChangingBookItem = (bookId, body, bookFile) => {
        fetch(`http://localhost:8081/book/${bookId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    // alert("Great", "You add new book","success");

                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .then(data => {
                attachmentFileHandler(data.id, bookFile);
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! Changing book error` , "error");
            })
    }

    const fetchingDownloadBook = (bookId) => {
        fetch(`http://localhost:8081/attachment/download/${bookId}`)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "filename.pdf", { type: "application/pdf" });
                const fileURL = URL.createObjectURL(file);

                window.open(fileURL, "_blank");
            })
            .catch(error => {
                console.error("Error with file", error);
            });
    }

    const fetchingAdminBooks = () => {
        fetch(`http://localhost:8081/book/status/CONSIDERATION`)
            .then(response => response.json())
            .then(data => {
                setAdminBooks(data);
            });
    }

    const fetchingUnlockBook = (body) => {
        fetch(`http://localhost:8081/book/${body.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => {
                response.json();
                fetchingAdminBooks();
            })
            .then(data => {
                console.log(data);
            });
    }

    const fetchingCategoriesList = (categories) => {
        fetch(`http://localhost:8081/category/ids?ids=${categories}`)
            .then(response => response.json())
            .then(data => {
                setBookItemCategoriesList(data);
            })
    }

    const fetchingAuthorsList = (authors) => {
        fetch(`http://localhost:8081/author/ids?ids=${authors}`)
            .then(response => response.json())
            .then(data => {
                setBookItemAuthorsList(data);
            })
    }

    const fetchingPublishersList = (publishers) => {
        fetch(`http://localhost:8081/publishing/ids?ids=${publishers}`)
            .then(response => response.json())
            .then(data => {
                setBookItemPublishersList(data);
            });
    }

    const fetchingBookItem = (id) => {
        fetch(`http://localhost:8081/book/${id}`)
            .then(response => response.json())
            .then(data => {
                setBookItem(data);

                fetchingAuthorsList(data.authors);
                fetchingCategoriesList(data.categories);

                if (data.publishers !== null) {
                    fetchingPublishersList(data.publishers);
                }
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! ${error}` , "error");
            })
    }

    // authors context
    const [authorConsiderationBooks, setAuthorConsiderationBooks] = useState([]);
    const [authorGoodBooks, setAuthorGoodBooks] = useState([]);
    const [authorBadBooks, setAuthorBadBooks] = useState([]);

    const fetchingAuthorBooks = (id, user, status) => {
        fetch(`http://localhost:8081/book/${user}/${id}/${status}`)
            .then(response => response.json())
            .then(data => {
                if (status === "CONSIDERATION") {
                    setAuthorConsiderationBooks(data);
                } else if (status === "GOOD") {
                    setAuthorGoodBooks(data);
                } else {
                    setAuthorBadBooks(data);
                }
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! with author data` , "error");
            })
    }

    const fetchingNews = () => {
        setLoading(true);

        fetch("https://newsapi.org/v2/everything?q=literature&apiKey=892dcecff8bd4d2982d26aea2b850e57")
            .then(response => response.json())
            .then(data => {
                setNewsItems(data.articles);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.log("news error");
            });
    }

    const [purchasedBooks, setPurchasedBooks] = useState([]);

    const fetchingPurchasedBooks = () => {
        let userData = JSON.parse(localStorage.getItem("userData"));

        if (userData) {
            fetch(`http://localhost:8081/shopping/id?id=${userData.id}`)
                .then(response => response.json())
                .then(data => {
                    setPurchasedBooks(data);
                });
        }
    }

    useEffect(() => {
        fetchingAllCategories();
        fetchingNews();
        fetchingPurchasedBooks();

        setSearchingItems([ ...searchingItems1, ...searchingItems2 ]);
    }, [searchingItems1, searchingItems2]);

    return (
        <ItemsContext.Provider
            value={{
                searchingItems: searchingItems,
                fetchingBookItem: fetchingBookItem,
                fetchingAddingBookItem: fetchingAddingBookItem,
                fetchingChangingBookItem: fetchingChangingBookItem,
                fetchingDownloadBook: fetchingDownloadBook,
                fetchingSearchingItems: fetchingSearchingItems,
                fetchingDeletingBookItem: fetchingDeletingBookItem,
                bookItem: bookItem,
                bookItemCategoriesList: bookItemCategoriesList,
                bookItemAuthorsList: bookItemAuthorsList,
                bookItemPublishersList: bookItemPublishersList,
                fetchingAuthorBooks: fetchingAuthorBooks,
                fetchingPurchasedBooks: fetchingPurchasedBooks,
                purchasedBooks: purchasedBooks,
                authorConsiderationBooks: authorConsiderationBooks,
                authorGoodBooks: authorGoodBooks,
                authorBadBooks: authorBadBooks,
                booksCategories: booksCategories,
                fetchingCategoryBooks: fetchingCategoryBooks,
                fetchingAllCategories: fetchingAllCategories,
                fetchingAdminBooks: fetchingAdminBooks,
                fetchingUnlockBook: fetchingUnlockBook,
                adminBooks: adminBooks,
                categoryBooks: categoryBooks,
                categoriesForSelect: categoriesForSelect,
                newsItems: newsItems,
                loading: loading,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsContext;