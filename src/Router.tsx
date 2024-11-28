import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { CreateAccount } from "./pages/CreateAccount";
import { AdminPanel } from "./pages/AdminPanel";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <NotFoundPage/>,
    children: [
        {
            index: true,
            element: <Home />
        },
        {
            path: "login",
            element: <Login />
        },
        {
            path: "create-account",
            element: <CreateAccount />
        },
        {
            path: "admin",
            element: <AdminPanel />
        },
    ],
    
},
]);