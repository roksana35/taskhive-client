import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import useAuth from "../../../hooks/useAuth";
import { FaDollarSign } from "react-icons/fa";


const MySubmission = () => {
    const axiosPublic=useAxiosPublic();
    const {user}=useAuth();
    const [submission,setSubmission]=useState([]);


    useEffect(()=>{
        axiosPublic.get(`/submission/${user?.email}`)
        .then(res=>{
            console.log(res.data);
            setSubmission(res.data)

        })
    },[])


    return (
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          #
        </th>
        
        <th>Image</th>
        <th>Name</th>
        <th>Creator_Email</th>
        <th>Creator_Name</th>
        <th>Payable_Amount</th>
        <th>Status</th>

      </tr>
    </thead>
    <tbody>
     {
        submission.map((sub,index)=>(
            <tr key={sub._id}>
              <td>{index+1}</td>
              
        
            <td>
            
                <div className="avatar">
                  <div className="mask mask-squircle w-16 h-16">
                    <img src={sub.task_img_url} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                
              
            </td>
            <td>{sub.task_title}</td>
            
            <td>{sub.creator_email}</td>
            <td >{sub.creator_name}</td>
            <td>
                                <div className="text-xl flex items-center text-green-500">
                                    <FaDollarSign />
                                    {sub.payable_amount}
                                </div>
                            </td>
            <td className="badge badge-secondary mt-8">{sub.status}</td>
            {/* <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th> */}
          </tr>
        ))
     }
      
    </tbody>
    
  </table>
</div>
    );
};

export default MySubmission;