import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../layout/Home";
import Login from "../pages/Login/Login";
import ErrorPage from "../pages/ErrorPage";
import Registration from "../pages/Register/Register";
import Register from "../pages/Register/Register";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: '/login',
            element: <Login/>
        },
        {
            path: '/register',
            element: <Register/>
        }
      ]
    },
    {
        path: '/*',
        element: <ErrorPage/>
    }
  ]);

  export default router;