import { createSlice } from '@reduxjs/toolkit'

const apphomescreenSlice = createSlice({
    name: 'apphomescreen',
    initialState: {
        apphomescreen: null,
        isLoading: true,
        isUpdateLoading:false
    },
    reducers: {

        //View apphomescreen
        requestapphomescreenView: (state) => {
            return { ...state, isLoading: true }
        },
        responceapphomescreenView: (state,action) => {
            return { ...state, isLoading: false, apphomescreen: action.payload }
        },
        errorapphomescreenView: (state) => {
            return { ...state, isLoading: false,cms:null }
        },

        // update apphomescreen
        requestapphomescreenUpdate: (state) => {
            return { ...state, isLoading: true }
        },
        responceapphomescreenUpdate: (state) => {
            return { ...state, isLoading: false }
        },
        errorapphomescreenUpdate: (state) => {
            return { ...state, isLoading: false }
        }
        
    }
})

export default apphomescreenSlice.reducer

export const {
    requestapphomescreenView,
    responceapphomescreenView,
    errorapphomescreenView,
    requestapphomescreenUpdate,
    responceapphomescreenUpdate,
    errorapphomescreenUpdate
    
} = apphomescreenSlice.actions
