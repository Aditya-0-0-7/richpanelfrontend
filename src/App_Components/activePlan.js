import { useEffect, useState } from "react";
import customFetch from "../networkRequest/customFetch";
import './activePlan.css';
function ActivePlan({planBtnHandler,toastHandler,loadingHandler,monthly})
{
    const [planDatas,setPlans]=useState({});
    const [cancelled,setcancelled]=useState(false);
    const changeHandler=()=>{
        planBtnHandler();
    }

    function cancelSubscription()
    {
        if(cancelled)
        {
            toastHandler('Subscription already cancelled');
            return;
        }
        loadingHandler();
        customFetch('https://richpanel-backend-8mf3asl0j-aditya-0-0-7.vercel.app/cancelSubscription',{}).then(async(res)=>{
            if(res.status===200)
            {
                setcancelled(true);
            }
            const data=await res.json();
            toastHandler(data.message);
            loadingHandler();
        }).catch(err=>{
            console.log(err);
            toastHandler("Some Error occured while cancelling the subscription");
            loadingHandler();
        });
    }

    useEffect(()=>{
        loadingHandler();
        customFetch('https://richpanel-backend-8mf3asl0j-aditya-0-0-7.vercel.app/getSubscription',{}).then(async(res)=>{
                if(res.status===200)
                {
                    const data=await res.json();
                    setPlans(data);
                }
                else
                {
                    const data=await res.json();
                    toastHandler(data.message);
                }
                loadingHandler();
        })
    },[]);
    return(<div id='planContainers'>
        <div id="detailHead"><div id='htext'>Current Plan Details</div><div className={cancelled?'cancelled':'active'}>{cancelled?'Cancelled':'Active'}</div><div id='con'><div onClick={cancelSubscription} id="cancelSub">Cancel</div></div></div>
        <div id="detail1" style={{color:'#4f4f4f'}}>{planDatas['Plan Name']}</div>
        <div id="detail1" style={{color:'#aeadaf'}}>{planDatas['Devices']}</div>
        <div id="priceDetail">&#8377; {monthly?planDatas['Monthly Price']?.split(" ")[0]:planDatas['Yearly Price']?.split(" ")[0]}{monthly?'/mo':'/yr'}</div>
        <button id="planButton" onClick={changeHandler}>{cancelled?'Choose Plan':'Change Plan'}</button>
    </div>);
}
export default ActivePlan;