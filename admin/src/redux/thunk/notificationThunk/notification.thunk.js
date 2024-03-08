import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestnotificationList,
    responcenotificationList,
    errornotificationList,
    requestnotificationView,
    responcenotificationView,
    errornotificationView,
    requestnotificationRead,
responcenotificationRead,
errornotificationRead,
AllNoificationData

} from '../../slices/notificationSlice'


//notification -List
export const asyncNotificationListThunk = (params,callback,page) => async (dispatch) => {
    try {
        dispatch(requestnotificationList())
        const {data,meta} = await requestApi.post('/notifications/get-all-notifications',params)
        dispatch(responcenotificationList({data,meta}))
        dispatch(AllNoificationData({data: data,page}))
        if(typeof callback === "function"){
            callback(data)
          }
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errornotificationList(error))
    }
}

// View- notification
export const asyncnotificationViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestnotificationView())
        const response = await requestApi.post('/notifications/view-notifications', payload)
        dispatch(responcenotificationView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errornotificationView(error))
    }
}

// Read- Notification
export const asyncnotificationReadThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestnotificationRead())
        const response = await requestApi.post('/notifications/read-single-notifications', payload)
        dispatch(responcenotificationRead(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errornotificationRead(error))
    }
}