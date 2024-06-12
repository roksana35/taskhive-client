import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";


const AdminHome = () => {
    const {user}=useAuth();
    
    const axiosSecure=useAxiosSecure();

    const {data:userData=[],refetch}=useQuery({
        queryKey:['userData'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/allusers')
            // console.log(result.data)
            return result.data;
        }
    })


    const { data: totalCoinsData } = useQuery({
        queryKey: ['totalCoins'],
        queryFn: async () => {
          const result = await axiosSecure.get('/totalcoins');
          return result.data;
        }
      });


    const {data:paymentData=[]}=useQuery({
        queryKey:['payments'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/payments')
            // console.log(result.data)
            return result.data;
        }
    })
    const {data:withdrawData=[]}=useQuery({
        queryKey:['withdraws'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/withdraws')
            // console.log(result.data)
            return result.data;
        }
    })

    const handlePaymentSuccess = (id) => {
        console.log('Attempting to delete withdrawal with id:', id); // Log the ID being sent
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
                axiosSecure.delete(`/withdraw/${id}`)
                    .then(res => {
                        
                        console.log('Delete response:', res.data); // Log the response from the server
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(error => {
                        console.error('Error handling withdraws success:', error); // Log the error
                    });
            }
        });
    };
    // const handlePaymentSuccess = (id) => {
    //     axiosSecure.delete(`/withdrawals/${id}`)
    // .then(res => {
    //     console.log(res.data)
    //     // Optionally refetch data to update the UI
    //     // refetch(); // Assuming you're using react-query's refetch function
    // })
    // .catch(error => {
    //     console.error('Error handling payment success:', error);
    // });
    // }
   
    


    return (
        <div> 
            <div className="flex justify-evenly mb-8">
                <h2 className="md:text-2xl font-semibold">Total Users:{userData.length}</h2>
                <h2 className="md:text-2xl font-semibold"> Total Coin:{totalCoinsData?.totalCoins}</h2>
                <h2 className="md:text-2xl font-semibold"> Total Payments:{paymentData.length}</h2>
            </div>
       
        <div className="overflow-x-auto">
<table className="table table-zebra">
{/* head */}
<thead>
  <tr>
    <th></th>
    <th>
    worker_name</th>
    
   
    <th> withdraw_coin</th>
    <th> Withdraw amount</th>
    <th>Payment Number</th>
    <th> Payment_system</th>
    <th>withdraw_time</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
    {
        withdrawData.map((wdata,index)=>(
            <tr key={wdata._id}>
    <th>{index+1}</th>
    
    <td>{wdata.
worker_name}</td>
    <td>{wdata.withdraw_coin}</td>
    <td>{wdata.withdraw_amount}</td>
    <td>{wdata.account_number}</td>
<td>{wdata.payment_system}</td>
<td>{wdata.withdraw_time}</td>
<td> <button  onClick={()=>handlePaymentSuccess(wdata._id)} className="text-green-600 font-semibold">success</button>
</td>
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

export default AdminHome;