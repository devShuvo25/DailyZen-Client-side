import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Registere from "../pages/Registere";

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
                path:'/contacts',
                Component:Contact
            },
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Registere
            }
        ]
    }
])
export default routes;