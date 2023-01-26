import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../Auth'
import BackButton from './BackButton'
import BottomBox from './BottomBox'
import Notification from './Notification'

const GamePage = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  const {gameId} = useParams()
  const [gameData,setGameData] = useState([])
  const [opponentName,setOpponentName] = useState("")
  const [message1,setMessage1] = useState("")
  const [message2,setMessage2] = useState("")
  const [currantGame,setCurruntGame] = useState([])
  const [changeInGame,setChangeInGame] = useState("")
  const [gameDone,setGameDone] = useState(false)
  const [message,setMessage] = useState("")

  useEffect(()=>{
    setTimeout(() => {
      setMessage("")
    }, 3000);
  },[message])
  useEffect(()=>{
    axios.get('/game/getgame/'+gameId)
    .then(res=>{
      setGameData(res.data)
      setChangeInGame(res.data[0].currantGame)
    })
    .catch(err=>{
      console.log(err)
    })
  },[gameDone,gameId])
  const blankFunc = ()=>{}
  useEffect(()=>{
    if(gameData.length>0){
      setMessage1(prev=>{
        switch (gameData[0].status) {
          case 1:
              if(gameData[0].starterId === auth.user) return "Your move"
              else return "Their move "
          case 2:
              if(gameData[0].starterId === auth.user) return "Their move"
              else return "Your move"
          case 3:
              if(gameData[0].starterId === auth.user) return "You Win"
              else return "You Lost"
          case 4:
              return "It's a draw!"
          case 5:
              if(gameData[0].starterId === auth.user) return "You Lost"
              else return "You Win!"
          default:
              break;
        }
      })
      setMessage2(prev=>{
        switch (gameData[0].status) {
          case 1:
              if(gameData[0].starterId === auth.user) return "Submit"
              else return "Waiting for "+opponentName
          case 2:
              if(gameData[0].starterId === auth.user) return "Waiting for "+opponentName
              else return "Submit"
          default:
              return "Start another game"
        }
      })
      setCurruntGame(prev=>{
        let t = getCurrentGame(gameData[0].currantGame)
        return [...t]
      })
    }  
  },[opponentName,gameData])
  const getCurrentGame =(s)=>{
    let t = []
    if(auth.user === gameData[0].starterId){
      for(let i = 0;i < 9;i++){
        if(s[i] === '0'){
          t.push(' ')
        }
        else if(s[i] === '1'){
          t.push('x')
        }
        else{
          t.push('o')
        }
      }
    }
    else{
      for(let i = 0;i < 9;i++){
        if(s[i] === '0'){
          t.push(' ')
        }
        else if(s[i] === '1'){
          t.push('o')
        }
        else{
          t.push('x')
        }
      }
    }
    return t
  }
  useEffect(()=>{
    if(gameData.length > 0){
      const id = auth.user === gameData[0].withWhomId?gameData[0].starterId:gameData[0].withWhomId
      axios.get('/user?id='+id)
      .then(res=>{
          setOpponentName(res.data[0].name)
      })
      .catch(err=>{
          console.log(err)
      })
    }
  },[gameData])
  const addPiece = (i)=>{
    var orignal = gameData[0].currantGame.split('')
    if(orignal[i] === '0' && message1 === "Your move"){
      if(auth.user === gameData[0].starterId){
        orignal[i] = '1'
      }
      else{
        orignal[i] = '2'
      }
    }
    orignal = orignal.join('')
    setChangeInGame(orignal)
    let t =  getCurrentGame(orignal)
    setCurruntGame([...t])
  }
  const getStatus = ()=>{
    if((changeInGame[0] == '1' && changeInGame[1] == '1' && changeInGame[2] == '1') || (changeInGame[3] == '1' && changeInGame[4] == '1' && changeInGame[5] == '1')||(changeInGame[6] == '1' && changeInGame[7] == '1' && changeInGame[8] == '1') || (changeInGame[0] == '1' && changeInGame[3] == '1' && changeInGame[6] == '1')||(changeInGame[1] == '1' && changeInGame[4] == '1' && changeInGame[7] == '1')||(changeInGame[2] == '1' && changeInGame[5] == '1' && changeInGame[8] == '1')||(changeInGame[0] == '1' && changeInGame[4] == '1' && changeInGame[8] == '1') || (changeInGame[2] == '1' && changeInGame[4] == '1' && changeInGame[6] == '1')){
      return 3
    }
    if((changeInGame[0] == '2' && changeInGame[1] == '2' && changeInGame[2] == '2') || (changeInGame[3] == '2' && changeInGame[4] == '2' && changeInGame[5] == '2')||(changeInGame[6] == '2' && changeInGame[7] == '2' && changeInGame[8] == '2') || (changeInGame[0] == '2' && changeInGame[3] == '2' && changeInGame[6] == '2')||(changeInGame[1] == '2' && changeInGame[4] == '2' && changeInGame[7] == '2')||(changeInGame[2] == '2' && changeInGame[5] == '2' && changeInGame[8] == '2')||(changeInGame[0] == '2' && changeInGame[4] == '2' && changeInGame[8] == '2') || (changeInGame[2] == '2' && changeInGame[4] == '2' && changeInGame[6] == '2')){
      return 5
    }
    for(let i = 0;i < changeInGame.length;i++){
      if(changeInGame[i] === '0'){
        if(auth.user === gameData[0].starterId){
          return 2
        }
        else{
          return 1
        }
      }
    }
    return 4
  }
  const submit =()=>{
    if(changeInGame === gameData[0].currantGame){
      setMessage('please play first')
    }
    else{
    let status = getStatus()
    axios.post('/game/updategame',{gameId:gameData[0].gameId,status:status,game:changeInGame})
    .then(res=>{
      if(res.data === 'updated'){
        setGameDone(!gameDone)
      }
    })
    .catch(err=>{
      console.log(err)
    })
    }
  }
  const startNewGame =()=>{
    const withWhomId = auth.user === gameData[0].starterId?gameData[0].withWhomId:gameData[0].starterId
    axios.post('/game/startgame',{starter:auth.user,searchBy:withWhomId})
    .then(res=>{
      if(res){
        if(typeof(res.data) === 'string'){
          setMessage(res.data)
        }
        else{
            navigate('/'+auth.user+'/'+res.data)
        }
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
          <p className='gamewith'>Game with {opponentName}</p>
          <p className='yourpiece'>Your piece</p>
          <p className='xpiece'>x</p>
        </div>
        <div className='statusinfobox' style={{backgroundColor:message1==='You Win'?"#219653":message1==='You Lost'?"#EB5757":'',color:message1==="You Win" || message1==="You Lost"?"white":"black"}}>{message1}</div>
          <div className='inpboxrow'>
            { 
              currantGame.map((e,i)=><div onClick={()=>{addPiece(i)}} className='inpbox' key = {i}><p className={e === 'x'?'xpiece':'opiece'}>{e}</p></div>)
            }
          </div>
          {
            message.length > 0 && <div style = {{position:'fixed',bottom:'200px'}}>
                <Notification color = '#EB5757' message = {message}/>
            </div>
            }
        <BottomBox color={message1 === 'Your move' || message2 === "Start another game"?'#F2C94C':"#E0E0E0"} message = {message2} onClickFunc={message1 === 'Your move'?submit:message2 === "Start another game"?startNewGame:blankFunc}/>
      </div>
    </div>
  )
}

export default GamePage