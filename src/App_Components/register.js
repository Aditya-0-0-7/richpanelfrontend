import { useState } from 'react';
import './loginAndRegisterCommon.css';
import './register.css';

function Register({selectorValueUpdater,toastHandler,loadingHandler})
{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [name,setName]=useState("");
    const [remember,setRemember]=useState(false);

    const emailHandler=(event)=>{
        setEmail(event.target.value);
    }

    const passwordHandler=(event)=>{
        setPassword(event.target.value);
    }

    const nameHandler=(event)=>{
        setName(event.target.value);
    }

    const rememberHandler=()=>{
        setRemember(value => !value);
    }

    const signUpHandler=()=>{
        if(name.length===0)
            toastHandler("Please enter the value for name");
        else if(email.length===0)
            toastHandler("please enter the value for email");
        else if(password.length===0)
            toastHandler("Please enter the value for password");
        else
        {
            loadingHandler();
            fetch('http://localhost:5000/register',{
                method: "POST",
                mode:'cors',
                body: JSON.stringify({email:email,password:password,name:name}),
                headers: {
                "Content-Type": "application/json"
                }
            }
            ).then(async (res)=>{
                loadingHandler();
                if(res.status===200)
                {
                    console.log('runned');
                    const parsedRes= await res.json(); 
                    toastHandler(parsedRes.message);
                    setTimeout(()=>{selectorValueUpdater(0)},1000);
                }
                else
                {
                    const parsedRes= await res.json(); 
                    toastHandler(parsedRes.message);
                }
            }).catch((err)=>{
                loadingHandler();
                toastHandler("Some error occured during Sign Up");
            });
        }
    }

    return(
        <div id="screen">
            <div className="registerContainer container">
                <div id="heading1">Create Account</div>
                <div id="credentialContainer">
                    <div id="heading2">Name</div>
                    <input value={name} onChange={nameHandler} id="credentialInput" />
                </div>
                <div id="credentialContainer">
                    <div id="heading2">Email</div>
                    <input value={email} onChange={emailHandler} id="credentialInput" />
                </div>
                <div id="credentialContainer">
                    <div id="heading2">Password</div>
                    <input type="password" value={password} onChange={passwordHandler} id="credentialInput" />
                </div>
                <div id="message">
                    <input type='checkbox' checked={remember} onChange={rememberHandler}/> <div>Remember Me</div>
                </div>
                <button id="loginBtn" onClick={signUpHandler}>Sign Up</button>
                <div id="bottomMessage">Already have an account? <div id="link" onClick={()=>{selectorValueUpdater(0)}}>Login</div></div>
            </div>
        </div>
    );
}
export default Register;