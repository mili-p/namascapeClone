import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    eventmanagement,
    usermanagement,
    home,
    notfound,
    forgotpassword,
    resetpassword,
    myaccount,
    editAccount,
    changepassword,
    aboutus,
    apphomescreen,
    contactus,
    termsandcondition,
    privacypolicy,
    eventorganizermanagement,
    bookingsmanagement,
    paymentmanagement,
    discountcodemanagement,
    eventdetails,
    bookingdetails,
    paymentdetails,
    discountcodedetails,
    adddiscountcode,
    eventuserdetails,
    userdetails,
    vieworganizerprofile,
    addorganizerprofile,
    contactmanagement,
    contactusdetail,
    testimonial,
    addtestimonial,
    viewtestimonial,
    eventcategorymanagement,
    eventcategorydetails,
    addediteventcategory,
    paymentfeesview,
    socialconfirmation
} from './routeConsts'

import NotFound from '../pages/NotFound'

import ProtectedRoutes from './ProtectedRoutes'
import MyAccount from '../pages/MyAccount/MyAccount'


import AuthRoute from '../config/AuthRoute'
import PageLoader from '../components/PageLoader/PageLoader'
import SecondaryLayout from '../components/SecondaryLayout/SecondaryLayout'

//#region Layouts
const MyAccountLayout= React.lazy(()=>import('../components/MyAccountLayout'))
const LRFLayout= React.lazy(()=>import('../components/LRFLayout/LRFLayout'))
//#endregion

import PaymentFees from '../pages/PymentFees'

//#region Dashboard
const Dashboard = React.lazy(()=>import('../pages/Dashboard'))
//#endregion

//#region CMS Section
const CMSLayout = React.lazy(()=>import('../components/CMSLayout'))
const AboutUs = React.lazy(()=>import('../pages/AboutUs'))
const AppHomeScreen = React.lazy(()=>import('../pages/AppHomeScreen'))
const TermsAndCondition = React.lazy(()=>import('../pages/TermsAndCondition'))
const ContactUs = React.lazy(()=>import('../pages/ContactUs'))
const PrivacyPolicy = React.lazy(()=>import('../pages/PrivacyPolicy'))
//#endregion

//#region MyAccount Pages Routes
const EditAccount= React.lazy(()=>import('../pages/EditAccount'))
const ChangePassword= React.lazy(()=>import('../pages/ChangePassword'))
//#endregion

//#region LRF Pages Routes
const Login = React.lazy(()=>import('../pages/Login'))
const ForgotPassword = React.lazy(()=>import('../pages/ForgotPassword'))
const ResetPassword = React.lazy(()=>import('../pages/ResetPassword'))
//#endregion

//#region User Pages Routes
const UserManagement=React.lazy(()=>import('../pages/UserManagement'))
const UserDetails=React.lazy(()=>import('../pages/UserManagement/UserDetails/UserDetails'))
//#endregion

//#region Booking Pages Routes
const BookingsManagement = React.lazy(()=>import('../pages/BookingsManagement'))
const BookingDetails = React.lazy(()=>import('../pages/BookingsManagement/BookingDetails/BookingDetails'))
//#endregion

//#region Payment Pages Routes
const PaymentManagement = React.lazy(()=>import('../pages/PaymentManagement')) 
const PaymentDetails = React.lazy(()=>import('../pages/PaymentManagement/PaymentDetails//PaymentDetails'))
//#endregion

//#region Discount-Code Page Routes
const DiscountCodeManagement = React.lazy(()=>import('../pages/DiscountCodeManagement'))
const DiscountCodeDetails = React.lazy(()=>import('../pages/DiscountCodeManagement/DiscountCodeDetails/DiscountCodeDetails'))
const AddEditDiscountCode = React.lazy(()=>import('../pages/DiscountCodeManagement/AddEditDiscountCode/AddEditDiscountCode'))
//#endregion

//#region Event Organizer Page Routes
const EventOrganizerManagement = React.lazy(()=>import('../pages/EventOrganizerManagement'))
const ViewOrganizerProfile = React.lazy(()=>import('../pages/EventOrganizerManagement/ViewOrganizerProfile/ViewOrganizerProfile'))
const AddEditOrganizerProfile = React.lazy(()=>import('../pages/EventOrganizerManagement/AddEditOrganizerProfile/AddEditOrganizerProfile'))
//#endregion

//#region Testimonial Pages Routes
const Testimonial = React.lazy(()=>import('../pages/Testimonial/Testimonial'))
const AddEditTestimonial = React.lazy(()=>import('../pages/Testimonial/AddEditTestimonial/AddEditTestimonial'))
const ViewTestimonial = React.lazy(()=>import('../pages/Testimonial/ViewTestimonial/ViewTestimonial'))
//#endregion

//#region Event Pages Routes
const EventManagement = React.lazy(()=>import('../pages/EventManagement'))
const EventDetails = React.lazy(()=>import('../pages/EventManagement/EventDetails/EventDetails'))
const EventUserDetails = React.lazy(()=>import('../pages/EventManagement/EventUserDetails/EventUserDetails'))
//#endregion

//#region Contact Pages Routes
const ContactManagement =React.lazy(()=>import('../pages/ContactManagement'))
const ContactDetails = React.lazy(()=>import('../pages/ContactManagement/ContactDetails/ContactDetails'))
//#endregion

//#region Event-Category Pages Routes
const EventCategoryManagement = React.lazy(()=>import('../pages/EventCategoryManagement'))
const ViewEventCategory = React.lazy(()=>import('../pages/EventCategoryManagement/ViewEventCategory/ViewEventCategory'))
const AddEditEventCategory = React.lazy(()=>import('../pages/EventCategoryManagement/AddEditEventCategory'))
//#endregion

//#region Social-confirmation
const SocialConfirmation = React.lazy(()=>import('../pages/SocialConfirmation'))
//#endregion

const Routing = () => {
    const { token } = useSelector((e) => e.signin)

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route element={token ? <SecondaryLayout /> : <LRFLayout />}>
                    <Route
                        path={home}
                        element={token ? <Dashboard /> : <Login />}
                    />
                    <Route element={<AuthRoute />}>
                        <Route
                            path={forgotpassword}
                            element={<ForgotPassword />}
                        />
                        <Route
                            path={resetpassword}
                            element={<ResetPassword />}
                        />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route
                            path={usermanagement}
                            element={<UserManagement />}
                        />
                        <Route path={userdetails} element={<UserDetails />} />
                        <Route
                            path={`${userdetails}/:userId`}
                            element={<UserDetails />}
                        />
                        <Route
                            path={eventorganizermanagement}
                            element={<EventOrganizerManagement />}
                        />
                        <Route
                            path={vieworganizerprofile}
                            element={<ViewOrganizerProfile />}
                        />
                        <Route
                            path={`${vieworganizerprofile}/:userId`}
                            element={<ViewOrganizerProfile />}
                        />
                        <Route
                            path={addorganizerprofile}
                            element={<AddEditOrganizerProfile />}
                        />
                        <Route
                            path={`${addorganizerprofile}/:userId`}
                            element={<AddEditOrganizerProfile />}
                        />
                        <Route
                            path={eventmanagement}
                            element={<EventManagement />}
                        />
                        <Route path={eventdetails} element={<EventDetails />} />
                        <Route
                            path={`${eventdetails}/:eventId`}
                            element={<EventDetails />}
                        />
                        <Route
                            path={eventuserdetails}
                            element={<EventUserDetails />}
                        />
                        <Route
                            path={`${eventuserdetails}/:eventBookingId`}
                            element={<EventUserDetails />}
                        />
                        <Route
                            path={bookingsmanagement}
                            element={<BookingsManagement />}
                        />
                        <Route
                            path={bookingdetails}
                            element={<BookingDetails />}
                        />
                        <Route
                            path={`${bookingdetails}/:eventBookingId`}
                            element={<BookingDetails />}
                        />
                        <Route
                            path={paymentmanagement}
                            element={<PaymentManagement />}
                        />
                        <Route
                            path={paymentdetails}
                            element={<PaymentDetails />}
                        />
                        <Route
                            path={`${paymentdetails}/:eventPaymentId`}
                            element={<PaymentDetails />}
                        />
                        <Route
                            path={discountcodemanagement}
                            element={<DiscountCodeManagement />}
                        />
                        <Route
                            path={discountcodedetails}
                            element={<DiscountCodeDetails />}
                        />
                        <Route
                            path={`${discountcodedetails}/:discountId`}
                            element={<DiscountCodeDetails />}
                        />
                        <Route
                            path={adddiscountcode}
                            element={<AddEditDiscountCode />}
                        />
                        <Route
                            path={`${adddiscountcode}/:discountId`}
                            element={<AddEditDiscountCode />}
                        />

                        {/* new route start  */}
                        <Route
                            path={eventcategorymanagement}
                            element={<EventCategoryManagement />}
                        />
                        <Route
                            path={eventcategorydetails}
                            element={<ViewEventCategory />}
                        />
                        <Route
                            path={`${eventcategorydetails}/:eventcategoryId`}
                            element={<ViewEventCategory />}
                        />
                        <Route
                            path={addediteventcategory}
                            element={<AddEditEventCategory />}
                        />
                        <Route
                            path={`${addediteventcategory}/:eventcategoryId`}
                            element={<AddEditEventCategory />}
                        />

                        {/* end */}
                        <Route
                            path={contactmanagement}
                            element={<ContactManagement />}
                        />
                        <Route
                            path={contactusdetail}
                            element={<ContactDetails />}
                        />
                        <Route
                            path={`${contactusdetail}/:contactUsId`}
                            element={<ContactDetails />}
                        />
                        <Route path={testimonial} element={<Testimonial />} />
                        <Route
                            path={addtestimonial}
                            element={<AddEditTestimonial />}
                        />
                        <Route
                            path={viewtestimonial}
                            element={<ViewTestimonial />}
                        />

                        <Route element={<MyAccountLayout />}>
                            <Route
                                path={editAccount}
                                element={<EditAccount />}
                            />
                            <Route
                                path={changepassword}
                                element={<ChangePassword />}
                            />
                        </Route>
                        <Route element={<CMSLayout />}>
                            <Route path={aboutus} element={<AboutUs />} />
                            <Route
                                path={apphomescreen}
                                element={<AppHomeScreen />}
                            />
                            <Route path={contactus} element={<ContactUs />} />
                            <Route
                                path={termsandcondition}
                                element={<TermsAndCondition />}
                            />
                            <Route
                                path={privacypolicy}
                                element={<PrivacyPolicy />}
                            />
                              <Route
                            path={paymentfeesview}
                            element={<PaymentFees />}
                        />
                               <Route
                            path={socialconfirmation}
                            element={<SocialConfirmation />}
                        />
                        </Route>
                    </Route>
                </Route>

                <Route path={notfound} element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default Routing
