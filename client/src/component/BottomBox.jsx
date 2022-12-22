import React from 'react'

const BottomBox = ({color,message,onClickFunc}) => {
  return (
    <div className='bottom-box' onClick={()=>{onClickFunc()}} style = {{backgroundColor:color}}>
        {message}
    </div>
  )
}

export default BottomBox