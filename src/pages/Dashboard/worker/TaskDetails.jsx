import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";


const TaskDetails = () => {
  const { id } = useParams();
  const {user}=useAuth();
  const [tasks,setTaks]=useState([]);
  const axiosPublic=useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  useEffect(()=>{
    axiosPublic.get(`/tasks/${id}`)
    .then(res=>{
      console.log(res.data)
      setTaks(res.data);
      reset(res.data)
     

    })

  },[id,reset]);
  const currentDate = new Date().toISOString().split('T')[0];
  

  const onSubmit = (data) => {
    console.log(data)
    const submissionInfo = {
       // Spread all form data
      task_id: data.task_id,
      task_title: data.task_title,
      worker_name: data.worker_name,
      worker_email: data.worker_email,
      creator_name: data.creator_name,
      creator_email: data.creator_email,
      payable_amount: data.payable_amount,
      status: data.status,
      current_date:data.current_date,
      task_img_url: data.image_url,
      task_detail: data.task_details,
      submission_detailes:data.submission_details
    };
    axiosPublic.post('/submission',submissionInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                console.log('Data Submission Successfully')
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Task created successfully.',
                  showConfirmButton: false,
                  timer: 1500
              });
            }
        })
  }
  
    return (
        <div className=" min-h-screen bg-base-200">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> task_id
            </span>
          </label>
          <input type="text" {...register('task_id')}  defaultValue={tasks._id}  className="input input-bordered w-full"  />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">task_title</span>
          </label>
          <input type="text" {...register('task_title')}    placeholder="password" defaultValue={tasks.task_title} className="input input-bordered w-full"  />
          
          
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> worker_name</span>
          </label>
          <input type="text" {...register('worker_name')}  placeholder="email"  defaultValue={user.displayName} className="input input-bordered w-full"  />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">worker_email
            </span>
          </label>
          <input type="email" {...register('worker_email')}  placeholder="worker_email
" defaultValue={user.email} className="input input-bordered w-full"/>

          
        </div>


        </div>



        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">creator_name</span>
          </label>
          <input type="text" {...register('creator_name')}   placeholder="creator_name" defaultValue={tasks.creator_name} className="input input-bordered w-full" />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">creator_email</span>
          </label>
          <input type="email" {...register('creator_email')}   placeholder="creator_email" defaultValue={tasks.creator_email} className="input input-bordered w-full"  />
          
          
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> payable_amount</span>
          </label>
          <input type="number" {...register('payable_amount')}  placeholder=" payable_amount" defaultValue={tasks. payable_amount} className="input input-bordered w-full"  />
          
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">status</span>
          </label>
          <input type="text" {...register('status')} placeholder="status" defaultValue={'pending'} className="input input-bordered w-full"  />
          
         
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">task_img_url
            </span>
          </label>
          <input type="text" {...register('image_url')} placeholder="task_img_url
" defaultValue={tasks.image_url
} className="input input-bordered w-full"  />
</div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> current_date</span>
          </label>
          <input type="date"{...register('current_date')}  placeholder=" current_date" defaultValue={currentDate} className="input input-bordered w-full" required />
         
         
        </div>


        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> task_detail
            </span>
          </label>
          <input type="text" {...register('task_details')} placeholder=" task_detail
" defaultValue={tasks. task_detail
} className="input input-bordered w-full"  />

        </div>
        
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">submission_Details
            </span>
          </label>
          <textarea {...register('submission_details')} className="textarea textarea-primary" placeholder=" submission_Details"></textarea>
          </div>
         
        
       
        
        <div>
            <button className="btn btn-secondary w-full">Submit</button>
        </div>
      </form>
  
</div>
    );
};

export default TaskDetails;