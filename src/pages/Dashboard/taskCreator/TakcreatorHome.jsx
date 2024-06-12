import {  useQuery,  } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDeleteLeft } from "react-icons/fa6";
import { FcCheckmark } from "react-icons/fc";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const TaskCreatorHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    
   
    const [submission, setSubmission] = useState([]);
    const [approvedSubmissionsCount, setApprovedSubmissionsCount] = useState(0);

    const { data: submissions = [], refetch } = useQuery({
        queryKey: ['submission',user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/submissions/${user.email}`);
            console.log('taskcreator submission', res.data);  // Debug statement
            return res.data;
        },
    });

    const {data:userData=[],}=useQuery({
        queryKey:['usersinfo'],
        queryFn:async()=>{
            const result= await axiosSecure.get(`/usersinfo/${user.email}`)
            // console.log(result.data)
            return result.data;
        }
    })

    // const fetchSubmissions = async () => {
    //     try {
    //         const res = await axiosSecure.get(`/submissions/${user.email}`);
    //         console.log('taskcreator submission of fetch', res.data);
    //         setSubmission(res.data);
    //     } catch (error) {
    //         console.error('Error fetching submissions:', error);
    //     }
    // };
    

    const {data:paymentData=[]}=useQuery({
        queryKey:['user',user.email],
        queryFn:async()=>{
            const result= await axiosSecure.get(`/payment/${user.email}`)
            console.log(result.data)
            return result.data;
        }
    })
    const totalPayments = paymentData.reduce((total, payment) => {
        return total + (parseFloat(payment.amount) || 0);
    }, 0);

    const handleApprove = async (id, worker_email, payable_amount) => {
        try {
            await axiosSecure.patch(`/submission/approve/${id}`, { worker_email, payable_amount });

            await refetch();
            setApprovedSubmissionsCount(approvedSubmissionsCount + 1);
            toast.success("Submission approved successfully!",{
                position: "bottom-right"
            });
        } catch (error) {
            console.error('Error approving submission:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axiosSecure.patch(`/submission/reject/${id}`);
            await refetch();
            toast.error("Submission rejected!",{
                position: "bottom-right"
            });
        } catch (error) {
            console.error('Error rejecting submission:', error);
        }
    };
    const MAX_APPROVED_SUBMISSIONS = 10;
    return (
        <div>
            <div className="flex justify-evenly mb-4 md:mb-8">
                <h2 className="md:text-2xl font-semibold">Available coin:{userData.coin}</h2>
                <h2 className="md:text-2xl font-semibold"> Total payment:{totalPayments}</h2>
            </div>


<div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Task Title</th>
                        <th>Payable Amount</th>
                        <th>View Submission</th>
                        <th>Status</th>
                        <th>Approve</th>
                        <th>Reject</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((pending, index) => (
                        <tr key={pending._id}>
                            <td>{index + 1}</td>
                            <td>{pending.worker_name}</td>
                            <td>{pending.worker_email}</td>
                            <td>{pending.task_title}</td>
                            <td>{pending.payable_amount}</td>
                            <td>
                                <a href={pending.task_img_url} target="_blank" rel="noopener noreferrer">View</a>
                            </td>
                            <td className="badge badge-secondary">{pending.status}</td>
                            <td>
                                <FcCheckmark
                                    className="text-xl cursor-pointer"
                                    onClick={() => handleApprove(pending._id, pending.worker_email, parseInt(pending.payable_amount))
                                    }
                                    disabled={approvedSubmissionsCount >= MAX_APPROVED_SUBMISSIONS}
                                />
                            </td>
                            <td>
                                <FaDeleteLeft
                                    className="text-xl cursor-pointer"
                                    onClick={() => handleReject(pending._id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </div>

        </div>
        
    );
};

export default TaskCreatorHome;
