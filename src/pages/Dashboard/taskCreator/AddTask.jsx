
import useAuth from '../../../hooks/useAuth';
import { useForm,  } from "react-hook-form"
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const AddTask = () => {
    const {user}=useAuth();
    const axiosPublic=useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        console.log(data)
        const taskInfo={
            task_title:data.title,
            task_detail:data.details,
            task_quantity:data.quantity,
            payable_amount:data.amount,
            completion_date:data.date,
            image_url:data.image,
            creator_email:user.email,
            creator_name:user.displayName,
            current_time:new Date().toDateString()


        }
        axiosPublic.post('/tasks',taskInfo)
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
            {/* title details */}
    <div className="flex gap-4 ">

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">task_title
</span>
      </label>
      <input type="text" {...register("title",{required:true})} placeholder="task_title
" className="input input-bordered w-full"  />
 {errors.title && <span className='text-red-600'>This field is required</span>}
    </div>
   
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"> task_detail
</span>
      </label>
      <input type="text"  {...register("details",{required:true})}  placeholder=" task_detail
" className="input input-bordered w-full" />
{errors.details && <span className='text-red-600'>This field is required</span>}
      
    </div>
    


    </div>

    {/* paylable ammount task quantity */}
    <div className="flex gap-4 ">

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"> payable_amount </span>
      </label>
      <input type="number" {...register("amount",{required:true})}  placeholder=" payable_amount " className="input input-bordered w-full"  />
      {errors.amount && <span className='text-red-600'>This field is required</span>}
    </div>
    
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"> task_quantity</span>
  </label>
  <input type="number" {...register("quantity",{required:true})}  placeholder=" task_quantity" className="input input-bordered w-full"  />
  {errors.quantity && <span className='text-red-600'>This field is required</span>}
  
</div>



</div>



{/* completion date & image url */}
    <div className="flex gap-4 ">

    
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"> completion_date</span>
      </label>
      <input type="date" {...register("date",{required:true})}  placeholder=" completion_date" className="input input-bordered w-full" />
      {errors.date && <span className='text-red-600'>This field is required</span>}
    </div>
   
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">image_url </span>
      </label>
      <input type="text" {...register("image",{required:true})}  placeholder="image_url " className="input input-bordered w-full"  />
      {errors.image && <span className='text-red-600'>This field is required</span>}
    </div>
    


    </div>



    


    
    
    <div>
        <button className="btn btn-secondary w-full">Submit</button>
    </div>
  </form>

</div>
    );
};

export default AddTask;