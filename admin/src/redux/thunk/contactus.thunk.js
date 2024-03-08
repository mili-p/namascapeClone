import requestApi from '../../common/request'
import Swal from 'sweetalert2'

import {
    requestcontatusView,
    responcecontatusView,
    errorcontatusView,
    requestcontatusUpdate,
    responcecontatusUpdate,
    errorcontatusUpdate,
    requestCountryCodeGet,
    responceCountryCodeGet,
    errorCountryCodeGet
} from '../slices/contactusSlice'

//cms-View
export const asynccontatusViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestcontatusView())
        const response = await requestApi.post('/contact-us/view-config', payload)
        dispatch(responcecontatusView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorcontatusView(error))
    }
}

//cms-Edit
export const asynccontatusUpdateThunk =
    (payload, callback) => async (dispatch) => {
        try {
            dispatch(requestcontatusUpdate())
            const response = await requestApi.post('/contact-us/edit-config', payload)

            if (typeof callback === 'function') {
                callback()
            }
            Swal.fire({
                text: response?.meta?.message,
                icon: 'success'
            })
            dispatch(responcecontatusUpdate(response))
        } catch (error) {
            Swal.fire({
                text: error?.message,
                icon: 'error'
            })
            dispatch(errorcontatusUpdate(error))
        }
    }


    export const asynccountryCodeGetThunk=(payload)=>async(dispatch)=>{
            try{
                dispatch(requestCountryCodeGet())
            const response = await requestApi.post('/countries/list-country', payload)
            dispatch(responceCountryCodeGet(response))

            }catch(error){
                Swal.fire({
                    text:error?.message,
                    icon:'error'
                })
                dispatch(errorCountryCodeGet(error))
            }
    }