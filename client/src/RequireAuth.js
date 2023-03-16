import React from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { useAuth } from './Auth'

const RequireAuth = ({children}) => {
  const auth = useAuth()
  const location = useLocation()
  // console.log(location)
  if(!auth.user){
    return <Navigate to = '/login' state={{path:location.pathname}}/>
  }
    return children
}

export default RequireAuth