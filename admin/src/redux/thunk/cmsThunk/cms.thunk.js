import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requestcmsList,
    responcecmsList,
    errorcmsList,
    requestcmsView,
    responcecmsView,
    errorcmsView,
    requestcmsUpdate,
    responcecmsUpdate,
    errorcmsUpdate,
} from '../../slices/cmsSlice'


//cms-List
export const asynccmsListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestcmsList())
        const response = await requestApi.post('/cms/list-cms', payload)
        dispatch(responcecmsList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorcmsList(error))
    }
}

//cms-View
export const asynccmsViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestcmsView())
        const response = await requestApi.post('/cms/view',payload)
        dispatch(responcecmsView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorcmsView(error))
    }
}

// editcms
export const asynccmsUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requestcmsUpdate())
        const response = await requestApi.post('/cms/edit', payload)
        
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responcecmsUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorcmsUpdate(error))
    }
}

