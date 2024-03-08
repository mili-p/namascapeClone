import authentication from "./authentication"
import viewprofile from './viewprofile'
import myaccount from "./OrganizerAccount/myaccount"
import languagechange from "./languagechange"
import contactus from "./User/contactus"
import EventFormSlice from './Organizer/EventForm/EventFormSlice'
import EventManagementSlice from './Organizer/EventManagement/EventManagementSlice'
import NotificationSlice from '../slices/Organizer/Notification/NotificationSlice'
import eventslist from './User/eventslist'
import eventslistcategory from "./User/eventslistcategory"
import DashboardSlice from './Organizer/Dashboard/DashboardSlice'
import EventBookingSlice from './Organizer/EventBooking/EventBookingSlice'
import organizerprofile from './User/organizerprofile'
import eventdetailspayment from './User/eventdetailspayment'
import bookevent from './User/bookevent'
import viewbookingticket from './User/viewbookingticket'
import userprofile from './User/userprofile'
import otheruserprofile from './User/otheruserprofile'
import sponsoredevents from './User/sponsoredevents'
import eventattendees from './User/eventattendees'
import wholelangChange from './wholelangChange'
import downloadpdf from './User/downloadpdf'
import creditCardSlice from './User/creditCardSlice'
import categorySponsoredSlice from './User/categorySponsored'
import userCityListFilter from './User/userCityListFilter'
import countrySlice from './Organizer/Country/CountrySlice'
import TermsandConditionsSlice from './Organizer/TermsandConditions/TermsandConditionsSlice'
import TermsandConditionsUserSlice from './User/TermsandConditionsUserSlice/TermsandConditionsUserSlice'
import AttendessAcceptDeclineSlice from './User/AttendessAcceptDeclineSlice/AttendessAcceptDeclineSlice'
export const rootReducer = {
    authentication,
    viewprofile,
    myaccount,
    languagechange,
    contactus,
    EventFormSlice,
    EventManagementSlice,
    eventslist,
    eventslistcategory,
    DashboardSlice,
    organizerprofile,
    NotificationSlice,
    eventdetailspayment,
    bookevent,
    EventBookingSlice,
    viewbookingticket,
    userprofile,
    otheruserprofile,
    sponsoredevents,
    eventattendees,
    wholelangChange,
    downloadpdf,
    creditCardSlice,
    categorySponsoredSlice,
    userCityListFilter,
    countrySlice,
    TermsandConditionsSlice,
    TermsandConditionsUserSlice,
    AttendessAcceptDeclineSlice
}