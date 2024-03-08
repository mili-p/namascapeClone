import { createSlice, current } from "@reduxjs/toolkit";

const TermsandConditionsSlice = createSlice({
  name: "termsandconditions",
  initialState: {
    tandcLoader: false,
    tandcData: null,
    addEditLoader : false
  },
  reducers: {
    requestTermsAndConditionsAddEdit: (state, action) => {
      return {
        ...state,addEditLoader : true
      };
    },
    successTermsAndConditionsAddEdit: (state, action) => {
      return {
        ...state,addEditLoader : false
      };
    },
    failureTermsAndConditionsAddEdit: (state, action) => {
      return {
        ...state,addEditLoader : false
      };
    },
    requestTermsAndConditionsView : (state, action) => {
        return {
            ...state,tandcLoader :true
          };
    },
    successTermsAndConditionsView : (state, action) => {
        return {
            ...state,tandcData : action?.payload, tandcLoader :false
          };
    },
    failureTermsAndConditionsView : (state, action) => {
        return {
            ...state,tandcLoader :false
          };
    },
  },
});

export const {
  requestTermsAndConditionsAddEdit,
  successTermsAndConditionsAddEdit,
  failureTermsAndConditionsAddEdit,
  failureTermsAndConditionsView,
  requestTermsAndConditionsView,
  successTermsAndConditionsView
} = TermsandConditionsSlice.actions;
export default TermsandConditionsSlice.reducer;
