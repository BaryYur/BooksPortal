import React, { useEffect, useState } from "react";

import Swal from "sweetalert2";

const DUMMY__SEARCHING__ITEMS = [
    {
        id: "id1",
        name: "String 1 string string string stringstringstringstring",
        category: "Category 1",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id2",
        name: "String 2",
        category: "Category 2",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id3",
        name: "String 3",
        category: "Category 1",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id4",
        name: "String 4",
        category: "Category 4",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id5",
        name: "String 5",
        category: "Category 5",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id6",
        name: "String 6",
        category: "Category 2",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id7",
        name: "String 7",
        category: "Category 2",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id8",
        name: "String 8",
        category: "Category 2",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id9",
        name: "String 9",
        category: "Category 3",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id10",
        name: "String 10",
        category: "Category 4",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id11",
        name: "String 11",
        category: "Category 3",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id12",
        name: "String 12",
        category: "Category 5",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
    {
        id: "id13",
        name: "String 13",
        category: "Category 5",
        price: 40,
        description: "item description",
        authors: [{ id: Math.random, name: "First author" }],
        publisher: "pub 1",
        publishDate: "11-11-1111",
        pages: 100,
        language: "English"
    },
];

const ItemsContext = React.createContext({
    fetchingBookItem: (id, category) => {},
    fetchingAddingBookItem: (body) => {},
    searchingItemsFetch: (book) => {},
    fetchingGenreBooks: (genreName) => {},
    fetchingAllCategories: () => {},
});

export const ItemsContextProvider = ({ children }) => {
    const [searchingItems, setSearchingItems] = useState(DUMMY__SEARCHING__ITEMS);
    const [booksGenres, setBooksGenres] = useState([]);
    const [genreBooks, setGenreBooks] = useState([]);
    const [bookItem, setBookItem] = useState({});
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

        fetch(`http://localhost:8081/genre`)
            .then(response => response.json())
            .then(data => {
                setBooksGenres(data);
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

                setLoading(false);
            })
            .catch(error => {
                // console.log(error);
                setLoading(false);
            })
    }

    const fetchingGenreBooks = (genreName) => {
        fetch(`http://localhost:8081/genre/${genreName}`)
            .then(response => response.json())
            .then(data => {
                setGenreBooks(data);
            })
            .catch(error => console.log(error))
    }

    const searchingItemsFetch = (id) => {
        setSearchingItems(searchingItems.filter(s => s.id !== id));

        console.log("searching");

        // fetch("")
        //     .then(response => response.json())
        //     .then(data => {
        //         // setSearchingItems(data.entries);
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error))
    }

    const fetchingBookItem = (id, category) => {
        // fetch("https://")
        //     .then(response => response.json())
        //     .then(data => {
        //         setSearchingItems(data.entries);
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error))

        for (let item of searchingItems) {
            if (id === item.id) {
                setBookItem(item);
            }
        }
    }

    const fetchingAddingBookItem = (body) => {
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
            .catch(error => {
                alert("Oops...", `Something went wrong! ${error}` , "error");
            })
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
        // fetchingNews();
        // console.log(Dotenv.MAIN_PATH);
    }, [])

    return (
        <ItemsContext.Provider
            value={{
                searchingItems: searchingItems,
                fetchingBookItem: fetchingBookItem,
                fetchingAddingBookItem: fetchingAddingBookItem,
                searchingItemsFetch: searchingItemsFetch,
                bookItem: bookItem,
                booksGenres: booksGenres,
                fetchingGenreBooks: fetchingGenreBooks,
                fetchingAllCategories: fetchingAllCategories,
                genreBooks: genreBooks,
                categoriesForSelect: categoriesForSelect,
                loading: loading,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsContext;