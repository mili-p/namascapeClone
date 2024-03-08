import requestApi from '../../common/request'
import Swal from 'sweetalert2'
import {
    requestapphomescreenView,
    responceapphomescreenView,
    errorapphomescreenView,
    requestapphomescreenUpdate,
    responceapphomescreenUpdate,
    errorapphomescreenUpdate    
} from '../slices/apphomescreenSlice'
//cms-View
export const asyncapphomescreenViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestapphomescreenView())
        const response = await requestApi.post('/blog/view-blog',payload)
        dispatch(responceapphomescreenView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorapphomescreenView(error))
    }
}

// editcms
export const asyncapphomescreenUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestapphomescreenUpdate())
        const response = await requestApi.post('/blog/add-edit-blog', payload)
        
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responceapphomescreenUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorapphomescreenUpdate(error))
    }
}

