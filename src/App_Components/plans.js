import {useState,useEffect} from 'react';
import customFetch from '../networkRequest/customFetch';
import PlanContainer from './containers/planContainer';
import Payment from './payment';
import './plans.css';

function Plans({selectorValueUpdater,toastHandler,loadingHandler})
{
    const [planData,setData]=useState([]);
    const [monthly,setMonthly]=useState(true);
    const [selectedPlan,setSelectedPlan]=useState("Basic");
    const [paymentScreen,setScreen]=useState(false);
    const[planObject,setObject]=useState({});

    const periodMonthlyHandler=()=>{
        setMonthly(true);
    }

    const periodYearlyHandler=()=>{
        setMonthly(false);
    }

    const planSelectionHandler=(value)=>{
        const obj=planData.filter((v)=>{
            if(v['Plan Name']===value)
                return(true)
            return(false);
        })[0];
        console.log(obj);
        setObject(obj);
        setSelectedPlan(value);
    }

    const planBtnHandler=()=>{
        setScreen(true);
    }

    useEffect(()=>{
        if(planData.length===0)
        {
            loadingHandler();
            customFetch('http://localhost:5000/fetchPlans',{}).then(async (res)=>{
                loadingHandler();
                if(res.status===200)
                {
                    const data=await res.json();
                    setData(data.data);
                    setObject(data.data.filter((v)=>{
                        if(v['Plan Name']==='Basic')
                            return(true)
                        return(false);
                    })[0]);
                }
                else if(res.status()===401)
                {
                    const data=await res.json();
                    toastHandler(data.message);
                    selectorValueUpdater(0);
                }
                else
                {
                    const parsedRes= await res.json(); 
                    toastHandler(parsedRes.message);
                }
            }).catch((err)=>{
                loadingHandler();
                toastHandler("Some Error occured while fetching the plans. Please refresh the page");
            });
        }
    },[]);

    return(
        !paymentScreen?<div id="planScreen">
            <hr className='line1'/>
            <hr className='line2'/>
            <hr className='line3'/>
            <div id="planMessage">Choose the right plan for you</div>
            <div id="contentContainer">
                <div id="leftContent">
                    <div id="periodHolder">
                        <div id="periodContainer">
                            <div id={monthly?'selectedPeriod':'unselectedPeriod'} onClick={periodMonthlyHandler}>Monthly</div>
                            <div id={!monthly?'selectedPeriod':'unselectedPeriod'} onClick={periodYearlyHandler}>Yearly</div>
                        </div>
                    </div>
                    <div className="leftContentCommon leftContent">Monthly price</div>
                    <div className="leftContentCommon leftContent">Video quality</div>
                    <div className=" leftContentCommon leftContent">Resolution</div>
                    <div className="leftContentCommon">Devices you can use to watch</div>
                </div>
                <div id="rightContent">
                    {planData.map((plan)=>{
                        return <PlanContainer planSelectionHandler={planSelectionHandler} selectedPlan={selectedPlan} key={plan['Plan Name']} plan={plan} monthly={monthly}/>
                    })}
                </div>
            </div>
            <div id="bottomContent">
                <button id='planBtn' onClick={planBtnHandler}>Next</button>
            </div>
        </div>
        :
        <Payment plans={planObject} selectorValueUpdater={selectorValueUpdater} monthly={monthly} selectedPlan={selectedPlan} toastHandler={toastHandler} loadingHandler={loadingHandler} />
    );
}
export default Plans;