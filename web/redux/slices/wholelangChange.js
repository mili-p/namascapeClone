import { createSlice } from '@reduxjs/toolkit'

const wholelangChange = createSlice({
    name : "wholelangChange",
    initialState : {
        langChangeData :typeof localStorage !== 'undefined' ?  localStorage.getItem('language') : 'en'
    },
    reducers : {
        langChangeSlice : (state,action)=>{
            // console.log(action?.payload ,"888888888888888888");
            const AAA = localStorage.setItem('language',action?.payload)
            console.log(AAA,"99999");
            return {...state,langChangeData : AAA}
        }
    }
})

export const {langChangeSlice} = wholelangChange.actions
export default wholelangChange.reducer