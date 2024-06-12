import { Link } from "react-router-dom";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

import { BsCurrencyDollar } from "react-icons/bs";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const TaskList = () => {
  const [tasks,setTaks]=useState([]);
  // const axiosPublic=useAxiosPublic();
  const axiosSecure=useAxiosSecure();
  useEffect(()=>{
    axiosSecure.get('/task')
    .then(res=>{
      // console.log(res.data)
      setTaks(res.data)

    })

  },[])
  // console.log(tasks)
    return (
      <div className="task-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map(task => (
        <div key={task._id} className="card w-full bg-base-100 space-y-2 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl font-semibold ">{task.task_title}</h2>
          <p><span  className="font-medium text-xl mr-2" >TaskCreator:</span>{task.creator_name}</p>
          <p><span className="font-medium text-xl mr-2">Deadline:</span>{task.completion_date}</p>
          <div className="">
          <p><span className="font-medium text-xl mr-2">Task_quantity:</span> {task.task_quantity}</p>
          <p className="flex items-center text-green-500  text-xl font-semibold"><BsCurrencyDollar  className="text-xl font-semibold"></BsCurrencyDollar>{task.payable_amount}</p>
          
          </div>
          <div className="card-actions justify-end">
            <Link to={`/dashboard/task/${task._id}`}>
            <button className="btn btn-primary">View Details</button>
            </Link>
            
          </div>
        </div>
      </div>
      ))}
    </div> 
    );
};

export default TaskList;