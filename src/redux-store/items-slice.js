import { createSlice } from "@reduxjs/toolkit";

const bookItemsSlice = createSlice({
    name: "bookItems",
    initialState: {
        booksGenres: [],
    },
    reducers: {
        fetchingBooksGenres: (state) => {
            fetch(`http://localhost:8081/genre`)
                .then(response => response.json())
                .then(data => {
                    // state.booksGenres = [...state.booksGenres, ...data];
                    // console.log(state.booksGenres)
                })
                .catch(error => {
                    // console.log(error);
                })
        }
    },
});

export const { fetchingBooksGenres } = bookItemsSlice.actions;

export default bookItemsSlice.reducer;