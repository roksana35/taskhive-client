import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const WithDraw = () => {
    const { user } = useAuth();
    const axiosSecure=useAxiosSecure();
    
    const [maxWithdrawAmount, setMaxWithdrawAmount] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
      } = useForm()
    
       // Watch coin input to calculate amount
    const watchCoin = watch("coin");

    useEffect(() => {
        if (watchCoin) {
            const amount = watchCoin / 20;
            setValue("amount", amount.toFixed(2));
        }
    }, [watchCoin, setValue]);

    useEffect(()=>{
        axiosSecure.get(`/usersinfo/${user.email}`)
        .then(response => {
            const coins = response.data.coin;
            const maxAmount = coins / 20;
            setMaxWithdrawAmount(maxAmount.toFixed(2));
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    },[user.email])

      const onSubmit = async(data) => {
        console.log(data)
        const withdrawalData = {
            worker_email: user.email,
            worker_name: user.displayName,
            withdraw_coin: data.coin,
            withdraw_amount: data.amount,
            payment_system: data.payment,
            account_number: data.account,
            withdraw_time: new Date().toLocaleDateString(),
        };
        console.log(withdrawalData)

        // Validate if the withdrawal amount is within permissible limit
        if (parseFloat(data.amount) > parseFloat(maxWithdrawAmount)) {
            alert('The amount exceeds your maximum withdrawal limit.');
            return;
        }

        try {
            const res = await axiosSecure.post('/withdraw', withdrawalData);
            console.log(res.data);
            
            if(res.data.insertedId){
                console.log('data add successfully')
                reset();
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Data Add  successfully into withdrawCollection',
                  showConfirmButton: false,
                  timer: 1500,
                  
              });
        } 
    }
    catch (error) {
            console.error('Error processing withdrawal:', error);
        }
    }




    return (
        <div className=" min-h-screen bg-base-200">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            {/* coin & account */}
    <div className="flex gap-4 ">
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text"> Coin To WithDraw
</span>
      </label>
      <input type="number"  {...register("coin",{required:true})}  placeholder=" Coin To WithDraw
" className="input input-bordered w-full" />
{errors.coin && <span className='text-red-600'>This field is required</span>}
      
    </div>

    
   
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">withdraw_amount
</span>
      </label>
      <input type="number"  {...register("amount",{required:true})}  placeholder=" withdraw_amountl
" className="input input-bordered w-full" />
{errors.amount && <span className='text-red-600'>This field is required</span>}
      
    </div>
    


    </div>

    {/*  Select Payment System & Account Number
 */}
    <div className="flex gap-4 ">

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">  Select Payment System </span>
      </label>
      <select defaultValue="default" {...register('payment', { required: true })} className="select select-bordered w-full">
      <option  disabled value="default">Select Payment System</option>
                        <option value="Bkash">Bkash</option>
                        <option value="Rocket">Rocket</option>
                        <option value="Nagad">Nagad</option>
      </select>
      {errors.payment && (
                <span className="text-red-600">This field is required</span>
              )}
                        
                   
    </div>
    
<div className="form-control w-full">
  <label className="label">
    <span className="label-text"> Account Number
    </span>
  </label>
  <input type="text" {...register("account",{required:true})}  placeholder=" Account Number" className="input input-bordered w-full"  />
  {errors.account && <span className='text-red-600'>This field is required</span>}
  
</div>



</div>


    <div>
        <button className="btn btn-secondary w-full">Submit</button>
    </div>
  </form>

</div>
    );
};

export default WithDraw;