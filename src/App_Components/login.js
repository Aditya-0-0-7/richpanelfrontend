import { useState } from 'react';
import './login.css';
import './loginAndRegisterCommon.css';

function Login({selectorValueUpdater,toastHandler,loadingHandler})
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [remember,setRemember]=useState(false);

    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }

    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }

    const rememberHandler=()=>{
        setRemember(value => !value);
    }

    const loginHandler= ()=>{
        if(email.length===0)
        {
            toastHandler("Please enter the email");
        }
        else if(password.length===0)
        {
            
            toastHandler("Please enter the Password");
        }
        else
        {
            loadingHandler();
            fetch('https://richpanel-backend-64uw5gjo8-aditya-0-0-7.vercel.app/login',{
                method: "POST",
                mode:'cors',
                body: JSON.stringify({email:email,password:password,remember:remember}),
                headers: {
                "Content-Type": "application/json"
                }
            }
            ).then(async (res)=>{
                loadingHandler();
                if(res.status===200)
                {
                    const data=await res.json();
                    localStorage.setItem("token",data.token);
                    selectorValueUpdater(2);
                }
                else
                {
                    const parsedRes= await res.json(); 
                    toastHandler(parsedRes.message);
                }
            }).catch((err)=>{
                loadingHandler();
                toastHandler("Some error occured during login");
            });
        }
    }

    return(
        <div id="screen">
            <div className="container loginContainer">
                <div id="heading1">Login to your account</div>
                <div id="credentialContainer">
                    <div id="heading2">Email</div>
                    <input id="credentialInput" onChange={emailHandler} value={email}/>
                </div>
                <div id="credentialContainer">
                    <div id="heading2">Password</div>
                    <input type="password" onChange={passwordHandler} id="credentialInput" value={password} />
                </div>
                <div id="message">
                    <input type='checkbox' checked={remember} onChange={rememberHandler}/> <div>Remember Me</div>
                </div>
                <button id="loginBtn" onClick={loginHandler}>Login</button>
                <div id="bottomMessage">New to MyApp? <div id="link" onClick={()=>{selectorValueUpdater(1)}}>Sign Up</div></div>
            </div>
        </div>
    );
}
export default Login;