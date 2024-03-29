import React from 'react'
import App from '../../App'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute=({children})=> {
    const login = true
    return(    login ? children : <Navigate to ="/login"/>)

}

export default PrivateRoute