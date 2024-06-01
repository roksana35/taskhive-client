import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import Regiser from "../pages/register/Regiser";
import Banner from "../pages/Home/Banner";


const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      children:[
        {
            path:'/',
            element:<Banner></Banner>

        },
      
        {
            path:'/login',
            element:<Login></Login>

        },
        {
            path:'/register',
            element:<Regiser></Regiser>
        }
       
      ]
    },
  ]);
  export default router