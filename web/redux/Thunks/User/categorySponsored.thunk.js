import { failureCategorySponsoredList, requestCategorySponsoredList, successCategorySponsoredList } from "../../slices/User/categorySponsored"
import requestApi from "@/utils/request";

export const sponsoredDataListCategory = (parms,Callback) =>async (dispatch) => {
    console.log(parms,"TTTTTTTTTTTT");
    try {
     dispatch(requestCategorySponsoredList())
     const {data,meta} = await requestApi.post(`/endUser/web/events/category-sponsored-list`,parms)
     dispatch(successCategorySponsoredList(data)) 
     if(typeof Callback === "function"){
        Callback()
     } 
    } catch (error) {
        dispatch(failureCategorySponsoredList())
    }
}


