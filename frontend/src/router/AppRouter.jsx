import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageNotFound } from "../pages/PageNotFound";
import { ErrorPage } from "../pages/ErrorPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { ProtectRoute } from "./ProtectRoute";
import { TasksList } from "../pages/TasksList";
import { Navbar } from "../components/Navbar";

export function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoute>
              <TasksList />
            </ProtectRoute>
          ),
        },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
    { path: "*", element: <PageNotFound /> },
  ]);

  return <RouterProvider router={router} />;
}
