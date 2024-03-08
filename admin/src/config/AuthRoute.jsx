import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { home, signin } from './routeConsts'
import { useSelector } from 'react-redux'

const AuthRoute = () => {
    const { token } = useSelector((e) => e.signin)
    console.log(token,"token")
    return token ? <Navigate to={home}  /> : <Outlet />
}

export default AuthRoute
