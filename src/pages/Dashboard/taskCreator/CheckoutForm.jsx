import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";


const CheckoutForm = () => {
    const {price}=useParams();
    const [error,setError]=useState('');
    const [clientSecret,setclientSecret]=useState('');
    const [transactionId,setTransactionId]=useState('');
    const stripe=useStripe();
    const elements=useElements();
    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();
   console.log(price)

   const convertCoinsToDollars = (coins) => {
    if (coins === 10) return 1;
    if (coins === 100) return 9;
    if (coins === 500) return 19;
    if (coins === 1000) return 39;
    return 0;
};

const priceInDollars = convertCoinsToDollars(parseInt(price));
        const priceInCents = priceInDollars * 100;
// };
// const priceInDollars = convertCoinsToDollars(parseInt(price));

// // const price = convertCoinsToDollars((coins));
    useEffect(()=>{
        axiosSecure.post('/create-payment-inten',{price:priceInCents})
        .then(res=>{
            console.log(res.data.clientSecret)
            setclientSecret(res.data.clientSecret)
        })
    },[axiosSecure,priceInCents])
    const handleSubmit=async(event)=>{
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
          }
          const card=elements.getElement(CardElement);
          if (card == null) {
            return;
          }

          const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card,
          })
          if(error){
            console.log('payment error',error)
            setError(error.message)
        }
        else{
            console.log('paymentMethod',paymentMethod)
            setError('')
        }

        // confirm payment
        const {paymentIntent,error:confirmError}=await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email ||'anonymous',
                    name: user?.displayName || 'anonymous'

                }
            }
        })
        if(confirmError){
            console.log('confirm error')

        }
        else{
            console.log('paymentIntent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id',paymentIntent.id)
                setTransactionId(paymentIntent.id)
                const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
                const payment={
                  email:user.email,
                  name:user.displayName,
                  current_date:new Date ().toLocaleDateString('en-US', options),
                  coin_purchase:price,
                  amount:priceInDollars
                }
                const res =await axiosSecure.post('/payment',payment);
                console.log('payment saved',res.data)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
             <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {
        transactionId && <p className="text-green-500">Your transaction id:{transactionId}</p>
      }
        </form>
    );
};

export default CheckoutForm;