import {Fragment, useState} from 'react';
import Login from './App_Components/login';
import Register from './App_Components/register';
import Plans from './App_Components/plans';
import Loading from './App_Components/loading';
import Toast from './App_Components/Toast';
import './App.css';
function App() {
  const [screenSelector,setSelectorValue]=useState(0);
  const [displayToast,setDisplay]=useState(false);
  const [toastMessage,setMessage]=useState("");
  const [loading,setLoading]=useState(false);

  const selectorValueUpdater=(value)=>{
    setSelectorValue(value)
  }

  const toastHandler=(msg)=>{
    setDisplay(true);
    setTimeout(()=>{
        setDisplay(false);
    },3000);
    setMessage(msg);
  }

  const loadingHandler=()=>{
    if(!loading)
    {
      setLoading(value=>!value);     
    }
    else
    {
      setTimeout(()=>{
        setLoading(value=>!value);
      },1000);
    }
  }

  return (
  <Fragment>
    {displayToast&&<Toast msg={toastMessage}/>}
    {loading&&<Loading />}
    {screenSelector===0&&<Login selectorValueUpdater={selectorValueUpdater} toastHandler={toastHandler} loadingHandler={loadingHandler} />}
    {screenSelector===1&&<Register selectorValueUpdater={selectorValueUpdater} toastHandler={toastHandler} loadingHandler={loadingHandler} />}
    {screenSelector===2&&<Plans selectorValueUpdater={selectorValueUpdater} toastHandler={toastHandler} loadingHandler={loadingHandler} />}
  </Fragment>
  );
}

export default App;
