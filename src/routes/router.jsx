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
import Queries from "../pages/Queries/Queries";
import RecommendationsForMe from "../pages/Recommendations-for-me/RecommendationsForMe";
import MyQueries from "../pages/My Queries/MyQueries";
import MyRecommendations from "../pages/MyRecommendations/MyRecommendations";
import PrivateRoute from './PrivateRoute';

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
        },
        {
          path: '/queries',
          element: <Queries/>
        },
        {
          path: '/recommendations-for-me',
          element: <PrivateRoute><RecommendationsForMe/></PrivateRoute>
        },
        {
          path: '/my-queries',
          element: <PrivateRoute><MyQueries/></PrivateRoute>
        },
        {
          path: '/my-recommendations',
          element: <PrivateRoute><MyRecommendations/></PrivateRoute>
        }
      ]
    },
    {
        path: '/*',
        element: <ErrorPage/>
    }
  ]);

  export default router;