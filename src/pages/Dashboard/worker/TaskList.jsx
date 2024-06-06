import { Link } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const TaskList = () => {
  const [tasks,setTaks]=useState([]);
  const axiosPublic=useAxiosPublic();
  useEffect(()=>{
    axiosPublic.get('/tasks')
    .then(res=>{
      console.log(res.data)
      setTaks(res.data)

    })

  },[])
  console.log(tasks)
    return (
      <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className="card w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{task.task_title}</h2>
            <p>{task.task_detail.slice(0,200)}</p>
            <div className="card-actions">
              <Link to={`/task/${task.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </div>
        </div>
      ))}
    </div> 
    );
};

export default TaskList;