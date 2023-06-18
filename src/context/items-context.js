import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

const ItemsContext = React.createContext({
    fetchingBookItem: (id, category) => {},
    fetchingAddingBookItem: (body, bookFile) => {},
    fetchingChangingBookItem: (body, bookFile) => {},
    fetchingDownloadBook: (bookId) => {},
    fetchingSearchingItems: (book) => {},
    fetchingFilteringSearching: () => {},
    fetchingDeletingBookItem: () => {},
    fetchingCategoryBooks: (genreName) => {},
    fetchingAllSubcategories: () => {},
    fetchingSubcategories: (categoryId) => {},
    fetchingCategories: () => {},
    fetchingUnlockBook: (id) => {},
    fetchingAdminBooks: () => {},
    fetchingAuthorBooks: (id, status) => {},
    fetchingAuthorsList: (ids) => {},
    fetchingPublishersList: (ids) => {},
    fetchingCategoriesList: (ids) => {},
    fetchingPurchasedBooks: () => {},
    fetchingPurchaseMessages: (authorData) => {},
});

export const ItemsContextProvider = ({ children }) => {
    const [searchingItems, setSearchingItems] = useState([]);
    const [searchingItems1, setSearchingItems1] = useState([]);
    const [searchingItems2, setSearchingItems2] = useState([]);
    const [booksCategories, setBooksCategories] = useState([]);
    const [booksSubcategories, setBooksSubcategories] = useState([]);
    const [categorySubcategories, setCategorySubcategories] = useState([]);
    const [categoryBooks, setCategoryBooks] = useState([]);
    const [bookItemCategoriesList, setBookItemCategoriesList] = useState([]);
    const [bookItemAuthorsList, setBookItemAuthorsList] = useState([]);
    const [bookItemPublishersList, setBookItemPublishersList] = useState([]);
    const [bookItem, setBookItem] = useState({});
    const [adminBooks, setAdminBooks] = useState([]);
    const [categoriesForSelect, setCategoriesForSelect] = useState([]);
    const [counterPurchaseMessages,setCounterPurchaseMessages] = useState(0);
    const [purchaseMessages, setPurchaseMessages] = useState([]);
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

    const fetchingAllSubcategories = () => {
        setLoading(true);

        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
                if (data !== []) {
                    setBooksSubcategories(data);
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

    const fetchingCategories = () => {
        setLoading(true);

        fetch(`http://localhost:8081/genre`)
            .then(response => response.json())
            .then(data => {
                if (data !== []) {
                    setBooksCategories(data);
                }

                setLoading(false);
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
            })
    }

    const fetchingSubcategories = (categoryId) => {
        setLoading(true);

        fetch(`http://localhost:8081/category/all/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                if (data !== []) {
                    setCategorySubcategories(data);
                }

                setLoading(false);
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
            })
    }

    const fetchingCategoryBooks = (categoryId, params) => {
        setLoading(true);
        setCategoryBooks([]);

        let categoriesIds = [categoryId];

        const getAuthorsIds = (url) => {
            const searchParams = new URLSearchParams(url.substring(url.indexOf("?") + 1));
            const authors = [];

            for (const [key, value] of searchParams.entries()) {
                if (key === "authors") {
                    authors.push(value);
                }
            }

            return authors;
        }

        let authorsIds = getAuthorsIds(params);

        const getMinMaxPricesFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minPrice = searchParams.get("minPrice");
            const maxPrice = searchParams.get("maxPrice");

            return {
                minPrice: minPrice ? parseFloat(minPrice) : 0,
                maxPrice: maxPrice ? parseFloat(maxPrice) : 0,
            }
        }

        const getMinMaxYearsFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minYear = searchParams.get("minYear");
            const maxYear = searchParams.get("maxYear");

            return {
                minYear: minYear ? parseFloat(minYear) : 0,
                maxYear: maxYear ? parseFloat(maxYear) : 0
            }
        }

        let prices = {
            minPrice: 0,
            maxPrice: 0,
        }

        let years = {
            minYear: 0,
            maxYear: 0,
        }

        if (params) {
            prices = getMinMaxPricesFromUrlString(params);
            years = getMinMaxYearsFromUrlString(params);
        }

        if (params !== "") {
            fetch(`http://localhost:8081/book/category/${categoryId}/GOOD`)
                .then(response => response.json())
                .then(books => {
                    let booksIds = [];
                    let booksPrices = [];
                    let booksYears = [];

                    for (let book of books) {
                        booksIds.push(book.id);
                        booksPrices.push(book.price);
                        booksYears.push(book.publishDate);
                    }

                    let minP = 0;
                    let maxP = 0;
                    let minY = 0;
                    let maxY = 0;

                    if (prices.maxPrice === 0 && prices.minPrice === 0) {
                        minP = Math.min(...booksPrices);
                        maxP = Math.max(...booksPrices);
                    } else {
                        minP = prices.minPrice;
                        maxP = prices.maxPrice;
                    }

                    if (years.minYear == 0 && years.maxYear === 0) {
                        minY = Math.min(...booksYears);
                        maxY = Math.max(...booksYears);
                    } else {
                        minY = years.minYear;
                        maxY = years.maxYear;
                    }

                    let authorsIds2 = [];

                    if (authorsIds.length === 0) {
                        let arr = [];

                        for (let book of books) {
                            arr.push(...book.authors);
                        }

                        authorsIds2 = [...new Set(arr)];
                    } else {
                        authorsIds2 = authorsIds;
                    }

                    let filteringPath = `http://localhost:8081/book/filter?authors=${authorsIds2}&books=${booksIds}&category=${categoriesIds}&maxPrice=${maxP}&maxYear=${maxY}&minPrice=${minP}&minYear=${minY}`;

                    fetch(filteringPath)
                        .then(response => response.json())
                        .then(data => {
                            setLoading(false);
                            setCategoryBooks(data);
                        })
                        .catch(error => {
                            setLoading(false);
                            alert("Oops...", `Something went wrong filtering` , "error");
                        });
                })
                .catch(error => {
                    setLoading(false);
                    alert("Oops...", `Something went wrong!` , "error");
                });
        } else if (params === "") {
            fetch(`http://localhost:8081/book/category/${categoryId}/GOOD`)
                .then(response => response.json())
                .then(data => {
                    setCategoryBooks(data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    alert("Oops...", `Something went wrong!` , "error");
                });
        }
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

    const [searchingFilteringItems, setSearchingFilteringItems] = useState([]);

    const fetchingFilteringSearching = (params) => {
        setLoading(true);
        let authorsIds = [];
        let categoriesIds = [];

        const urlParams = new URLSearchParams(params.substring(params.indexOf("?") + 1));
        categoriesIds = urlParams.getAll("category");
        authorsIds = urlParams.getAll("authors");

        let searchingText = "";

        const extractText = (urlString) => {
            const regex = /text=([^&/]+)/;
            const match = urlString.match(regex);

            if (match) {
                const decodedText = decodeURIComponent(match[1]);
                return decodedText;
            }

            return null;
        }

        searchingText = extractText(params.toString());

        const getMinMaxPricesFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minPrice = searchParams.get("minPrice");
            const maxPrice = searchParams.get("maxPrice");

            return {
                minPrice: minPrice ? parseFloat(minPrice) : 0,
                maxPrice: maxPrice ? parseFloat(maxPrice) : 0,
            }
        }

        const getMinMaxYearsFromUrlString = (urlString) => {
            const url = new URL(urlString);
            const searchParams = url.searchParams;

            const minYear = searchParams.get("minYear");
            const maxYear = searchParams.get("maxYear");

            return {
                minYear: minYear ? parseFloat(minYear) : 0,
                maxYear: maxYear ? parseFloat(maxYear) : 0
            }
        }

        let prices = getMinMaxPricesFromUrlString(params);
        let years = getMinMaxYearsFromUrlString(params);

        if (params[params.length - 2] + params[params.length - 1] === "/1") {
            fetch(`http://localhost:8081/book/all/${searchingText}/GOOD`)
                .then(response => response.json())
                .then(data => {
                    setSearchingFilteringItems(data);
                    setSearchingItems(data);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    alert("Oops...", `Something went wrong!` , "error");
                });
        } else {
            setTimeout(() => {
                fetch(`http://localhost:8081/book/all/${searchingText}/GOOD`)
                    .then(response => response.json())
                    .then(data => {
                        let ids = [];
                        let booksPrices = [];
                        let booksYears = [];

                        for (let book of data) {
                            ids.push(book.id);
                            booksPrices.push(book.price);
                            booksYears.push(book.publishDate);
                        }

                        let minP = 0;
                        let maxP = 0;
                        let minY = 0;
                        let maxY = 0;

                        if (prices.maxPrice === 0 && prices.minPrice === 0) {
                            minP = Math.min(...booksPrices);
                            maxP = Math.max(...booksPrices);
                        } else {
                            minP = prices.minPrice;
                            maxP = prices.maxPrice;
                        }

                        if (years.minYear === 0 && years.maxYear === 0) {
                            minY = Math.min(...booksYears);
                            maxY = Math.max(...booksYears);
                        } else {
                            minY = years.minYear;
                            maxY = years.maxYear;
                        }

                        setSearchingItems(data);

                        let authorsIds2 = [];
                        let categoriesIds2 = [];

                        if (authorsIds.length === 0) {
                            let arr = [];

                            for (let book of data) {
                                arr.push(...book.authors);
                            }

                            authorsIds2 = [...new Set(arr)];
                        } else {
                            authorsIds2 = authorsIds;
                        }

                        if (categoriesIds.length === 0) {
                            let arr = [];

                            for (let book of data) {
                                arr.push(...book.categories);
                            }

                            categoriesIds2 = [...new Set(arr)];
                        } else {
                            categoriesIds2 = categoriesIds;
                        }

                        // console.log(
                        //     'minP', minP, 'maxP', maxP,
                        //     'minY', minY, 'maxY', maxY,
                        //     'authors', authorsIds2, 'categories', categoriesIds2
                        // );

                        let path = `http://localhost:8081/book/filter?authors=${authorsIds2}&books=${ids}&category=${categoriesIds2}&maxPrice=${maxP}&maxYear=${maxY}&minPrice=${minP}&minYear=${minY}`;

                        fetch(path)
                            .then(response => response.json())
                            .then(data => {
                                setLoading(false);
                                setSearchingFilteringItems(data);
                            })
                            .catch(error => {
                                setLoading(false);
                                alert("Oops...", `Something went wrong filtering` , "error");
                            });
                    })
                    .catch(error => {
                        setLoading(false);
                        alert("Oops...", `Something went wrong!` , "error");
                    });
            }, 1000);
        }
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

    const fetchingSendMessage = (ownerId, ownerName) => {
        let body = {
            id: ownerId,
            name: ownerName,
        }

        fetch(`http://localhost:8081/mail/sendMessage/${ownerId}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(response => console.log(response))
            .then(data => {
                console.log("data");
            });
    }

    const fetchingUnlockBook = (body) => {
        if (body.authorId !== null && body.status === "GOOD") {
            fetch(`http://localhost:8081/author/${body.authorId}`)
                .then(response => response.json())
                .then(author => {
                    fetchingSendMessage(body.authorId, author.name);
                })
        } else if (body.publisherId !== null && body.status === "GOOD") {
            fetch(`http://localhost:8081/publishing/${body.publisherId}`)
                .then(response => response.json())
                .then(publisher => {
                    fetchingSendMessage(body.publisherId, publisher.name);
                })
        }

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
            });
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
        fetch(`http://localhost:8081/book/${user}/books/${id}/${status}`)
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

    // fetching author messages
    const fetchingPurchaseMessages = (authorData) => {
        if (authorData.role === "PUBLISHING") {
            fetch(`http://localhost:8081/publishing/user/${authorData.id}`)
                .then(response => response.json())
                .then(publisher => {
                    fetch(`http://localhost:8081/purchaseRequest/publisher/${publisher.id}`)
                        .then(response => response.json())
                        .then(purchaseReqs => {
                            setPurchaseMessages(purchaseReqs.reverse());
                            setCounterPurchaseMessages(purchaseReqs.length);
                        });
                });
        } else if (authorData.role === "AUTHOR") {
            fetch(`http://localhost:8081/author/user/${authorData.id}`)
                .then(response => response.json())
                .then(publisher => {
                    fetch(`http://localhost:8081/purchaseRequest/author/${publisher.id}`)
                        .then(response => response.json())
                        .then(purchaseReqs => {
                            setPurchaseMessages(purchaseReqs.reverse());
                            setCounterPurchaseMessages(purchaseReqs.length);
                        });
                });
        }
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
        fetchingNews();
        fetchingPurchasedBooks();
        fetchingAllSubcategories();

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
                fetchingFilteringSearching: fetchingFilteringSearching,
                fetchingDeletingBookItem: fetchingDeletingBookItem,
                fetchingAuthorsList: fetchingAuthorsList,
                fetchingPublishersList: fetchingPublishersList,
                fetchingCategoriesList: fetchingCategoriesList,
                fetchingCategories: fetchingCategories,
                categorySubcategories: categorySubcategories,
                fetchingSubcategories: fetchingSubcategories,
                bookItem: bookItem,
                bookItemCategoriesList: bookItemCategoriesList,
                bookItemAuthorsList: bookItemAuthorsList,
                bookItemPublishersList: bookItemPublishersList,
                fetchingAuthorBooks: fetchingAuthorBooks,
                fetchingPurchasedBooks: fetchingPurchasedBooks,
                fetchingPurchaseMessages: fetchingPurchaseMessages,
                counterPurchaseMessages: counterPurchaseMessages,
                purchaseMessages: purchaseMessages,
                purchasedBooks: purchasedBooks,
                authorConsiderationBooks: authorConsiderationBooks,
                authorGoodBooks: authorGoodBooks,
                authorBadBooks: authorBadBooks,
                booksSubcategories: booksSubcategories,
                booksCategories: booksCategories,
                fetchingCategoryBooks: fetchingCategoryBooks,
                fetchingAllCategories: fetchingAllSubcategories,
                fetchingAdminBooks: fetchingAdminBooks,
                fetchingUnlockBook: fetchingUnlockBook,
                adminBooks: adminBooks,
                categoryBooks: categoryBooks,
                categoriesForSelect: categoriesForSelect,
                newsItems: newsItems,
                loading: loading,
                searchingFilteringItems: searchingFilteringItems,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsContext;