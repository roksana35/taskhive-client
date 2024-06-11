import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdminHome = () => {
    
    const axiosSecure=useAxiosSecure();

    const {data:userData=[]}=useQuery({
        queryKey:['userData'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/allusers')
            console.log(result.data)
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


    const {data:withdrawData=[]}=useQuery({
        queryKey:['withdraws'],
        queryFn:async()=>{
            const result= await axiosSecure.get('/withdraws')
            console.log(result.data)
            return result.data;
        }
    })
    return (
        <div> 
            <div className="flex justify-evenly mb-8">
                <h2 className="text-2xl font-semibold">Total Users:{userData.length}</h2>
                <h2 className="text-2xl font-semibold"> Total Coin:{totalCoinsData?.totalCoins}</h2>
                <h2 className="text-2xl font-semibold"> Total Payments:{withdrawData.length}</h2>
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
        withdrawData.map((pdata,index)=>(
            <tr key={pdata._id}>
    <th>{index+1}</th>
    
    <td>{pdata.
worker_name}</td>
    <td>{pdata.withdraw_coin}</td>
    <td>{pdata.withdraw_amount}</td>
    <td>{pdata.account_number}</td>
<td>{pdata.payment_system}</td>
<td>{pdata.withdraw_time}</td>
<td>delete</td>
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