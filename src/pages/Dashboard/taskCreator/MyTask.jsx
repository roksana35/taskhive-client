// import { useEffect, useState } from "react";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import { MdDeleteForever, MdModeEdit ,} from "react-icons/md";
// import Swal from "sweetalert2";


// const MyTask = () => {
//   const {user}=useAuth();
//   const axiosSecure=useAxiosSecure();
//   const [tasks, setTasks] = useState([]);
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [submissionDetails, setSubmissionDetails] = useState("");
//   const [taskSubmissions, setTaskSubmissions] = useState([]);

//   const {data:taskData=[],refetch}=useQuery({
//       queryKey:['tasks',user?.email],
//       queryFn:async()=>{
//           const response= await axiosSecure.get(`/task/${user.email}`)
//           // console.log(response.data)

//           return response.data.sort((a,b)=>new Date (b.current_time)-new Date(a.current_time));
//       }
//   })
  
  
//   // // console.log(taskData)
//   // useEffect(() => {
//   //     if (taskData) {
//   //         setTasks(taskData);
//   //     }
//   // }, [taskData]);
  



// const handleClick = (task) => {
//   setSelectedTask(task);
// };

//   const handleUpdate=e=>{
//     e.preventDefault();
//       axiosSecure.patch(`/task/${selectedTask._id}`,selectedTask)
//       .then(res=>{
//         console.log(res.data)
//         if(res.data.modifiedCount>0){
//           refetch()
//           Swal.fire({
//             position: "top-end",
//             icon: "success",
//             title: `${user.name} is an updated role now`,
//             showConfirmButton: false,
//             timer: 1500
//           });
//         }
//       })

//   }
//   const handleDeleteTask = async (task) => {
//     console.log(task._id);
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then((result) => {
//       if (result.isConfirmed) {
//           axiosSecure.delete(`/taskdelete/${task._id}`)
//           .then(res=>{
//               if(res.data.deletedCount>0){
//                   refetch();
//                   Swal.fire({
//                       title: "Deleted!",
//                       text: "Your file has been deleted.",
//                       icon: "success"
//                     });
//               }
//           })


        
//       }
//     });
//   };
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//     }
//   };
  
//   return (
//       <div className="overflow-x-auto">
// <table className="table">
//   {/* head */}
//   <thead>
//     <tr>
//       <th></th>
//       <th>Title</th>
//       <th>Task_quantity</th>
//       <th>payable_amount</th>
//       <th>Update</th>
//       <th>Delete</th>
//     </tr>
//   </thead>
//   <tbody>
//     {
//       taskData.map((task,index)=>(

//           <tr key={task._id}>
//           <th>{index+1}</th>
//           <td>{task.task_title}</td>
//           <td>{task.task_quantity}</td>
//           <td>{task.payable_amount}</td>
//           <td>   <label htmlFor="my_modal_7" onClick={()=>handleClick(task)} className="btn" >
//                 <MdModeEdit className="text-xl" />
//               </label>
//           </td>
         
//           <td><MdDeleteForever className="text-2xl text-red-600"  onClick={()=>handleDeleteTask(task)}/> </td>
          
//         </tr>
//       ))
//     }

//   </tbody>
// </table>
// <input type="checkbox" id="my_modal_7" className="modal-toggle z-50 " />
//     <div className="modal  z-50" role="dialog">
//       <div className="modal-box">
//         <form onSubmit={handleUpdate} className="card-body p-3">
         
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Task_title</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Task_title"
//               defaultValue={selectedTask?.task_title}
             
//               className="input input-bordered"
//               onChange={(e) => setSelectedTask({ ...selectedTask, task_title: e.target.value })}
//               onKeyDown={handleKeyDown}

//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Task_details</span>
//             </label>
//             <input
//               type="text"
//               placeholder="task_details"
//               className="input input-bordered"
//               defaultValue={selectedTask?.task_detail}
//               onChange={(e) => setSelectedTask({ ...selectedTask, task_detail: e.target.value })}
//               onKeyDown={handleKeyDown}
//             />
//           </div>
//           <div className="form-control">
//             <label className="label">
//               <span className="label-text">Submission_info</span>
//             </label>
//              <input
//                 type="text" 
//                 placeholder="submission_details"
//                 defaultValue={selectedTask?.submission_info}
//                 className="input input-bordered"
//                 onChange={(e) => setSelectedTask({ ...selectedTask, submission_info: e.target.value })}
//                 onKeyDown={handleKeyDown}
//               />
            
//             </div>
            
           
//           <div className="form-control mt-6">
//             <button className="btn btn-primary">Update</button>
//           </div>
//         </form>
//       </div>
//       <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
//     </div>
// </div>
//   );

// }




// export default MyTask;


import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import Swal from "sweetalert2";

const MyTask = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedTask, setSelectedTask] = useState(null);

  const { data: taskData = [], refetch } = useQuery({
    queryKey: ['tasks', user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/task/${user.email}`);
      return response.data.sort((a, b) => new Date(b.current_time) - new Date(a.current_time));
    },
  });

  const handleClick = (task) => {
    setSelectedTask(task);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating task with data:", selectedTask);
    if (selectedTask) {
      try {
        const res = await axiosSecure.patch(`/task/${selectedTask._id}`, selectedTask);
        console.log("Update response:", res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name}'s task has been updated`,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "info",
            title: "No changes were detected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "An error occurred while updating the task",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const handleDeleteTask = async (task) => {
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
        axiosSecure.delete(`/taskdelete/${task._id}`)
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Task Quantity</th>
            <th>Payable Amount</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {taskData.map((task, index) => (
            <tr key={task._id}>
              <th>{index + 1}</th>
              <td>{task.task_title}</td>
              <td>{task.task_quantity}</td>
              <td>{task.payable_amount}</td>
              <td>
                <label htmlFor="my_modal_7" onClick={() => handleClick(task)} className="btn">
                  <MdModeEdit className="text-xl" />
                </label>
              </td>
              <td>
                <MdDeleteForever className="text-2xl text-red-600" onClick={() => handleDeleteTask(task)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTask && (
        <div>
          <input type="checkbox" id="my_modal_7" className="modal-toggle z-50" />
          <div className="modal z-50" role="dialog">
            <div className="modal-box">
              <form onSubmit={handleUpdate} className="card-body p-3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Task Title"
                    value={selectedTask.task_title || ''}
                    className="input input-bordered"
                    onChange={(e) => setSelectedTask({ ...selectedTask, task_title: e.target.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Task Details</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Task Details"
                    value={selectedTask.task_detail || ''}
                    className="input input-bordered"
                    onChange={(e) => setSelectedTask({ ...selectedTask, task_detail: e.target.value })}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Submission Info</span>
                  </label>
                  <textarea
                    placeholder="Submission Info"
                    value={selectedTask.submission_info || ''}
                    className="textarea textarea-bordered"
                    onChange={(e) => setSelectedTask({ ...selectedTask, submission_info: e.target.value })}
                  />
                </div>
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;
