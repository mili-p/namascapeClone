import requestApi from "@/utils/request"
import { failureCityFilter, requestCityFilter, successCityFilter } from "../../slices/User/userCityListFilter"

export const cityFilterDataThunk = (payload,Callback) => async (dispatch) => {
    try {
        dispatch(requestCityFilter())
        const {data} = await requestApi.post(`/cities/endUser/list-city`,payload)
        dispatch(successCityFilter(data))
        if(typeof Callback === 'function'){
            Callback()
        }
    } catch (error) {
        dispatch(failureCityFilter())
    }
}