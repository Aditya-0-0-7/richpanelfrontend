import { useEffect, useState } from "react";
import customFetch from "../networkRequest/customFetch";
import './activePlan.css';
function ActivePlan({selectorValueUpdater,toastHandler,loadingHandler,monthly})
{
    const [planDatas,setPlans]=useState({});
    const [cancelled,setcancelled]=useState(false);
    const changeHandler=()=>{
        selectorValueUpdater(2);
    }

    useEffect(()=>{
        loadingHandler();
        customFetch('http://localhost:5000/getSubscription',{}).then(async res=>{
                const data=await res.json();
                console.log(data);
                setPlans(data);
                loadingHandler();
        })
    },[]);
    return(<div id='planContainer'>
        <div id="detailHead"><div id='htext'>Current Plan Details</div><div className={cancelled?'cancelled':'active'}>{cancelled?'Cancelled':'Active'}</div><div id='con'><div id="cancelSub">cancel</div></div></div>
        <div id="detail1">{planDatas['Plan Name']}</div>
        <div id="detail1">{planDatas['Devices']}</div>
        <div id="priceDetail">&#8377; {monthly?planDatas['Monthly Price']?.split(" ")[0]:planDatas['Yearly Price']?.split(" ")[0]}/yr</div>
        <button id="planButton" onClick={changeHandler}>Change Plan</button>
    </div>);
}
export default ActivePlan;