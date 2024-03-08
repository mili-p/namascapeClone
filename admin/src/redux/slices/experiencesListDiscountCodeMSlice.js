import { createSlice } from "@reduxjs/toolkit";

const experiencesSlice = createSlice({
    name : "experiencesList",
    initialState : {
        experiencesList: [],
        experiencesLoader : false
    },
    reducers : {
        requestExperienceList : (state,action) => {
            return {
                ...state, experiencesLoader :true
            }
        },
        responceExperienceList : (state,action) => {
            return {
                ...state, experiencesLoader : false, experiencesList : action?.payload
            }
        },
        errorExperienceList : (state,action) => {
            return {
                ...state, experiencesLoader : false
            }
        },
    }
})

export const {requestExperienceList,errorExperienceList,responceExperienceList} = experiencesSlice.actions
export default experiencesSlice.reducer