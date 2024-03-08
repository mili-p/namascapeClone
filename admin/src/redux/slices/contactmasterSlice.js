import { createSlice } from '@reduxjs/toolkit'

const contactmasterSlice = createSlice({
    name: 'contactmaster',
    initialState: {
        contactmaster: null,
        contactmasterList: null,
        isLoading: true,
        isDeleteLoading: false,
    },

    reducers: {
        //Listing contactmasters
        requestcontactmasterList: (state) => {
            return { ...state, isLoading: true }
        },
        responcecontactmasterList: (state, action) => {
            return { ...state, isLoading: false, contactmasterList: action.payload }
        },
        errorcontactmasterList: (state) => {
            return { ...state, isLoading: false, contactmasterList: null }
        },

        //View contactmaster
        requestcontactmasterView: (state) => {
            return { ...state, isLoading: true }
        },
        responcecontactmasterView: (state, action) => {
            return { ...state, isLoading: false, contactmaster: action.payload }
        },
        errorcontactmasterView: (state) => {
            return { ...state, isLoading: false, contactmaster: null }
        },

        //delete contactmaster
        requestcontactmasterDelete: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responcecontactmasterDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        },
        errorcontactmasterDelete: (state) => {
            return { ...state, isDeleteLoading: false }
        }
    }
})
export default contactmasterSlice.reducer

export const {
    requestcontactmasterList,
    responcecontactmasterList,
    errorcontactmasterList,
    requestcontactmasterView,
    responcecontactmasterView,
    errorcontactmasterView,
    requestcontactmasterDelete,
    responcecontactmasterDelete,
    errorcontactmasterDelete
} = contactmasterSlice.actions