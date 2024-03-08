import requestApi from '../../common/request'
import Swal from 'sweetalert2'
import { 
    requestaboutusView,
    responceaboutusView,
    erroraboutusView,
    requestaboutusUpdate,
    responceaboutusUpdate,
    erroraboutusUpdate,}
     from '../slices/aboutusSlice'

//cms-View
export const asyncaboutusViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestaboutusView())
        const response = await requestApi.post('/about-us/view',payload)
        dispatch(responceaboutusView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroraboutusView(error))
    }
}

// editcms
export const asyncaboutusUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestaboutusUpdate())
        const response = await requestApi.post('/about-us/edit', payload)
        
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responceaboutusUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroraboutusUpdate(error))
    }
}

