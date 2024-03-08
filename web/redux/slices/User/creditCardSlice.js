const { createSlice } = require("@reduxjs/toolkit");

const creditCardSlice = createSlice({
    name : "creditcard",
    initialState : {
        session : null,
        orderRef: null,
        statusDetail : "Hello",
        bookedEvent : false,
        errorMessage : null,
        isPaymentLoder : true,
        statusLoader : false,
        config: {
            storePaymentMethod: true,
            paymentMethodsConfiguration: {
              ideal: {
                showImage: true,
              },
            //   card: {
            //     hasHolderName: true,
            //     holderNameRequired: true,
            //     name: "Credit or debit card",
            //     amount: {
            //       value: 10000, // 100€ in minor units
            //       currency: "EUR",
            //     },
            //   },
            },
            locale: "en_US",
            showPayButton: true,
            clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
            environment: "test",
          },
          
    },
    reducers : {
        requestSessionList : (state,action) => {
            return{
                ...state, isPaymentLoder : true
            }
        },
        successSessionList : (state,action) => {
            return{
                ...state, session : action?.payload?.response , orderRef : action?.payload?.orderRef , isPaymentLoder : false
            }
        },
        failureSessionList : (state,action) => {
            return{
                ...state, isPaymentLoder : false , bookedEvent : action?.payload?.userBookedEvent
            }
        },
        requestStatusList : (state,action) => {
            return{
                ...state, statusLoader : true
            }
        },
        successStatusList : (state,action) => {
            return{
                ...state, statusDetail : action.payload , statusLoader : false
            }
        },
        failureStatusList : (state,action) => {
            return{
                ...state, statusLoader : false 
            }
        },
        failureBookedEvent : (state,action) => {
            console.log(action,"action?.payload");
            return{
                ...state , bookedEvent : action?.payload?.userBookedEvent, errorMessage : action?.payload?.message
            }
        },
        LoderChanges : (state,action) => {
            return {
                ...state, isPaymentLoder : false
            }
        }
    }
})

export const {requestSessionList,failureSessionList,successSessionList,LoderChanges,failureBookedEvent,failureStatusList,requestStatusList,successStatusList} = creditCardSlice.actions
export default creditCardSlice.reducer