import React, { useState } from 'react';
import './payment.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from './paymentForm';
import ActivePlan from './activePlan';

const stripePromise = loadStripe('pk_test_51NdEOwSBS3hIoQBZB4SaUOylWlILkCSxOuy6GiO5iWPEIMZFR5nJTpWYMWPntbfsRbbTB9cbJG4yiwUBK7LnUO7500rwEXPNjS');

function Payment({plans,planBtnHandler, selectedPlan, monthly, toastHandler, loadingHandler }) {
    const[payment,setPayment]=useState(false);
    const paymentUpdate=()=>{
        setPayment(val=>!val);
    }
  return (
    <div id="paymentScreen">
        {!payment&&<Elements stripe={stripePromise}>
        <PaymentForm monthly={monthly} plans={plans} paymentUpdate={paymentUpdate} toastHandler={toastHandler} loadingHandler={loadingHandler} selectedPlan={selectedPlan} index={monthly?0:1} />
      </Elements>}
        {payment&&<ActivePlan planBtnHandler={planBtnHandler} monthly={monthly} toastHandler={toastHandler} loadingHandler={loadingHandler}/>}
    </div>
  );

}

export default Payment;
