import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import  PaymentForm from'./PaymentForm'; 


const ProcessPeyment = ({handlePayment}) => {
    const stripePromise = loadStripe('pk_test_51IeL05LMxpgSrHM9w9CUGo6youR1jKGI3HT44Zb1oYfzMFUO89IwK88rYxp81OHMGkX9Vr0in7l1fMNlr2adJ1FK0010Ahlv2L');
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm handlePayment={handlePayment} ></PaymentForm>
        </Elements>
    );
};

export default ProcessPeyment;