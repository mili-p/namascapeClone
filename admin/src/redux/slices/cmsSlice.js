import { createSlice } from '@reduxjs/toolkit'

const cmsSlice = createSlice({
    name: 'cms',
    initialState: {
        cms: null,
        cmsList: null,
        isLoading: true,
        isUpdateLoading:false
    },
    reducers: {
        //Listing CMS
        requestcmsList: (state) => {
            return { ...state, isLoading: true }
        },
        responcecmsList: (state,action) => {
            return { ...state, isLoading: false, cmsList: action.payload }
        },
        errorcmsList: (state) => {
            return { ...state, isLoading: false, cmsList: null }
        },

        //View cms
        requestcmsView: (state) => {
            return { ...state, isLoading: true }
        },
        responcecmsView: (state,action) => {
            return { ...state, isLoading: false, cms: action.payload }
        },
        errorcmsView: (state) => {
            return { ...state, isLoading: false,cms:null }
        },

        // update cms

        requestcmsUpdate: (state) => {
            return { ...state, isLoading: true }
        },
        responcecmsUpdate: (state) => {
            return { ...state, isLoading: false }
        },
        errorcmsUpdate: (state) => {
            return { ...state, isLoading: false }
        }
        
    }
})

export default cmsSlice.reducer

export const {
    requestcmsList,
    responcecmsList,
    errorcmsList,
    requestcmsView,
    responcecmsView,
    errorcmsView,
    requestcmsDelete,
    responcecmsDelete,
    errorcmsDelete,
    errorcmsUpdate,
    requestcmsUpdate,
    responcecmsUpdate
} = cmsSlice.actions
