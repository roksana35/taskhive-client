import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data:paymentData=[]}=useQuery({
        queryKey:['user',user.email],
        queryFn:async()=>{
            const result= await axiosSecure.get(`/payment/${user.email}`)
            // console.log(result.data)
            return result.data;
        }
    })
    return (
        <div> 
            <h2 className="text-3xl font-semibold mb-5">Total Payments:{paymentData.length}</h2>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>
        TransactionId</th>
        
       
        <th>Coin_Purchase</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
        {
            paymentData.map((pdata,index)=>(
                <tr key={pdata._id}>
        <th>{index+1}</th>
        
        <td>{pdata.transactionId}</td>
        <td>{pdata.coin_purchase}</td>
        <td>{pdata.amount}</td>
        <td>{pdata.current_date}</td>
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

export default PaymentHistory;