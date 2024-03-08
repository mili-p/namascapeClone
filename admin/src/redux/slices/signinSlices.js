import { createSlice, current } from '@reduxjs/toolkit'

const signinSlices = createSlice({
    name: 'signin',
    initialState: {
        token: JSON.parse(localStorage.getItem('adminToken')) ?? null,
        adminDetails: JSON.parse(localStorage.getItem('admin')) ?? null,
        isLoading: false,
        device_token: JSON.parse(localStorage.getItem('device_token')) ?? null,
        isDeleteLoading: false
    },
    reducers: {
        requestSignin: (state) => {
            return { ...state, isLoading: true }
        },
        responseSignin: (state, action) => {
            localStorage.setItem(
                'adminToken',
                JSON.stringify(action.payload?.meta?.token)
            )
            localStorage.setItem('admin', JSON.stringify(action.payload?.data))
            return {
                ...state,
                isLoading: false,
                token: action.payload?.meta?.token,
                adminDetails: action.payload?.data
            }
        },

        responseEditProfile: (state, action) => {
            localStorage.setItem('admin', JSON.stringify(action.payload?.data))
            return {
                ...state,
                isLoading: false,
                adminDetails: {
                    ...action.payload?.data,
                    profilePicture:
                        action.payload?.localImg ??
                        action.payload?.data?.profilePicture
                }
            }
        },
        errorSignin: (state) => {
            return { ...state, isLoading: false }
        },
        storedeviceToken: (state, action) => {
            localStorage.setItem('device_token', JSON.stringify(action.payload))
            return { ...state, device_token: action.payload }
        },
        requestLogout: (state) => {
            return { ...state, isDeleteLoading: true }
        },
        responseLogout: (state, action) => {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('admin')
            // localStorage.removeItem('device_token')
            return {
                ...state,
                token: null,
                adminDetails: null,
                isDeleteLoading: false,
                // device_token: null
            }
        },
        errorLogout: (state) => {
            return { ...state, isDeleteLoading: false }
        }
    },

    extraReducers: (builder) => {
        builder.addCase('auth/logout', () => {
            localStorage.removeItem('adminToken')
            localStorage.removeItem('admin')
            // localStorage.removeItem('device_token')
            return {
                token: null,
                adminDetails: null,
                isLoading: false,
                device_token: null
            }
        }),
            builder.addCase('admin/updateProfile', (state, action) => {
                localStorage.setItem('admin', JSON.stringify(action.payload))
                return {
                    ...state,
                    adminDetails: { ...state?.adminDetails, ...action.payload }
                }
            })
    }
})

export default signinSlices.reducer
export const {
    errorSignin,
    requestSignin,
    responseSignin,
    responseEditProfile,
    storedeviceToken,
    errorLogout,
    requestLogout,
    responseLogout
} = signinSlices.actions
