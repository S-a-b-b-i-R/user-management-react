import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Error/Error";
import UserTable from "../Components/UserTable/UserTable";
import MongoTable from "../Components/UserTable/MongoTable";
import UserDetail from "../Pages/UserDetail";
import Header from "../Components/Header/Header";
import CreateUser from "../Pages/CreateUser";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/",
                element: <Header />,
            },
            {
                path: "/json",
                element: <UserTable />,
            },
            {
                path: "/mongodb",
                element: <MongoTable />,
            },
            {
                path: "/userdetail/:id",
                element: <UserDetail />,
            },
            {
                path: "/createuser",
                element: <CreateUser />,
            },
        ],
    },
]);

export default Routes;
