import { createSlice } from "@reduxjs/toolkit";

const downloadpdf = createSlice ({
    name: 'downloadpdf',
    initialState: {
        isPdfLoading: true,
        downloadpdfData: null
    },
    reducers: {
        requestDownloadPdf: (state) => {
            return { ...state, isPdfLoading: true }
        },
        responseDownloadPdf: (state, action) => {
            return { ...state, isPdfLoading: false, downloadpdfData: action.payload}
        },
        errorDownloadPdf: (state) => {
            return { ...state, isPdfLoading: false, downloadpdfData: null }
        }
    }
})

export default downloadpdf.reducer
export const {
    requestDownloadPdf,
    responseDownloadPdf,
    errorDownloadPdf
} = downloadpdf.actions