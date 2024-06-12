import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { RiTaskLine } from "react-icons/ri";


const ManageTask = () => {
    const axiosSecure=useAxiosSecure();
    const {data:AllTask=[]}=useQuery({
        queryKey:['tasks'],
        queryFn:async()=>{
        const res = await axiosSecure.get('/tasks')
        // console.log(res.data);
        return res.data
        }
    })
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>TaskTitle</th>
        <th>Creator</th>
        <th>Task_quantity</th>
        <th>Coin_Nedded</th>
        <th> Availability</th>
        <th>modal</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        AllTask.map((task,index)=>(<tr key={task._id}>
            <th>{index+1}</th>
            <td>{task.task_title}</td>
            <td>{task.creator_name}</td>
            <td>{task.task_quantity}</td>
            <td>{task.task_quantity * task.payable_amount}</td>
            <td>{}</td>
            <td><RiTaskLine  className="text-2xl "/></td>
            <td><MdDeleteForever className="text-2xl"/></td>
          </tr>))
      }
      

    </tbody>
  </table>
</div>
        </div>
    );
};

export default ManageTask;