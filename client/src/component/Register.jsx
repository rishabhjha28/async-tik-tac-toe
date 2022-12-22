import React, { useEffect, useState } from 'react'
import BackButton from './BackButton'
import BottomBox from './BottomBox'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import Notification from './Notification'

const Register = () => {
    const navigate = useNavigate()
    const auth = useAuth()

    const [details,setDetails]=useState({
        name:'',
        userName:'',
        email:'',
        password:''
    })
    const [erorMessage,setErrorMessage] = useState("")
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          // const foundUser = JSON.parse(loggedInUser);
          auth.login(loggedInUser)
          // console.log(loggedInUser)
          navigate('/'+loggedInUser)
        }
      },[]);
    useEffect(()=>{
        setTimeout(() => {
            setErrorMessage("")
        }, 3000);
    },[erorMessage])
    const handleDetailsChange =(e)=>{
        const {name,value} = e.target
        setDetails(prev=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }
    const register = ()=>{
        if(details.name && details.userName && details.email && details.password){  
            axios.post('/user/register',details)
            .then(res=>{
                if(res.data === "userAlreadyExist"){
                    setErrorMessage(res.data)
                }else if(res.data === "userCreated"){
                    auth.login(details.userName)
                    localStorage.setItem('user', details.userName)
                    navigate('/'+details.userName)
                }else{
                    setErrorMessage(res.data)
                }
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
        }
        else{
            setErrorMessage("Please fill all the details")
        }
    }
    return (
    <div className='home-page'>
        <BackButton />
        <div className='properMargin'>
            <p className='top-margin top'>Create account</p>
            <p className='main-heading'>Let's get to know You better!</p>
            <form>
                <p className='top'>Your name</p>
                <input required value = {details.name} onChange={handleDetailsChange} placeholder='Type your name here' type="text" autoFocus name="name"/>
                <p className='top'>UserName</p>
                <input required value = {details.userName} onChange={handleDetailsChange} placeholder='Type your username here' type="text" name="userName"/>
                <p className='top'>Email</p>
                <input required value = {details.email} onChange={handleDetailsChange} placeholder='Type your email here' type="email" name="email"/>
                <p className='top'>Password</p>
                <input required value = {details.password} onChange={handleDetailsChange} placeholder='Type your password here' type="password" name="password"/>
            </form>
        </div>
        {
          (erorMessage.length > 0) && <div style = {{position:'fixed',bottom:'190px'}}>
          <Notification color = '#EB5757' message = {erorMessage}/>
        </div>
        }
        <div className='bBar'>
            <BottomBox color={'#F2C94C'} message='Register' onClickFunc={register}/>
        </div>
    </div>
  )
}

export default Register