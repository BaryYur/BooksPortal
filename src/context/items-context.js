import React, { useEffect, useState } from "react";

const ItemsContext = React.createContext({});

const DUMMY__SEARCHING__ITEMS = [
    {
        id: "id1",
        name: "String 1 string string string stringstringstringstring",
        category: "Category 1",
        price: 40,
    },
    {
        id: "id2",
        name: "String 2",
        category: "Category 2",
        price: 40,
    },
    {
        id: "id3",
        name: "String 3",
        category: "Category 1",
        price: 40,
    },
    {
        id: "id4",
        name: "String 4",
        category: "Category 4",
        price: 40,
    },
    {
        id: "id5",
        name: "String 5",
        category: "Category 5",
        price: 40,
    },
    {
        id: "id6",
        name: "String 6",
        category: "Category 2",
        price: 40,
    },
    {
        id: "id7",
        name: "String 7",
        category: "Category 2",
        price: 40,
    },
    {
        id: "id8",
        name: "String 8",
        category: "Category 2",
        price: 40,
    },
    {
        id: "id9",
        name: "String 9",
        category: "Category 3",
        price: 40,
    },
    {
        id: "id10",
        name: "String 10",
        category: "Category 4",
        price: 40,
    },
    {
        id: "id11",
        name: "String 11",
        category: "Category 3",
        price: 40,
    },
    {
        id: "id12",
        name: "String 12",
        category: "Category 5",
        price: 40,
    },
    {
        id: "id13",
        name: "String 13",
        category: "Category 5",
        price: 40,
    },
];

export const ItemsContextProvider = ({ children }) => {
    const [searchingItems, setSearchingItems] = useState(DUMMY__SEARCHING__ITEMS);

    const searchingItemsFetch = () => {
        // fetch("https://")
        //     .then(response => response.json())
        //     .then(data => {
        //         setSearchingItems(data.entries);
        //         console.log(data);
        //     })
        //     .catch(error => console.log(error))
    }

    useEffect(() => {
        searchingItemsFetch();
    }, [])

    return (
        <ItemsContext.Provider
            value={{
                searchingItems: searchingItems,
            }}
        >
            {children}
        </ItemsContext.Provider>
    );
}

export default ItemsContext;