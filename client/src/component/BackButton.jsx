import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate()
    const goBack=()=>{
        navigate(-1)
    }
  return (
    <div className='backArrow properMargin' onClick={goBack}> <IoIosArrowBack style={{fontSize:'25px'}}/> </div>
  )
}

export default BackButton