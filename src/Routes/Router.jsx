import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import Regiser from "../pages/register/Regiser";

import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../pages/Dashboard/AllUser";
import TaskList from "../pages/Dashboard/worker/TaskList";
import TaskDetails from "../pages/Dashboard/worker/TaskDetails";
import AddTask from "../pages/Dashboard/taskCreator/AddTask";
import MySubmission from "../pages/Dashboard/worker/MySubmission";
import WithDraw from "../pages/Dashboard/worker/WithDraw";
import TakcreatorHome from "../pages/Dashboard/taskCreator/TakcreatorHome";
import MyTask from "../pages/Dashboard/taskCreator/MyTask";
import PurcheseCoin from "../pages/Dashboard/taskCreator/PurcheseCoin";
import Payment from "../pages/Dashboard/taskCreator/Payment";
import ManageTask from "../pages/Dashboard/Admin/ManageTask";
import PaymentHistory from "../pages/Dashboard/taskCreator/PaymentHistory";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import Home from "../pages/Home/Home";
import WorkerHome from "../pages/Dashboard/worker/WorkerHome";
import Errorpage from "../pages/ErrorPage";
import ForbiddenPage from "../pages/Dashboard/ForbiddenPage";


const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<Errorpage></Errorpage>,
      children:[
        {
            path:'/',
            element:<Home></Home>

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
      errorElement:<ForbiddenPage></ForbiddenPage>,
      children:[
        {
          path:'manageuser',
          element:<AllUser></AllUser>

        },
        {
          path:'tasklist',
          element:<TaskList></TaskList>
        },
        
        {
          path:'addtask',
          element:<AddTask></AddTask>
        },
        {
          path: 'task/:id',
          element: <TaskDetails></TaskDetails>
        },
        {
          path:'submission',
          element:<MySubmission></MySubmission>
        },
        {
          path:'withdraw',
          element:<WithDraw></WithDraw>
        },
        {
          path:'taskhome',
          element:<TakcreatorHome></TakcreatorHome>
        },
        {
          path:'mytask',
          element:<MyTask></MyTask>
        },
        {
          path:'coin',
          element:<PurcheseCoin></PurcheseCoin>
        },
        {
          path:'payment-page/:price',
          element:<Payment></Payment>
        },
        {
          path:'managetask',
          element:<ManageTask></ManageTask>
        },
        {
          path:'paymentHistory',
          element:<PaymentHistory></PaymentHistory>
        },
        {
          path:'adminhome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'workerhome',
          element:<WorkerHome></WorkerHome>
        }
      ]
    }
  ]);
  export default router