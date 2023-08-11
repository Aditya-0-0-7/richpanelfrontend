import {
    CardElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";
import customFetch from '../networkRequest/customFetch';
import './paymentForm.css';
function PaymentForm({plans,monthly,paymentUpdate,toastHandler,loadingHandler,selectedPlan,index})
{
    console.log(plans);
    const stripe = useStripe();
    const elements = useElements();
    const createSubscription=async()=>{
        try
        {
            loadingHandler();
            const paymentMethod = await stripe.createPaymentMethod({
                card: elements.getElement("card"),
                type: "card",
              });
            const response = await customFetch("https://richpanel-backend-64uw5gjo8-aditya-0-0-7.vercel.app/payment",{
                paymentMethod: paymentMethod.paymentMethod.id,
                plan:selectedPlan,
                index:index
              });
            
            if(response.status!=200)
            {
                loadingHandler();
                toastHandler("Payment unsuccessful!");
                return;
            }

            const data = await response.json();
            const confirm = await stripe.confirmCardPayment(data.clientSecret);

            console.log(confirm);

            if(confirm.error)
            {
                loadingHandler();
                toastHandler("Payment unsuccessful!");
                return;
            }
            toastHandler("Payment Successful");
            paymentUpdate();
            loadingHandler();
        }
        catch(err)
        {
            loadingHandler();
            toastHandler("Can not make payment some error occured");
        }
    }
    return(<div id='paymentFormContainer'>
        <div id="cardDetail">
            <div id="paymentHead">Complete Payment</div>
            <div id='mess'>Enter your credit card details below</div>
            <div id="card">
            <CardElement options={{style:{
                base: {
                color: '#32325d',
                width:'28vw',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4',
                },
                },
                invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
                },
            }}}/>
            </div>
            <button id='paybtn' onClick={createSubscription}>Confirm Payment</button>
        </div>
        <div id="orderDetail">
            <div id="summary">Order Summary</div>
            <div id="item"><div>Plan Name</div><div>{plans['Plan Name']}</div></div>
            <div id="item"><div>Billing Cycle</div><div>{monthly?'Monthly':'Yearly'}</div></div>
            <div id="item"><div>Plan Price</div><div>&#8377; {monthly?plans['Monthly Price']?.split(' ')[0]:plans['Yearly Price']?.split(' ')[0]}{monthly?'/mo':'/ye'}</div></div>
            
        </div>
    </div>);
}
export default PaymentForm;