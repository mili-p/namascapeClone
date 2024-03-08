import requestApi from '../../../common/request'
import Swal from 'sweetalert2'
import {
    requesteventList,
    responceeventList,
    erroreventList,
    requesteventView,
    responceeventView,
    erroreventView,
    requesteventUpdate,
    responceeventUpdate,
    erroreventUpdate,
    requesteventDelete,
    responceeventDelete,
    erroreventDelete,
    requesteventsponser,
responceeventeventsponser,
erroreventeventsponser,
requesteventAcceptDecline,
responceeventeventAcceptDecline,
erroreventeventAcceptDecline,
requesteventListDownload,
responceeventListDownload,
erroreventListDownload,
requestGetCity,
SuccessGetCity,
FailureGetCity
} from '../../slices/eventSlice'


//event -List
export const asynceventListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requesteventList())
        const response = await requestApi.post('/event/list-event', payload)
        dispatch(responceeventList(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreventList(error))
    }
}

// View- event
export const asynceventViewThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requesteventView())
        const response = await requestApi.post('/event/view-event', payload)
        dispatch(responceeventView(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreventView(error))
    }
}

//Update- event
export const asynceventUpdateThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requesteventUpdate())
        const response = await requestApi.post('/event/add-edit', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        // dispatch(asyncSizeListThunk())
        dispatch(responceeventUpdate(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreventUpdate(error))
    }
}

//Update- event- sponser
export const asyncEventSponserThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requesteventsponser())
        const response = await requestApi.post('/event/change-sponsored', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
        dispatch(responceeventeventsponser(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreventeventsponser(error))
    }
}

//Update- event- accept-Decline
export const asyncEventAcceptDeclineThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requesteventAcceptDecline())
        const response = await requestApi.post('/event/change-event-status', payload)

        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
      
        dispatch(responceeventeventAcceptDecline(response))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(erroreventeventAcceptDecline(error))
    }
}

//event-Delete
export const asynceventDeleteThunk = (payload, callback) => async (dispatch) => {
    try {
        dispatch(requesteventDelete())
        const response = await requestApi.post('/event/delete-event', payload)
        dispatch(responceeventDelete(response))
        if (typeof callback === 'function') {
            callback()
        }
        Swal.fire({
            text: response?.meta?.message,
            icon: 'success'
        })
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        if (typeof callback === 'function') {
            callback(true)
        }
        dispatch(erroreventDelete(error))
    }
}

//event list Download
export const downloadListEvents = (payload) => async (dispatch) => {
    try {
        dispatch(requesteventListDownload())
        const response = await requestApi.post('/event/list-event', payload)
        dispatch(responceeventListDownload(response))
    } catch (error) {
        Swal.fire({
            text: error?.meta?.message,
            icon: 'error'
        })
        dispatch(erroreventListDownload(error))
    }
}

//city list 
export const getCityThunk = (params) => async (dispatch) => {
    try {
      dispatch(requestGetCity());
      const { data } = await requestApi.post("/cities/endUser/list-city", params);
      dispatch(SuccessGetCity(data));
    } catch (e) {
      sweetalert({
        message: e?.message,
        type: "error",
      });
      dispatch(FailureGetCity(e));
    }
  };