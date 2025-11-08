import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Registere from "../pages/Registere";
import MyHabits from "../pages/MyHabits";
import AddHabits from "../pages/AddHabits";
import PublicHabits from "../pages/PublicHabits";

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
                Component:AddHabits
            },
            {
                path:'/my-habits',
                Component:MyHabits
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/public-habits',
                Component:PublicHabits
            },
            {
                path:'/register',
                Component:Registere
            }
        ]
    }
])
export default routes;