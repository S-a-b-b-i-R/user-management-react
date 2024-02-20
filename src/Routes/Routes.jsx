import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Error from "../Components/Error/Error";
import UserTable from "../Components/UserTable/UserTable";
import MongoTable from "../Components/UserTable/MongoTable";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: "/json",
                element: <UserTable />,
            },
            {
                path: "/mongodb",
                element: <MongoTable />,
            },
        ],
    },
]);

export default Routes;
