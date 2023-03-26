import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

// import AuthContext from "./context/auth-context";

import MainPage from "./pages/MainPage";
import AdminMainPage from "./admin-main-content/admin-pages/AdminMainPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
    // const authCtx = useContext(AuthContext);

    return (
        <React.Fragment>
            <Routes>
                <Route path="/home/*" element={<MainPage />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                {/* {authCtx.isUserIsAdmin && <Route path="/admin/*" element={<AdminMainPage />} />}  */}
                <Route path="/admin/*" element={<AdminMainPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </React.Fragment>
    );
}

export default App;