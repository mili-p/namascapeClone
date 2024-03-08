/// organizer ///
export const EventCategoryFn = (i18n) => {
    const EventCategory = [
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.1`),
            id: 1
        },
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.2`),
            id: 2
        },
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.3`),
            id: 3
        },
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.4`),
            id: 4
        },
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.5`),
            id: 7
        },
        {
            title: i18n.t(`organizer.event.commonArray.EventCategory.option.6`),
            id: 8
        }
    ]

    return EventCategory
}

export const languageListFn = (i18n) => {
    const languageList = {
        1: i18n.t(`organizer.event.commonArray.LanguageList.option.1`),
        2: i18n.t(`organizer.event.commonArray.LanguageList.option.2`)
    }
    return languageList
}

export const CurrencyFn = (i18n) => {
    const Currency = [
        {
            name: '₣',
            id: 2,
            title: i18n.t(`organizer.event.commonArray.Currency.option.2`)
        },
        
        {
            name: '€',
            id: 3,
            title: i18n.t(`organizer.event.commonArray.Currency.option.3`)
        },
        {
            name: '$',
            id: 1,
            title: i18n.t(`organizer.event.commonArray.Currency.option.1`)
        },
        // { title: "Sponsored", id: 5 },
    ]

    return Currency
}

export const DiscountTypeListFn = (i18n) => {
    const DiscountTypeList = [
        {
            title: i18n.t(
                `organizer.event.commonArray.DiscountTypeList.option.1`
            ),
            id: 1
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.DiscountTypeList.option.2`
            ),
            id: 2
        }
    ]

    return DiscountTypeList
}

export const EventRecurrenceFn = (i18n) => {
    const EventRecurrence = [
        {
            title: i18n.t(
                `organizer.event.commonArray.EventRecurrence.option.1`
            ),
            id: 1
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.EventRecurrence.option.2`
            ),
            id: 2
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.EventRecurrence.option.3`
            ),
            id: 3
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.EventRecurrence.option.5`
            ),
            id: 5
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.EventRecurrence.option.4`
            ),
            id: 4
        }
    ]

    return EventRecurrence
}

export const CreateEventTypeFn = (i18n) => {
    const CreateEventType = [
        {
            title: i18n.t(
                `organizer.event.commonArray.CreateEventType.option.1`
            ),
            id: 1
        },
        {
            title: i18n.t(
                `organizer.event.commonArray.CreateEventType.option.2`
            ),
            id: 2
        }
    ]

    return CreateEventType
}

export const TabDataTypeFn = (i18n) => {
const TabDataType = [
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.All`),
        url: '/events/sponsored/',
        icon: <><i className="icon-tab-sponsored"></i></>,
    },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Events`),
        url: '/events/event/',
        icon: <><i className="icon-tab-experiences"></i></>,
    },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Classes`),
        url: '/events/classes/',
        icon: <><i className="icon-tab-classes"></i></>,
    },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Treats`),
        url: '/events/treats/',
        icon: <><i className="icon-tab-treats"></i></>,
    },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Retreats`),
        url: '/events/retreats/',
        icon: <><i className="icon-tab-retreats"></i></>,
    },
    // {
    //     name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Treats`),
    //     url: '/events/treats-event',
    //     icon: <><i className="icon-tab-treats"></i></>,
    // },
    // {
    //     name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Classes`),
    //     url: '/events/classes-event',
    //     icon: <><i className="icon-tab-classes"></i></>,
    // },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Coaching`),
        url: '/events/coachings/',
        icon: <><i className="icon-tab-coaching"></i></>,
    },
    {
        name: i18n.t(`useEvent.headerTitle.detailsPage.tabData.Training`),
        url: '/events/trainings/',
        icon: <><i className="icon-tab-training"></i></>,
    }
]
return TabDataType
}

export const  EventCategoryTitleFn = (i18n) => {
const EventCategoryTitle =
    {
        'sponsored': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.sponsoredEevent`),
        'classes': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.classesEvent`),
        'retreats': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.retreatsEvent`),
        'event': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.event`),
        'treats': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.treatsEvent`),
        'all-event': i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.allEvent`),
        'coachings' : i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.coachingEvent`),
        'trainings' : i18n.t(`useEvent.headerTitle.detailsPage.EventCategoryTitle.trainingEvent`)
    }
    return EventCategoryTitle
}

export const EventPaidFn = (i18n) => {
    const EventPaid = [
        {
            title: i18n.t(`useEvent.EventPaid.all`),
            id: 1
        },
        {
            title: i18n.t(`useEvent.EventPaid.Paid`),
            id: 2
        },
        {
            title: i18n.t(`useEvent.EventPaid.Free`),
            id: 3
        }
    ]
    return EventPaid
}


export const FilterEventTypeFn = (i18n) => {
    const FilterEventType = [
        {
            title: i18n.t(`useEvent.FilterEventType.all`),
            id: 1
        },
        {
            title: i18n.t(`useEvent.FilterEventType.onLine`),
            id: 2
        },
        {
            title: i18n.t(`useEvent.FilterEventType.offline`),
            id: 3
        }
    ]
    return FilterEventType
}


export const eventDetailsCategoryFN = (i18n) =>{
    const eventDetailsCategory = {
        // 1 : 'Gatherings',
        1 : i18n.t(`useEvent.eventDetailsCategoryList.1`),
        2 : i18n.t(`useEvent.eventDetailsCategoryList.2`),
        3 : i18n.t(`useEvent.eventDetailsCategoryList.3`),
        4 : i18n.t(`useEvent.eventDetailsCategoryList.4`),
        7 : i18n.t(`useEvent.eventDetailsCategoryList.7`),
        8 : i18n.t(`useEvent.eventDetailsCategoryList.8`)
    }
    return eventDetailsCategory
}

export const eventTypeFn = (i18n) => {
    const eventType = {
        1: i18n.t(`useEvent.eventType.1`),
        2: i18n.t(`useEvent.eventType.2`),
        3: i18n.t(`useEvent.eventType.3`),
        4: i18n.t(`useEvent.eventType.4`),
      }
      return eventType
}

export const PaymentMethodsFn = (i18n) => {
    const PaymentMethods = [
        {
          title: i18n.t(`organizer.eventBooking.PaymentMethodsFn.free1`),
          id: 1,
        },
        {
          title: "Paypal",
          id: 2,
        },
        {
          title: "Twint",
          id: 3,
        },
        {
          title: i18n.t(`organizer.eventBooking.PaymentMethodsFn.creditCard`),
          id: 4,
        },
      ];
      return PaymentMethods
}

export const SortingByPriceFn = (i18n) =>{
    const SortingByPrice = [
        {
            title: i18n.t(`useEvent.filterEvents.SortingByDropDown.title1`),
            id: 1
        },
        {
            title: i18n.t(`useEvent.filterEvents.SortingByDropDown.title2`),
            id: 2
        }
    ]
    return SortingByPrice
}

export const SortingByDateFn = (i18n) =>{
    
    const SortingByDate = [
        {
            title: i18n.t(`useEvent.filterEvents.SortingByDateDropDown.title1`),
            id: 1
        },
        {
            title: i18n.t(`useEvent.filterEvents.SortingByDateDropDown.title2`),
            id: 2
        }
    ]
    return SortingByDate
}


export const paramsCategoryFn = (i18n) =>{
    
    const paramsCategory = 
    {
        sponsored :i18n.t(`paramsCategory.sponsored`),
        event : i18n.t(`paramsCategory.event`),
        classes : i18n.t(`paramsCategory.classes`),
        treats : i18n.t(`paramsCategory.treats`),
        retreats :i18n.t(`paramsCategory.retreats`),
        trainings : i18n.t(`paramsCategory.trainings`),
        coachings : i18n.t(`paramsCategory.coachings`)
    }
    
    return paramsCategory
}


