import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import UsersList from "../admin-components/UsersList/UsersList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./AdminStartingPage.css";

const DUMMY_USERS = [
    {
        name: "User",
        lastName: "First",
        phoneNumber: "3805367344",
        email: "test1@test.com",
    },
    {
        name: "User",
        lastName: "Second",
        phoneNumber: "3805367344",
        email: "test2@test.com",
    },
    {
        name: "User",
        lastName: "Third",
        phoneNumber: "3805367344",
        email: "test3@test.com",
    },
    {
        name: "User",
        lastName: "Fourth",
        phoneNumber: "3805367344",
        email: "test4@test.com",
    },
    {
        name: "User",
        lastName: "Fifth",
        phoneNumber: "3805367344",
        email: "test5@test.com",
    },
    {
        name: "User",
        lastName: "Sixth",
        phoneNumber: "3805367344",
        email: "test6@test.com",
    },
    {
        name: "User",
        lastName: "Seven",
        phoneNumber: "3805367344",
        email: "test7@test.com",
    },
    {
        name: "User",
        lastName: "Eight",
        phoneNumber: "3805367344",
        email: "test8@test.com",
    },
    {
        name: "User",
        lastName: "Ninth",
        phoneNumber: "3805367344",
        email: "test9@test.com",
    },
    {
        name: "User",
        lastName: "Ten",
        phoneNumber: "3805367344",
        email: "test10@test.com",
    },
    {
        name: "User",
        lastName: "Eleventh",
        phoneNumber: "3805367344",
        email: "test11@test.com",
    },
    {
        name: "User",
        lastName: "Twelve",
        phoneNumber: "3805367344",
        email: "test12@test.com",
    },
];

const AdminStartingPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    let page = Number(params.number);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [userPagesCounter, setUserPagesCounter] = useState(1);

    useEffect(() => {
        let users = DUMMY_USERS;
        setCurrentUsers([]);

        for (let i = 0; i < users.length; i++) {
            if (i + 1 > (page * 10) - 10 && i + 1 <= page * 10) {
                setCurrentUsers(prevItem => {
                    return [...prevItem, users[i]];
                });
            }
        }

        let counter = users.length / 10;
        setUserPagesCounter(Number(counter.toString().split(".")[0]) + 1);
    }, [params.number])

    return (
        <div className="admin-page-wrapper">
            <h1>Registered users</h1>
            <div>
                <UsersList usersData={currentUsers} />
                {userPagesCounter > 1 && (
                    <Stack spacing={2} className="pagination-stack">
                        <Pagination
                            count={userPagesCounter}
                            page={page}
                            shape="rounded"
                            color="primary"
                            onChange={(e, value) => {
                                navigate(`/admin/starting/page/${value}`);
                                document.querySelector(".admin-main-wrapper").scrollTop = 0;
                                document.documentElement.scrollTop = 0;
                            }}
                        />
                    </Stack>
                )}
            </div>
        </div>
    );
}

export default AdminStartingPage;