import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/login/Login";
import Regiser from "../pages/register/Regiser";
import Banner from "../pages/Home/Banner";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AllUser from "../pages/Dashboard/AllUser";
import TaskList from "../pages/Dashboard/worker/TaskList";
import TaskDetails from "../pages/Dashboard/worker/TaskDetails";
import AddTask from "../pages/Dashboard/taskCreator/AddTask";
import MySubmission from "../pages/Dashboard/worker/MySubmission";
import WithDraw from "../pages/Dashboard/worker/WithDraw";


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
        }
      ]
    }
  ]);
  export default router