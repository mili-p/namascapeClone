import requestApi from "../../../common/request"
import { errorExperienceList, requestExperienceList, responceExperienceList } from "../../slices/experiencesListDiscountCodeMSlice"

export const asyncExperienceListThunk = (payload) => async (dispatch) => {
    try {
        dispatch(requestExperienceList())
        const {data} = await requestApi.post('/event/list-event-dropdown', payload)
        dispatch(responceExperienceList(data))
    } catch (error) {
        Swal.fire({
            text: error?.message,
            icon: 'error'
        })
        dispatch(errorExperienceList(error))
    }
}