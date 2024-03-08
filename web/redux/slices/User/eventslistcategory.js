import { createSlice } from "@reduxjs/toolkit";

const eventslistcategory = createSlice ({
    name: 'eventslistcategory',
    initialState: {
        isLoading: true,
        totalCount: 0,
        eventsListCategoryData: null
    },
    reducers: {
        requestEventsListCategory: (state) => {
            return { ...state, isLoading: true }
        },
        responseEventsListCategory: (state, action) => {
            return { ...state, isLoading: false, eventsListCategoryData: action.payload}
        },
        errorEventsListCategory: (state) => {
            return { ...state, isLoading: false, eventsListCategoryData: null }
        },
        getTotalCountEventsListCategory: (state, action) => {
            return {
              ...state,
              isLoading: false,
              totalCount: action?.payload?.totalCount,
            };
          },
    }
})

export default eventslistcategory.reducer
export const {
    requestEventsListCategory,
    responseEventsListCategory,
    errorEventsListCategory,
    getTotalCountEventsListCategory
} = eventslistcategory.actions