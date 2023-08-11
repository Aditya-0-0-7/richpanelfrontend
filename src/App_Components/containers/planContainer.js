import './planContainer.css';
function PlanContainer({plan,monthly,selectedPlan,planSelectionHandler})
{
    return(<div onClick={()=>{planSelectionHandler(plan['Plan Name'])}} id="planContainer">
        <div id="planType" className={selectedPlan===plan['Plan Name']?'selectedPlanType':'unselectedPlanType'}>{plan['Plan Name']}</div>
        <div id="common" className={selectedPlan===plan['Plan Name']?'selectedText':'unSelectedText'}>{monthly?plan['Monthly Price']:plan['Yearly Price']}</div>
        <div id="common" className={selectedPlan===plan['Plan Name']?'selectedText':'unSelectedText'}>{plan['Video Quality']}</div>
        <div id="common" className={selectedPlan===plan['Plan Name']?'selectedText':'unSelectedText'}>{plan['Resolution']}</div>
        <div id="deviceList">{plan['Devices'].split('+').map((device)=>{
            return(<div id="device" className={selectedPlan===plan['Plan Name']?'selectedText':'unSelectedText'}>{device}</div>);
        })}</div>
    </div>);
}
export default PlanContainer;