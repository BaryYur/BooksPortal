import { useContext, useEffect, useState } from "react";

import AdminMainContext from "../admin-context/admin-main-context";

import { useNavigate, useParams } from "react-router-dom";

import UsersList from "../admin-components/UsersList/UsersList";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./AdminStartingPage.css";

const AdminStartingPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    let page = Number(params.number);
    const { usersList } = useContext(AdminMainContext);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [userPagesCounter, setUserPagesCounter] = useState(1);

    const [counter, setCounter] = useState(0);

    const currentUsersHandler = () => {
        setCurrentUsers([]);

        for (let i = 0; i < usersList.length; i++) {
            if (i + 1 > (page * 10) - 10 && i + 1 <= page * 10) {
                setCurrentUsers(prevItem => {
                    return [...prevItem, usersList[i]];
                });
            }
        }

        let usersCounter = usersList.length / 10;
        setUserPagesCounter(Math.round(usersCounter) + 1);
        setCounter((usersList.length / 10) + 1);
    }

    useEffect(() => {
        currentUsersHandler();
    }, [params.number, usersList]);

    return (
        <div className="admin-page-wrapper">
            <h1>Registered users</h1>
            <div>
                <UsersList usersData={currentUsers} />
                {counter > 2 && (
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