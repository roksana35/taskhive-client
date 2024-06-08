import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdModeEdit ,} from "react-icons/md";


const MyTask = () => {

    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const {data:taskData=[]}=useQuery({
        queryKey:['tasks',user?.email],
        queryFn:async()=>{
            const response= await axiosSecure.get(`/task/${user.email}`)
            console.log(response.data)

            return response.data.sort((a,b)=>new Date (b.current_time)-new Date(a.current_time));
        }
    })
    console.log(taskData)
    useEffect(() => {
        if (taskData) {
            setTasks(taskData);
        }
    }, [taskData]);

    const handleUpdate=task=>{
        axiosSecure.patch('/')

    }

    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Title</th>
        <th>Task_quantity</th>
        <th>payable_amount</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {
        taskData.map((task,index)=>(

            <tr key={task._id}>
            <th>{index+1}</th>
            <td>{task.task_title}</td>
            <td>{task.task_quantity}</td>
            <td>{task.payable_amount}</td>
            <td><button className="btn " onClick={()=>handleUpdate(task)}><MdModeEdit className="text-xl " /></button></td>
            <td><MdDeleteForever className="text-2xl text-red-600" /> </td>
            
          </tr>
        ))
      }
     
    
    </tbody>
  </table>
</div>
    );
};

export default MyTask;