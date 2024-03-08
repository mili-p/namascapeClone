// export const EVENTCATEGORY = [
//     { id: 1, title: 'GATHERING' },
//     { id: 2, title: 'RETREAT' },
//     { id: 3, title: 'TREATS' },
//     { id: 4, title: 'CLASSES' }
// ]
export const EVENTCATEGORY = [
    { id: 1, title: 'EVENTS' },
    { id: 2, title: 'RETREATS' },
    { id: 3, title: 'TREATS' },
    { id: 4, title: 'CLASSES' },
   {id: 7, title: 'COACHINGS' },
  {id : 8 , title : 'TRAININGS'}
]

export const Currency = [
    { title: '$', id: 1, name: 'USD' },
    { title: '₣', id: 2, name: 'CHF' },
    { title: '€', id: 3, name: 'EUR' }
]

export const DISCOUNTTYPE = [
    { id: 1, title: 'FLAT' },
    { id: 2, title: 'PERCENT' },
]

///// hiren new create discountType ///
export const DISCOUNTTYPENEW = [
    { id: 1, title: 'FLAT' },
    { id: 2, title: 'PERCENT' },
    {id : 3 , title: 'SOLELY NOTIFICATION'}
] 

export const EVENTSTATUS = [
    {
        id: 1,
        title: 'IN REVIEW'
    },
    {
        id: 2,
        title: 'ACTIVE'
    },
    {
        id: 3,
        title: 'REJECTED'
    }
]

export const EVENTTYPE = [
    { id: 1, title: 'ONLINE' },
    { id: 2, title: 'OFFLINE' },
    { id: 3, title: 'AS_A_GIFT' },
    // { id: 4, title: 'FOR_MYSELF' }
]

export const languageList = {
    1: 'English',
    2: 'German'
}

export const EventRecurrence = [
    { title: 'Not Repeated', id: 1 },
    { title: 'Every Day', id: 2 },
    { title: 'Every Week', id: 3 },
    { title: 'Every Month', id: 4 },
    { title: "Every Two Week", id: 5 },
]

export const CreateEventType = [
    { title: 'Free', id: 1 },
    { title: 'Paid', id: 2 }
]

export const NOTIFICATIONTYPE = [
    { title:"USER_JOIN_EVENT",id: 1 },
    { title:"ADMIN_ACCEPT_EVENT",id: 2 },
    { title:"ADMIN_REJECT_EVENT",id: 3 },
    { title:"NEW_USER_ADDED",id: 4 },
    { title:"NEW_ORGANIZER_ADDED",id: 5 },
    { title:"NEW_EVENT_CREATED",id: 6 },
    { title:"NEW_PROMOCODE_AVAILABLE",id: 7 },
    { title:"REMAINDER",id: 8 },
    { title:"CHECK_IN",id: 9 }
]

export const PAYMENTMETHODS = [
    { title: 'FREE', id: 1 },
    { title: 'PAYPAL', id: 2 },
    { title: 'TWINT', id: 3 },
    { title: 'CREDIT CARD', id: 4 },
    { title: 'DEBIT CARD', id: 5 }
]


export const PARTNER = "Partner" 
export const PARTNERS = "Partners"
