import { createSlice } from "@reduxjs/toolkit";

const sponsoredevents = createSlice ({
    name: 'sponsoredevents',
    initialState: {
        isSponsoredLoading: true,
        totalSponsoredCount: 0,
        sponsoredEventsData: null
    },
    reducers: {
        requestSponsoredEventsList: (state) => {
            return { ...state, isSponsoredLoading: true }
        },
        responseSponsoredEventsList: (state, action) => {
            return { ...state, isSponsoredLoading: false, sponsoredEventsData: action.payload}
        },
        errorSponsoredEventsList: (state) => {
            return { ...state, isSponsoredLoading: false, sponsoredEventsData: null }
        },
        getTotalCountSponsoredEventsList: (state, action) => {
            return {
              ...state,
              isSponsoredLoading: false,
              totalSponsoredCount: action?.payload?.totalCount,
            };
        },
    }
})

export default sponsoredevents.reducer
export const {
    requestSponsoredEventsList,
    responseSponsoredEventsList,
    errorSponsoredEventsList,
    getTotalCountSponsoredEventsList,
} = sponsoredevents.actions