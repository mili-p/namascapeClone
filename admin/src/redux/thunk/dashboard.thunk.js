import requestApi from '../../common/request'
import Swal from 'sweetalert2'
import {
    requestdashboardView,
    responcedashboardView,
    errordashboardView
} from '../slices/dashboardSlice'


export const asyncdashboardViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestdashboardView())
        const response = await requestApi.post('/master/dashboard', payload)
        dispatch(responcedashboardView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errordashboardView(error))
    }
}
