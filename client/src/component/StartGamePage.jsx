import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import BackButton from './BackButton'
import BottomBox from './BottomBox'
import Notification from './Notification'

const StartGamePage = () => {
    const [searchBy,setSearchBy] = useState("")
    const auth = useAuth()
    const navigate = useNavigate()
    const [message,setMessage] = useState("")
    useEffect(()=>{
        setTimeout(() => {
            setMessage("")
        }, 3000);
    },[message])
    const startGame = ()=>{
        axios.post('/game/startgame',{starter:auth.user,searchBy:searchBy})
        .then(res=>{
            if(typeof(res.data) === 'string'){
                setMessage(res.data)
            }
            else{
                navigate('/'+auth.user+'/'+res.data)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    return (
    <div className='home-page'>
        <BackButton/>
        <div className='properMargin'>
            <div>
                <p className='top-margin top'>Start a new game</p>
                <p className='main-heading'>Whom do you want to play with?</p>
                <form>
                    <p className='top'>Email</p>
                    <input type="text" name="searchBy" placeholder='Type their emai/username' value = {searchBy} onChange={(e)=>{setSearchBy(e.target.value)}} />
                </form>
            </div>
            {
            message.length > 0 && <div style = {{position:'fixed',bottom:'200px'}}>
                <Notification color = '#EB5757' message = {message}/>
            </div>
            }
            <div style = {{position:'fixed',bottom:'120px'}}>
                <BottomBox color={'#F2C94C'} message='Start game' onClickFunc={startGame}/>
            </div>
        </div>
    </div>
  )
}

export default StartGamePage