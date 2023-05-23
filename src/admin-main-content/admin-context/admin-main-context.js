import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

const AdminMainContext = React.createContext({
    fetchingUpdateUserStatus: (id, status, email, name, password, role) => {},
    fetchingUsersList: () => {},
    fetchingCategories: () => {},
    fetchingSubcategories: (categoryId) => {},
    fetchingDeleteSubcategory: (subcategoryId) => {},
    fetchingAddingCategory: (body) => {},
    fetchingAddingSubcategory: (body) => {},
    fetchingDeleteCategory: (id) => {},
    fetchingChangingCategory: (id, name, newName) => {},
});

export const AdminMainContextProvider = ({ children }) => {
    const [usersList, setUsersList] = useState([]);
    const [adminLoading, setAdminLoading] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(JSON.parse(localStorage.getItem("menuIsOpen")));
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoriesForSelect, setCategoriesForSelect] = useState([]);
    const [subcategoriesList, setSubcategoriesList] = useState([]);
    const [categorySubcategoriesList, setCategorySubcategoriesList] = useState([]);

    const alert = (title, text, icon ) => {
        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            width: 460,
            height: 400,
        })
    }

    const handleMenu = () => setMenuIsOpen(active => !active);

    const fetchingUsersList = () => {
        fetch(`http://localhost:8081/user`)
            .then(response => response.json())
            .then(data => {
                setUsersList(data);
            })
            .catch(error => console.log(error))
    }

    const fetchingCategories = (categories) => {
        setAdminLoading(true);

        fetch(`http://localhost:8081/${categories}`)
            .then(response => response.json())
            .then(data => {
                if (categories === "genre") {
                    setCategoriesList(data);
                } else if (categories === "category") {
                    setSubcategoriesList(data);
                }

                setAdminLoading(false);
            })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong!", "error");
            });
    }

    const fetchingSubcategories = (categoryId) => {
        fetch(`http://localhost:8081/category/all/${categoryId}`)
            .then(response => response.json())
            .then(data => {
                setCategorySubcategoriesList([...data]);
                setAdminLoading(false);
            })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong!", "error");
            });
    }

    const fetchingDeleteSubcategory = (subcategoryId) => {
        fetch(`http://localhost:8081/category/${subcategoryId}`, {
            method: "DELETE",
        })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong!", "error");
            });
    }

    const fetchingSelectCategories = () => {
        fetch(`http://localhost:8081/category`)
            .then(response => response.json())
            .then(data => {
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
            });
    }

    const fetchingAddingCategory = (body)  => {
        setAdminLoading(true);

        fetch(`http://localhost:8081/genre`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setAdminLoading(false);
                    alert("Great", "You successful add new category","success");

                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }
        })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong!", "error");
            })
    }

    const fetchingAddingSubcategory = (body)  => {
        setAdminLoading(true);

        fetch(`http://localhost:8081/category`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setAdminLoading(false);
                    alert("Great", "You successful add new category","success");

                    return res.json();
                } else {
                    return res.json().then((data) => {
                        let errorMessage = "Adding failed!";

                        throw new Error(errorMessage);
                    });
                }
            })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong!", "error");
            })
    }

    const fetchingChangingCategory = async (id, name, newName, image) => {
       await fetch(`http://localhost:8081/genre/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: newName,
                file: image,
            }),
        })
            .then(response => {
                if (response.ok) fetchingCategories("genre");
            })
            .catch(error => {
                setAdminLoading(false);

                alert("Oops...", "Something went wrong! changing", "error");
            })
    }

    const fetchingDeleteCategory = async (id) => {
        await  fetch(`http://localhost:8081/genre/${id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) fetchingCategories("genre");
            })
            .catch(error => {
                alert("Oops...", "Something went wrong!", "error");
            })
    }

    const fetchingUpdateUserStatus = async (id, status, email, name, password, role) => {
        await fetch(`http://localhost:8081/user/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                name: name,
                password: password,
                role: role,
                status: status,
            }),
        })
            .then(response => {
                if (response.ok) fetchingUsersList();
            })
            .catch(error => {
                alert("Oops...", "Something went wrong!", "error");
            })
    }

    useEffect(() => {
        fetchingUsersList();
        fetchingSelectCategories();

        if (!JSON.parse(localStorage.getItem("menuIsOpen"))) {
            localStorage.setItem("menuIsOpen", JSON.stringify(false));
        }

        localStorage.setItem("menuIsOpen", JSON.stringify(menuIsOpen));
    }, [menuIsOpen])

    return (
        <AdminMainContext.Provider
            value={{
                menuIsOpen: menuIsOpen,
                adminLoading: adminLoading,
                openMenu: handleMenu,
                usersList: usersList,
                fetchingUsersList: fetchingUsersList,
                fetchingUpdateUserStatus: fetchingUpdateUserStatus,
                fetchingCategories: fetchingCategories,
                fetchingAddingCategory: fetchingAddingCategory,
                fetchingAddingSubcategory: fetchingAddingSubcategory,
                fetchingSubcategories: fetchingSubcategories,
                fetchingDeleteSubcategory: fetchingDeleteSubcategory,
                fetchingDeleteCategory: fetchingDeleteCategory,
                fetchingChangingCategory:fetchingChangingCategory,
                categories: categoriesList,
                subcategories: subcategoriesList,
                categorySubcategories: categorySubcategoriesList,
                categoriesForSelect: categoriesForSelect,
            }}
        >
            {children}
        </AdminMainContext.Provider>
    );
}

export default AdminMainContext;