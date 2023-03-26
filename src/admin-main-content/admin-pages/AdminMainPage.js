import { AdminMainContextProvider } from "../admin-context/admin-main-context";

import AdminHomePage from "./AdminHomePage";

const AdminMainPage = () => {
    return (
        <AdminMainContextProvider>
            <AdminHomePage />
        </AdminMainContextProvider>
    );
}

export default AdminMainPage;