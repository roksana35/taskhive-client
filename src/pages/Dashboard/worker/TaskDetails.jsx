import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";


const TaskDetails = () => {
  const { id } = useParams();
  const {user}=useAuth();
  const [tasks,setTaks]=useState([]);
  const axiosPublic=useAxiosPublic();
  useEffect(()=>{
    axiosPublic.get(`/tasks/${id}`)
    .then(res=>{
      console.log(res.data)
      setTaks(res.data)

    })

  },[]);
  const currentDate = new Date().toISOString().split('T')[0];
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const submissionInfo={


    }
    axiosPublic.post('/submission',submissionInfo)
        .then(res=>{
            console.log(res.data)
            if(res.data.insertedId){
                console.log('user added to the database')
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
          <input type="text"  defaultValue={tasks._id} {...register("id",{required:true})} className="input input-bordered w-full"  />
          {errors.id && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">task_title</span>
          </label>
          <input type="text"   placeholder="password" defaultValue={tasks.task_title} className="input input-bordered w-full"  />
          {errors.title && <span className='text-red-600'>This field is required</span>}
          
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> worker_name</span>
          </label>
          <input type="text" placeholder="email" {...register("workerName",{required:true})} defaultValue={user.displayName} className="input input-bordered w-full"  />
          {errors.workeeName && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">worker_email
            </span>
          </label>
          <input type="email" {...register("workerEmail",{required:true})} placeholder="worker_email
" defaultValue={user.email} className="input input-bordered w-full"/>
{errors.workerEmail && <span className='text-red-600'>This field is required</span>}
          
        </div>


        </div>



        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">creator_name</span>
          </label>
          <input type="text" {...register("wonerName",{required:true})} placeholder="creator_name" defaultValue={tasks.creator_name} className="input input-bordered w-full" />
          {errors.wonerName && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">creator_email</span>
          </label>
          <input type="email" {...register("wonerEmail",{required:true})} placeholder="creator_email" defaultValue={tasks.creator_email} className="input input-bordered w-full"  />
          {errors.WonerEmail && <span className='text-red-600'>This field is required</span>}
          
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> payable_amount</span>
          </label>
          <input type="number" {...register("amount",{required:true})} placeholder=" payable_amount" defaultValue={tasks. payable_amount} className="input input-bordered w-full"  />
          {errors.amount && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">status</span>
          </label>
          <input type="text" {...register("status",{required:true})} placeholder="status" defaultValue={'pending'} className="input input-bordered w-full"  />
          {errors.pending && <span className='text-red-600'>This field is required</span>}
         
        </div>


        </div>


        <div className="md:flex gap-4 ">

        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">task_img_url
            </span>
          </label>
          <input type="text" {...register("image_url",{required:true})} placeholder="task_img_url
" defaultValue={tasks.image_url
} className="input input-bordered w-full"  />
{errors.image_url && <span className='text-red-600'>This field is required</span>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> current_date</span>
          </label>
          <input type="date" {...register("date",{required:true})} placeholder=" current_date" defaultValue={currentDate} className="input input-bordered w-full" required />
          {errors.date && <span className='text-red-600'>This field is required</span>}
         
        </div>


        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text"> task_detail
            </span>
          </label>
          <input type="text" {...register("details",{required:true})} placeholder=" task_detail
" defaultValue={tasks. task_detail
} className="input input-bordered w-full"  />
{errors.details && <span className='text-red-600'>This field is required</span>}
         
        </div>
        
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">submission_Details
            </span>
          </label>
          <textarea {...register("submission_details",{required:true})} className="textarea textarea-primary" placeholder=" submission_Details"></textarea>
          {errors.submission_details && <span className='text-red-600'>This field is required</span>}
          </div>
         
        
       
        
        <div>
            <button className="btn btn-secondary w-full">Submit</button>
        </div>
      </form>
  
</div>
    );
};

export default TaskDetails;