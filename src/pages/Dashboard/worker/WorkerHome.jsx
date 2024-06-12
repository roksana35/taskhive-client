
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";


const WorkerHome = () => {
    const axiosSecure=useAxiosSecure();
    const [submission,setSubmission]=useState([]);
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth()


    const {data:workerSubmission=[],refetch}=useQuery({
        queryKey:['workersubmission'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/workersubmission')
            // console.log(result.data)
            return result.data;
        }
    })
    const {data:userData=[],}=useQuery({
        queryKey:['usersinfo'],
        queryFn:async()=>{
            const result= await axiosSecure.get(`/usersinfo/${user.email}`)
            // console.log(result.data)
            return result.data;
        }
    })
   


    useEffect(()=>{
        axiosPublic.get(`/submission/${user?.email}`)
        .then(res=>{
            // console.log(res.data);
            setSubmission(res.data)

        })
    },[axiosPublic,user])
     // Calculate total payable amount
     const totalPayableAmount = workerSubmission.reduce((total, submission) => {
        return total + (parseFloat(submission.payable_amount) || 0);
    }, 0);


    return (
        <div>
            <div className="flex justify-evenly mb-4 md:mb-8">
                <h2 className="md:text-2xl font-semibold"> Total Submission:{submission.length}</h2>
                <h2 className="md:text-2xl font-semibold"> Total Earning:{totalPayableAmount}</h2>
                <h2 className="md:text-2xl font-semibold"> Available coin:{userData.coin}</h2>
            </div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>TaskName</th>
        <th>CreatorName</th>
        <th>Payable_amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
        {
            workerSubmission.map((submission,index)=>(
                <tr key={submission._id} className="bg-base-200">
                <th>{index+1}</th>
                <td>{submission.task_title}</td>
                <td>{submission.creator_name}</td>
                <td>{submission.payable_amount}</td>
                <td className="badge badge-secondary">{submission.status}</td>
              </tr>
            ))
        }
      {/* row 1 */}
      

    </tbody>
  </table>
</div>
        </div>
    );
};

export default WorkerHome;