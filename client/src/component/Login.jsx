import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import BackButton from './BackButton'
import BottomBox from './BottomBox'
import Notification from './Notification'

const Login = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const [details,setDetails] =useState({
    userName:'',
    password:''
  })
  const [errorMesage,setErrorMessage] = useState("")
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate('/'+loggedInUser)
    }
  },[]);
  useEffect(()=>{
    setTimeout(() => {
      setErrorMessage("")
    }, 3000);
  },[errorMesage])
  const handleDetailsChange =(e)=>{
    const {name,value} = e.target
    setDetails(prev=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const login = ()=>{
    if(details.userName && details.password){  
      axios.post('/user/login',details)
      .then(res=>{
        if(res.data === 'logedInSuccessfully'){
          auth.login(details.userName)
          navigate('/'+details.userName)
        }
        else{
          setErrorMessage(res.data)
        }
      })  
      .catch(err=>{
        console.log(err)
      })
    }else{
      setErrorMessage("Please fill all details")
    }
  }
  return (
    <div className='home-page'>
        <BackButton />
        <div className='properMargin'>
            <p className='top-margin top'>Login</p>
            <p className='main-heading'>Please enter your details</p>
            <form>
                <p className='top'>Username</p>
                <input autoFocus value = {details.userName} placeholder = 'Type your username here' onChange={handleDetailsChange} type="text" name="userName"/>
                <p className='top'>Password</p>
                <input placeholder = 'Type your password here' value = {details.password} onChange={handleDetailsChange} type="password" name="password"/>
            </form>
        </div>
        {
          errorMesage.length > 0 && <div style = {{position:'fixed',bottom:'200px'}}>
          <Notification color = '#EB5757' message = {errorMesage}/>
        </div>
        }
        <div className='loginbBar'>
          <BottomBox color={'#F2C94C'} message='Login' onClickFunc={login}/>
        </div>
    </div>
  )
}

export default Login