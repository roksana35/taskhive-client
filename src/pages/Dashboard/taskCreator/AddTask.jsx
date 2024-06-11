
// import useAuth from '../../../hooks/useAuth';
// import { useForm,  } from "react-hook-form"
// import useAxiosPublic from '../../../hooks/useAxiosPublic';
// import Swal from 'sweetalert2';
// import { useEffect, useState } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const AddTask = () => {
//     const {user}=useAuth();
//     const axiosSecure=useAxiosSecure()
//     const [userCoins, setUserCoins] = useState(0);
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//       } = useForm()
//       useEffect(() => {
//         // Fetch user's available coins
//         axiosSecure.get(`/usersinfo/${user.email}`)
//         .then(res => {
//           console.log("API Response:", res.data); // Log full API response
//           if (res.data && res.data.coin !== undefined) {
//               setUserCoins(res.data.coin);
//           } else {
//               console.error("Coin data not found in response");
//           }
//       })
//       .catch(err => {
//           console.error("Error fetching user coins:", err); // Error handling log
//       });
//       }, [user.email,useAxiosPublic]);
//       console.log(userCoins)
//     //   const onSubmit = async(data) => {
//     //     const totalCost = data.quantity * data.amount;

//     //     if (totalCost > userCoins) {
//     //       Swal.fire({
//     //         icon: 'error',
//     //         title: 'Not enough coins',
//     //         text: 'Purchase more coins to add this task.',
//     //       });
//     //       return;}
//     //     // console.log(data)
//     //     const taskInfo={
//     //         task_title:data.title,
//     //         task_detail:data.details,
//     //         task_quantity:data.quantity,
//     //         payable_amount:data.amount,
//     //         completion_date:data.date,
//     //         image_url:data.image,
//     //         creator_email:user.email,
//     //         creator_name:user.displayName,
//     //         current_time:new Date().toDateString(),
//     //         submission_info:data.submission_info


//     //     }
//     //     axiosPublic.post('/tasks',taskInfo)
//     //     .then(res=>{
//     //         // console.log(res.data)
//     //         if(res.data.insertedId){
//     //           await axiosPublic.patch(`/usersin/${user.email}`, { coin: userCoins - totalCost })
//     //             // console.log('user added to the database')
//     //             reset();
//     //             Swal.fire({
//     //               position: 'top-end',
//     //               icon: 'success',
//     //               title: 'Task created successfully.',
//     //               showConfirmButton: false,
//     //               timer: 1500
//     //           });
//     //             // Update userCoins state
//     //     setUserCoins(prevCoins => prevCoins - totalCost);
//     //         }
//     //     })

//     // }
//     const onSubmit = async (data) => {
//       const totalCost = data.quantity * data.amount;
//       console.log("Total cost:", totalCost); // Debugging log
//       console.log("User coins:", userCoins); // Debugging log
    
//       if (totalCost > userCoins) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Not enough coins',
//           text: 'Purchase more coins to add this task.',
//         });
//         return;
//       }
    
//       const taskInfo = {
//         task_title: data.title,
//         task_detail: data.details,
//         task_quantity: data.quantity,
//         payable_amount: data.amount,
//         completion_date: data.date,
//         image_url: data.image,
//         creator_email: user.email,
//         creator_name: user.displayName,
//         current_time: new Date().toISOString(),
//         submission_info: data.submission_info,
//       };
    
//       try {
//         const response = await axiosSecure.post('/tasks', taskInfo);
//         if (response.data.insertedId) {
//           // Reduce user's available coins
//           await axiosSecure.patch(`/usersin/${user.email}`, { coin: userCoins - totalCost });
    
//           reset();
//           Swal.fire({
//             position: 'top-end',
//             icon: 'success',
//             title: 'Task created successfully.',
//             showConfirmButton: false,
//             timer: 1500,
//           });
    
//           // Update userCoins state
//           setUserCoins(prevCoins => prevCoins - totalCost);
//         }
//       } catch (error) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'An error occurred while adding the task.',
//         });
//       }
//     };
    
    


//     return (
//         <div className=" min-h-screen bg-base-200">
//         <form onSubmit={handleSubmit(onSubmit)} className="card-body">
//             {/* title details */}
//     <div className="md:flex gap-4 ">

//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text">task_title
// </span>
//       </label>
//       <input type="text" {...register("title",{required:true})} placeholder="task_title
// " className="input input-bordered w-full"  />
//  {errors.title && <span className='text-red-600'>This field is required</span>}
//     </div>
   
//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text"> task_detail
// </span>
//       </label>
//       <input type="text"  {...register("details",{required:true})}  placeholder=" task_detail
// " className="input input-bordered w-full" />
// {errors.details && <span className='text-red-600'>This field is required</span>}
      
//     </div>
    


//     </div>

//     {/* paylable ammount task quantity */}
//     <div className="md:flex gap-4 ">

//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text"> payable_amount </span>
//       </label>
//       <input type="number" {...register("amount",{required:true})}  placeholder=" payable_amount " className="input input-bordered w-full"  />
//       {errors.amount && <span className='text-red-600'>This field is required</span>}
//     </div>
    
// <div className="form-control w-full">
//   <label className="label">
//     <span className="label-text"> task_quantity</span>
//   </label>
//   <input type="number" {...register("quantity",{required:true})}  placeholder=" task_quantity" className="input input-bordered w-full"  />
//   {errors.quantity && <span className='text-red-600'>This field is required</span>}
  
// </div>




// </div>



// {/* completion date & image url */}
//     <div className="md:flex gap-4 ">

    
//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text"> completion_date</span>
//       </label>
//       <input type="date" {...register("date",{required:true})}  placeholder=" completion_date" className="input input-bordered w-full" />
//       {errors.date && <span className='text-red-600'>This field is required</span>}
//     </div>
   
//     <div className="form-control w-full">
//       <label className="label">
//         <span className="label-text">image_url </span>
//       </label>
//       <input type="text" {...register("image",{required:true})}  placeholder="image_url " className="input input-bordered w-full"  />
//       {errors.image && <span className='text-red-600'>This field is required</span>}
//     </div>
    


//     </div>
//     <div className="form-control w-full">
//           <label className="label">
//             <span className="label-text">Submission Info
//             </span>
//           </label>
//           <textarea {...register('submission_info',{required:true})}  placeholder="submission info" className='p-2 border-2 border-b-slate-600 rounded-lg'></textarea>
//           {errors.submission_info && <span className='text-red-600'>This field is required</span>}
//           </div>

//     <div>
//         <button className="btn btn-secondary w-full">Submit</button>
//     </div>
//   </form>

// </div>
//     );
// };

// export default AddTask;
import useAuth from '../../../hooks/useAuth';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AddTask = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [userCoins, setUserCoins] = useState(0);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const {data:userData,refetch}=useQuery({
      queryKey:['users','usersinfo',user?.email],
      queryFn:async()=>{
        const res=await axiosSecure.get(`/usersinfo/${user.email}`)
        console.log(res.data)
        return res.data.coin;
      }
    })
   
    // useEffect(() => {
    //     // Fetch user's available coins
    //     axiosSecure.get(`/usersinfo/${user.email}`)
    //         .then(res => {
    //             console.log("API Response:", res.data); // Log full API response
    //             if (res.data && res.data.coin !== undefined) {
    //                 setUserCoins(res.data.coin);
    //             } else {
    //                 console.error("Coin data not found in response");
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Error fetching user coins:", err); // Error handling log
    //         });
    // }, [user.email, axiosSecure]);

    const onSubmit = async (data) => {
        const totalCost = data.quantity * data.amount;
        console.log("Total cost:", totalCost); // Debugging log
        console.log("User coins:", userData); // Debugging log

        if (totalCost > userData) {
            Swal.fire({
                icon: 'error',
                title: 'Not enough coins',
                text: 'Purchase more coins to add this task.',
            });
            return;
        }

        const taskInfo = {
            task_title: data.title,
            task_detail: data.details,
            task_quantity: data.quantity,
            payable_amount: data.amount,
            completion_date: data.date,
            image_url: data.image,
            creator_email: user.email,
            creator_name: user.displayName,
            current_time: new Date().toLocaleDateString(),
            submission_info: data.submission_info,
        };

        try {
            const response = await axiosSecure.post('/tasks', taskInfo);
            if (response.data.insertedId) {
                // Reduce user's available coins
                await axiosSecure.patch(`/usersinfo/${user.email}`, { coin: userData - totalCost });
                refetch()

                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Task created successfully.',
                    showConfirmButton: false,
                    timer: 1500,
                });

                // Update userCoins state
              
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while adding the task.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* title details */}
                <div className="md:flex gap-4 ">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>
                        <input type="text" {...register("title", { required: true })} placeholder="Task Title" className="input input-bordered w-full" />
                        {errors.title && <span className='text-red-600'>This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Details</span>
                        </label>
                        <input type="text" {...register("details", { required: true })} placeholder="Task Details" className="input input-bordered w-full" />
                        {errors.details && <span className='text-red-600'>This field is required</span>}
                    </div>
                </div>

                {/* payable amount and task quantity */}
                <div className="md:flex gap-4 ">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Payable Amount</span>
                        </label>
                        <input type="number" {...register("amount", { required: true })} placeholder="Payable Amount" className="input input-bordered w-full" />
                        {errors.amount && <span className='text-red-600'>This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Task Quantity</span>
                        </label>
                        <input type="number" {...register("quantity", { required: true })} placeholder="Task Quantity" className="input input-bordered w-full" />
                        {errors.quantity && <span className='text-red-600'>This field is required</span>}
                    </div>
                </div>

                {/* completion date and image url */}
                <div className="md:flex gap-4 ">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Completion Date</span>
                        </label>
                        <input type="date" {...register("date", { required: true })} placeholder="Completion Date" className="input input-bordered w-full" />
                        {errors.date && <span className='text-red-600'>This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" {...register("image", { required: true })} placeholder="Image URL" className="input input-bordered w-full" />
                        {errors.image && <span className='text-red-600'>This field is required</span>}
                    </div>
                </div>

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Submission Info</span>
                    </label>
                    <textarea {...register('submission_info', { required: true })} placeholder="Submission Info" className='p-2 border-2 border-b-slate-600 rounded-lg'></textarea>
                    {errors.submission_info && <span className='text-red-600'>This field is required</span>}
                </div>

                <div>
                    <button className="btn btn-secondary w-full">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddTask;
