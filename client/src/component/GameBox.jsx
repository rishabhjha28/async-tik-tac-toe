import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import BottomBox from './BottomBox'

const GameBox = ({data}) => {
    const [opponentName, setOpponentName] = useState("")
    const [lastUpdatedAt,setLastUpdatedAt] = useState("")
    const [status,setStatus] = useState("")
    const auth = useAuth()
    const navigate = useNavigate()
    const openGame = ()=>{
        navigate('/'+auth.user+'/'+data.gameId.toString())
    }
    const dateFormater =(date)=>{
        let ans = ""
        ans = ans + date.slice(8,10)
        switch (date.slice(8,10)) {
            case '01':
                ans = ans + 'st '
                break;
            case '02':
                ans = ans + 'nd '
                break;
            case '03':
                ans = ans + 'rd '
                break;
            default:
                ans = ans + 'th '
        }
        switch(date.slice(5,7)){
            case '01':
                ans = ans + 'Jan '
                break
            case '02':
                ans = ans + 'Feb '
                break
            case '03':
                ans = ans + 'Mar '
                break
            case '04':
                ans = ans + 'Apr '
                break
            case '05':
                ans = ans + 'May '
                break
            case '06':
                ans = ans + 'Jun '
                break
            case '07':
                ans = ans + 'Jul '
                break
            case '08':
                ans = ans + 'Aug '
                break
            case '09':
                ans = ans + 'Sept '
                break
            case '10':
                ans = ans + 'Oct '
                break
            case '11':
                ans = ans + 'Nov '
                break
            case '12':
                ans = ans + 'Dec '
                break
            default:
                break
        }
        ans = ans + date.slice(0,4)+', ' + date.slice(11,16)
        return ans
    }
    useEffect(()=>{
        setStatus(getStatus(data.status))
    },[opponentName])
    const getStatus = (n)=>{
        switch (n) {
            case 1:
                if(data.starterId === auth.user) return opponentName + " Just made their move! It's your turn to play now"
                else return "You've made your move! waiting for "+opponentName
            case 2:
                if(data.starterId === auth.user) return "You've made your move! waiting for "+opponentName 
                else return opponentName + " Just made their move! It's your turn to play now"
            case 3:
                if(data.starterId === auth.user) return "You Won!"
                else return opponentName +" Won!"
            case 4:
                return "It's a draw!"
            case 5:
                if(data.starterId === auth.user) return opponentName + " Won!"
                else return "You Won!"
            default:
                break;
        }
    }
    useEffect(()=>{
        const id = auth.user === data.withWhomId?data.starterId:data.withWhomId
        axios.get('/user?id='+id)
        .then(res=>{
            setOpponentName(res.data[0].name)
        })
        .catch(err=>{
            console.log(err)
        })
        setLastUpdatedAt(dateFormater(data.lastUpdatedAt))
    },[])
    return (
    <div className='gamebox'>
        <p className='headinggamebox'>Game with {opponentName}</p>
        <p className='gameboxstatus'>{status}</p>
        <p className='updat'>{lastUpdatedAt}</p>
        <BottomBox color={'#F2C94C'} message = {(data.status === 3 || data.status === 4 || data.status === 5 || (data.status === 2 && data.starterId === auth.user) || (data.status === 1 && data.starterId !== auth.user))?'View game':'Play!'} onClickFunc={openGame}/>
    </div>
  )
}

export default GameBox