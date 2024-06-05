import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import Regiser from "../pages/register/Regiser";
import Banner from "../pages/Home/Banner";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../pages/Dashboard/AllUser";


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
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'manageuser',
          element:<AllUser></AllUser>

        }
      ]
    }
  ]);
  export default router