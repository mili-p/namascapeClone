
import signinSlices from './signinSlices'
import forgotpasswordSlice from './forgotpasswordSlice'
import resetpasswordSlice from './resetpasswordSlice'
import editprofileSlice from './editprofileSlice'
import updateprofileSlice from './updateprofileSlice'
import cmsSlice from './cmsSlice'
import aboutusSlice from './aboutusSlice'
import contactusSlice from './contactusSlice'
import apphomescreenSlice from './apphomescreenSlice'
import userSlice from './userSlice'
import dashboardSlice from './dashboardSlice'
import eventSlice from './eventSlice'
import discountCodeSlice from './discountCodeSlice'
import contactmasterSlice from './contactmasterSlice'
import notificationSlice from './notificationSlice'
import bookingSlice from './bookingSlice'
import paymentSlice from './paymentSlice'
import experiencesListDiscountCodeMSlice from './experiencesListDiscountCodeMSlice'
export const rootReducer = {
    signin: signinSlices,
    editprofile: editprofileSlice,
    updateprofile: updateprofileSlice,
    forgotpassword: forgotpasswordSlice,
    resetpassword: resetpasswordSlice,
    cms: cmsSlice,
    aboutus:aboutusSlice,
    contactus:contactusSlice,
    apphomescreen:apphomescreenSlice,
    user:userSlice,
    dashboard:dashboardSlice,
    event:eventSlice,
    discountcode:discountCodeSlice,
    contactmaster:contactmasterSlice,
    notification:notificationSlice,
    booking:bookingSlice,
    payments:paymentSlice,
    experiencesSlice : experiencesListDiscountCodeMSlice
    }
