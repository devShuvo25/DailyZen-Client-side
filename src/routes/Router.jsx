import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Registere from "../pages/Registere";
import MyHabits from "../pages/MyHabits";
import AddHabits from "../pages/AddHabits";
import PublicHabits from "../pages/PublicHabits";
import PrivetRoute from "../PrivetRoutes/PrivetRoute";
import UpdateHabit from "../pages/UpdateHabit";
import ErrorPage from "../pages/Error";
import Details from "../pages/Details";

const routes = createBrowserRouter([
    {
        path:'/',
        Component: RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'/add-habit',
                element:<PrivetRoute>
                    <AddHabits/>
                </PrivetRoute>
            },
            {
                path:'/my-habits',
                element:<PrivetRoute>
                    <MyHabits/>
                </PrivetRoute>
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/public-habits',
                element:<PrivetRoute>
                    <PublicHabits/>
                </PrivetRoute>
            },
            {
                path:'/register',
                Component:Registere
            },
            {
                path:'/update-habit',
                element:<PrivetRoute>
                    <UpdateHabit/>
                </PrivetRoute>
            },
            {
                path:'*',
                Component:ErrorPage
            },
            {
                path:"/habit-details",
                Component:Details
            }
        ]
    }
])
export default routes;