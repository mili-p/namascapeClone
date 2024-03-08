import React, { useEffect } from 'react'
import Routing from './config/routing';
import './assets/style/font-style.scss';
import './assets/style/global.scss';
import { useDispatch, useSelector } from 'react-redux';
import { asyncnotificationReadThunk } from './redux/thunk/notificationThunk/notification.thunk';

function App() {
  const dispatch = useDispatch()
 const notificationId= useSelector((e)=>e.notification.notificationId)
 useEffect(()=>{
  if(notificationId)
  {
   dispatch(asyncnotificationReadThunk({notificationId})) 
  }
 },[notificationId])
  return  <Routing />
}

export default App