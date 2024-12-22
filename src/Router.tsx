import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { FaqPage } from "./pages/FaqPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { CreateAccountPage } from "./pages/CreateAccountPage";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import AdminLogin from "./pages/AdminLogin";
import EditPfas from "./pages/EditPfas";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login-superadmin",
        element: <Login />,
      },
      {
        path: "create-account",
        element: <CreateAccountPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      
      {
        path: "superadmin",
        element: <SuperAdminPanel />,
      },
      {
        path: "admin-login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <EditPfas/>,
      },
    ],
  },
]);
