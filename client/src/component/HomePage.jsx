import React, { useEffect } from 'react'
import BottomBox from './BottomBox'
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../Auth'
const HomePage = () => {
  const navigate = useNavigate()
  const routeToLogin =()=>{
    navigate('/login')
  }
  const routeToRegister =()=>{
    navigate('/register')
  }
  const auth = useAuth()
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      // const foundUser = JSON.parse(loggedInUser);
      auth.login(loggedInUser)
      // console.log(loggedInUser)
      navigate('/'+loggedInUser)
    }
  },[]);
  return (
    <div className='home-page'>
      <div className='home-page-heading'>
        <p className='top-heading'>async</p>
        <p className='heading'>tic tac</p>
        <p className='heading'>toe</p>
      </div>
      <BottomBox color = '#F2C94C' message='Login' onClickFunc={routeToLogin}/>
      <BottomBox color = '#2F80ED' message='Register'onClickFunc={routeToRegister}/>
    </div>
  )
}

export default HomePage