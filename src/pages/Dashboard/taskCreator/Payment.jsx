import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";

const stripePromise=loadStripe(import.meta.env.VITE_PAYMENT_GETWAY_PK)
const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckoutForm ></CheckoutForm>

            </Elements>
        </div>
    );
};

export default Payment;