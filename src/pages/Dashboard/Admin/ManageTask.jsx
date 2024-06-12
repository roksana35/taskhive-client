import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { MdDeleteForever } from "react-icons/md";
import { RiTaskLine } from "react-icons/ri";
import { useState } from "react";
import Swal from "sweetalert2";


const ManageTask = () => {
    const axiosSecure=useAxiosSecure();
    const {data:AllTask=[],refetch}=useQuery({
        queryKey:['tasks'],
        queryFn:async()=>{
        const res = await axiosSecure.get('/tasks')
        // console.log(res.data);
        return res.data
        }
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const handleClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleDeleteTask = (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/task/${id}`)
            .then(res => {
              console.log(res.data)
              if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                  title: "Deleted!",
                  text: "Your task has been deleted.",
                  icon: "success",
                });
              }
            });
        }
      });
    };

  

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
            <td>{task.task_quantity?task.task_quantity : 'undefiend'}</td>
            <td>
            <label htmlFor="my_modal_7" onClick={() => handleClick(task)} className="btn">
                  <RiTaskLine className="text-xl" />
                </label>
             </td>
            <td><MdDeleteForever className="text-2xl" onClick={()=>handleDeleteTask(task._id)} /></td>
          </tr>))
      }
      

    </tbody>
  </table>
  {/* Modal */}
  <input type="checkbox" id="my_modal_7" className="modal-toggle z-50" defaultChecked={isModalOpen} />
                <div className={`modal z-50 ${isModalOpen ? 'modal-open' : ''}`} role="dialog">
                    <div className="modal-box">
                        <form className="card-body p-3">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Task Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Title"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.task_title : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    payable_amount</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      payable_amount : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    
                                    task_quantity</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      
                                 task_quantity : 0}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    
                                    creator_name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      
                                 creator_name : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    
                                    creator_email</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      
                                 creator_email : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    
                                    
                               completion_date</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      
                                 
                            completion_date : ''}
                                    readOnly
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">
                                    
                                    
                               image</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Task Details"
                                    className="input input-bordered"
                                    value={selectedTask ? selectedTask.
                                      
                                 
                            image_url : ''}
                                    readOnly
                                />
                            </div>
                            
                        </form>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7" onClick={closeModal}>
                        Close
                    </label>
                </div>
            </div>
        </div>


// </div>
        // </div>
    );
};

export default ManageTask;