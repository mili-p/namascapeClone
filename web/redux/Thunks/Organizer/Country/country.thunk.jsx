import { sweetalert } from '@/app/components/common/Common';
import requestApi from '@/utils/request';
import { countryDataFailure, countryDataRequest, countryDataSuccess } from '../../../slices/Organizer/Country/CountrySlice';

export const countryThunk = (params,callback) => async(dispatch) => {
    try {
        dispatch(countryDataRequest())
        const {data} = await requestApi.post("/countries/list-country",params);
        dispatch(countryDataSuccess(data))
        if(typeof callback === "function"){
          return callback()
        }
      } catch (e) {
        sweetalert({
          message:e?.message,
          type: "error"
      })
        dispatch(countryDataFailure(e))
      }
}