import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

// const DUMMY__SEARCHING__ITEMS = [
//     {
//         id: "id1",
//         name: "String 1 string string string stringstringstringstring",
//         category: "Category 1",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English",
//         status: false,
//     },
//     {
//         id: "id2",
//         name: "String 2",
//         category: "Category 2",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id3",
//         name: "String 3",
//         category: "Category 1",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id4",
//         name: "String 4",
//         category: "Category 4",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id5",
//         name: "String 5",
//         category: "Category 5",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id6",
//         name: "String 6",
//         category: "Category 2",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id7",
//         name: "String 7",
//         category: "Category 2",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id8",
//         name: "String 8",
//         category: "Category 2",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id9",
//         name: "String 9",
//         category: "Category 3",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id10",
//         name: "String 10",
//         category: "Category 4",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id11",
//         name: "String 11",
//         category: "Category 3",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id12",
//         name: "String 12",
//         category: "Category 5",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
//     {
//         id: "id13",
//         name: "String 13",
//         category: "Category 5",
//         price: 40,
//         description: "item description",
//         authors: [{ id: Math.random, name: "First author" }],
//         publisher: "pub 1",
//         publishDate: "11-11-1111",
//         pages: 100,
//         language: "English"
//     },
// ];

const ItemsContext = React.createContext({
    fetchingBookItem: (id, category) => {},
    fetchingAddingBookItem: (body) => {},
    fetchingSearchingItems: (book) => {},
    fetchingDeletingBookItem: () => {},
    fetchingCategoryBooks: (genreName) => {},
    fetchingAllCategories: () => {},
    fetchingUnlockBook: (id) => {},
    fetchingAdminBooks: () => {},
});

export const ItemsContextProvider = ({ children }) => {
    const [searchingItems, setSearchingItems] = useState([]);
    const [booksCategories, setBooksCategories] = useState([]);
    const [categoryBooks, setCategoryBooks] = useState([]);
    const [bookItem, setBookItem] = useState({});
    const [adminBooks, setAdminBooks] = useState([]);
    const [categoriesForSelect, setCategoriesForSelect] = useState([]);
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

        fetch("http://localhost:8081/category")
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
        fetch(`http://localhost:8081/book/category/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                setCategoryBooks(data);
            })
            .catch(error => {
                alert("Oops...", `Something went wrong!` , "error");
            })
    }

    const fetchingSearchingItems = async (bookName) => {
        setLoading(true);

        await  fetch(`http://localhost:8081/book/all/${bookName}`)
            .then(response => response.json())
            .then(data => {
                setSearchingItems(data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                alert("Oops...", `Something went wrong!` , "error");
            });
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
                }
            })
            .catch(error => {
                alert("Oops...", `Something went wrong` , "error");
            });
    }

    const fetchingBookItem = (id) => {
        fetch(`http://localhost:8081/book/${id}`)
            .then(response => response.json())
            .then(data => {
                setBookItem(data);
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! ${error}` , "error");
            })
    }

    const attachmentFileHandler = (id, file) => {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("file", file);

        fetch("http://localhost:8081/attachment", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    return console.log("attachment error ", res);
                }
            })
            .catch(error => {
                console.log("attachment error ", error);
                // alert("Oops...", `Something went wrong! ${error}` , "error");
            });
    }

    const fetchingAddingBookItem = (body, bookFile) => {
        fetch("http://localhost:8081/book", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    alert("Great", "You successful add new book","success");

                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .then(data => {
                console.log(data);
                attachmentFileHandler(data.id, bookFile);
            })
            .catch(error => {
                alert("Oops...", `Something went wrong! ${error}` , "error");
            })
    }

    const fetchingAdminBooks = () => {
        fetch("http://localhost:8081/book/status/false")
            .then(response => response.json())
            .then(data => {
                console.log("unlock ", data);
                setAdminBooks(data);
            });
    }

    const fetchingUnlockBook = (body, bookName) => {
        fetch(`http://localhost:8081/book/${body.id}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(() => {
                fetchingSearchingItems(bookName);
                fetchingAdminBooks();
            });
    }

    // const fetchingNews = () => {
        // fetch("https://newsapi.org/v2/everything?q=Apple&from=2023-04-13&sortBy=popularity&apiKey=4269e448034e451d86c8fa22f9780efe")
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log(data);
        //     })
    // }

    useEffect(() => {
        // searchingItemsFetch();
        fetchingAllCategories();
        console.log(booksCategories)
        // fetchingNews();
        // console.log(Dotenv.MAIN_PATH);
    }, [])

    return (
        <ItemsContext.Provider
            value={{
                searchingItems: searchingItems,
                fetchingBookItem: fetchingBookItem,
                fetchingAddingBookItem: fetchingAddingBookItem,
                fetchingSearchingItems: fetchingSearchingItems,
                fetchingDeletingBookItem: fetchingDeletingBookItem,
                bookItem: bookItem,
                booksCategories: booksCategories,
                fetchingCategoryBooks: fetchingCategoryBooks,
                fetchingAllCategories: fetchingAllCategories,
                fetchingAdminBooks: fetchingAdminBooks,
                fetchingUnlockBook: fetchingUnlockBook,
                adminBooks: adminBooks,
                categoryBooks: categoryBooks,
                categoriesForSelect: categoriesForSelect,
                loading: loading,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsContext;