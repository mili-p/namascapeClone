import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { home, signin } from './routeConsts'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
    const { token } = useSelector((e) => e.signin)
    return token ? <Outlet /> : <Navigate to={home} replace/>
}

export default PrivateRoutes
