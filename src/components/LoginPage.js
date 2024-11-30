import axios from "axios"
import { useState } from "react"
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom"

const LoginPage=()=>{
    const navigateTo=useNavigate()

    const[username,setUsername]=useState('')
    const[password,setPassword]=useState('')
    const[errorMsg,setErrorMsg]=useState('')

    const onChangeName=event=>{
        setUsername(event.target.value)
    }

    const onChangePassword=event=>{
        setPassword(event.target.value)
    }


    const onSubmitForm=async(event)=>{
        event.preventDefault()
        const details={username,password}
        const url='https://fakestoreapi.com/products'
        try{
            const response=await axios.post(url,details)
            Cookies.set('jwt_token',response.data.token,{expires:30})
            navigateTo('/')

        }catch(error){
            setErrorMsg('login details failed')
        }
    }

    return(
        <div style={{display:'flex'}} >
            <div style={{backgroundColor:'gold',height:'100vh',width:'50vw',padding:'10px'}} >
                <h1>Here there is no login details required</h1>
                <p>you can just enter any details or just click on Login button where you have seen under form.</p>
                <p>This is just for a refrence</p>
                <p>Particular api is required for login details so u just enter any details</p>
            </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center', backgroundColor:'red',height:'100vh',width:'50vw',padding:'10px'}}  >
                    <form onSubmit={onSubmitForm} >
                        <h1>Login into Application</h1>
                        <div>
                            <label>Username:</label>
                            <input value={username} onChange={onChangeName} placeholder="username" type="text" />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input value={password} onChange={onChangePassword} placeholder="password" type="password" />
                        </div>
                        {errorMsg && <p>*{errorMsg}</p>}
                        <button>Login</button>
                    </form>
                </div>
        </div>
    )
}

export default LoginPage