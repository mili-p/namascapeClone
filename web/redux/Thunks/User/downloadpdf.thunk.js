import requestApi from "@/utils/request";
import {
    requestDownloadPdf,
    responseDownloadPdf,
    errorDownloadPdf
} from '../../slices/User/downloadpdf'
import { sweetalert } from "@/app/components/common/Common";

///////  DownloadPdf Api calling  ///////
export const asyncDownloadPdf = (payload, Callback) => async (dispatch) => {
    try {
        dispatch(requestDownloadPdf())
        const res = await requestApi.post('/endUser/event-booking/download-ticket', payload)
        dispatch(responseDownloadPdf(res))
        if (typeof Callback === 'function') {
            Callback()
        }
    } catch (error) {
        sweetalert({
            message:error.message,
            type:"error"
        })
        // console.log(error,"action")
        dispatch(errorDownloadPdf())
    }
}