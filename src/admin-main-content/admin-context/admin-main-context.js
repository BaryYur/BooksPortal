import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

import cImg from "../../images/adventure-books-cover.png";
import dImg from "../../images/6204107.png";

const AdminMainContext = React.createContext({
    fetchingAddingCategory: (body) => {},
    fetchingDeleteCategory: (id, name) => {},
    fetchingChangingCategory: (id, name, newName) => {},
});

export const AdminMainContextProvider = ({ children }) => {
    const [adminLoading, setAdminLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(JSON.parse(localStorage.getItem("menuIsOpen")));
    const [categoriesList, setCategoriesList] = useState([{ name: "adventure", img: cImg }, { name: "detective", img: dImg }]);

    const handleMenu = () => {
        setMenuIsOpen(active => !active);
    }

    const fetchingCategories = () => {
        setAdminLoading(true);

        fetch("https://.../categories")
            .then(response => response.json())
            .then(data => {
                setCategoriesList(data);
                setAdminLoading(false);
            })
            .catch(error => {
                setAdminLoading(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    width: 460,
                    height: 400,
                })
            })
    }

    const fetchingAddingCategory = (body)  => {
        setAdminLoading(true);

        fetch("https://.../categories", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setAdminLoading(false);
                    // fetchingCategoryData(category);
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }

                Swal.fire({
                    title: "Great",
                    text: "You successful add new category",
                    icon: "success",
                    width: 460,
                    height: 400,
                })

                setSuccess(true);
        })
            .catch(error => {
                setAdminLoading(false);
                setSuccess(false);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    width: 460,
                    height: 400,
                })
            })

        return success;
    }

    const fetchingChangingCategory = (id, name, newName) => {
        for (let item of categoriesList) {
            if (item.name === name) {
                item.name = newName;
            }
        }
    }

    const fetchingDeleteCategory = (id, name) => {
        setCategoriesList(categoriesList.filter(c => c.name !== name));
        console.log("delete ", name);
    }

    useEffect(() => {
        // fetchingCategories();

        if (!JSON.parse(localStorage.getItem("menuIsOpen"))) {
            localStorage.setItem("menuIsOpen", JSON.stringify(false));
        }

        localStorage.setItem("menuIsOpen", JSON.stringify(menuIsOpen));
    }, [menuIsOpen, categoriesList])

    return (
        <AdminMainContext.Provider
            value={{
                menuIsOpen: menuIsOpen,
                adminLoading: adminLoading,
                openMenu: handleMenu,
                fetchingAddingCategory: fetchingAddingCategory,
                fetchingDeleteCategory: fetchingDeleteCategory,
                fetchingChangingCategory:fetchingChangingCategory,
                categories: categoriesList,
            }}
        >
            {children}
        </AdminMainContext.Provider>
    );
}

export default AdminMainContext;