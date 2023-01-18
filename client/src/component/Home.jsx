import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import BottomBox from './BottomBox'
import GameBox from './GameBox'

const Home = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [gameList,setgameList] = useState([])
    useEffect(()=>{
        axios.get('/game/'+auth.user)
        .then(res=>{
            setgameList(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    const startgamepage= ()=>{
        navigate('startgame')
    }
    const logOut = ()=>{
        auth.logout()
        localStorage.removeItem('user')
        navigate('/')
    }
  return (
    <div className='home-page'>
        <div className='properMargin'>
            <div className='top-bar'>
                <p className='your-games'>Your Games</p>
                <button onClick={logOut}>Log out</button>
            </div>
            {
                gameList.length === 0?<div>
                    <div className='no-games-found'>No Games Found</div>
                    <BottomBox onClickFunc={startgamepage} color = '#F2C94C' message='Start a new game'/>
                </div>:<div className='newButtonContainer'>
                        <div className='gameboxlist'>
                            {
                                gameList.map(element=><GameBox key = {element.gameId} data = {element}/>)
                            }
                        </div>
                    <button onClick={startgamepage} className='newGame'> + New Game</button>
                </div>
            }
        </div>
    </div>
  )
}

export default Home