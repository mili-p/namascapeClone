const { createSlice } = require("@reduxjs/toolkit");

const categorySponsoredSlice = createSlice({
    name : "categorySponsoredSlice",
    initialState : {
        isLoadingSponsored : true,
        sponsoredList : null
    },
    reducers:{
        requestCategorySponsoredList : (state,action)=> {
            return {...state,isLoadingSponsored:true}
        },
        successCategorySponsoredList : (state,action)=> {
            return {...state,isLoadingSponsored:false,sponsoredList:action?.payload}
        },
        failureCategorySponsoredList : (state,action)=> {
            return {...state,isLoadingSponsored:false}
        }
    }
})

export const {failureCategorySponsoredList,requestCategorySponsoredList,successCategorySponsoredList}  = categorySponsoredSlice.actions
export default categorySponsoredSlice.reducer