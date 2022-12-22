import React from 'react'

const Notification = ({color,message}) => {
  return (
    <div className='notification' style = {{backgroundColor:color}}>
        {message}
    </div>
  )
}

export default Notification