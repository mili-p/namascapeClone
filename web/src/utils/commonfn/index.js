import i18n from "@/i18n/i18n";

function convertHours(timeString, dateTimestamp) {
  const [additionalHours, additionalMinutes] = timeString
    .split(":")
    .map(Number);
  // Replace with your date timestamp

  // const originalDate = new Date(dateTimestamp);
  // const newDate = new Date(originalDate);

  // Add hours and minutes
  // newDate.setHours(newDate.getHours() + additionalHours);
  // newDate.setMinutes(newDate.getMinutes() + additionalMinutes);

  // const newTimestamp = newDate.getTime();
  const miliSeconds = additionalHours * 3600000 + additionalMinutes * 60000
  // console.log(newTimestamp);
  const newTimeStamp = dateTimestamp + miliSeconds
  return newTimeStamp;
}

function getHumanReadableTime(timestamp) {
  const now = new Date();
  const timeDiff = Math.floor((now - timestamp) / 1000); // Calculate time difference in seconds

  if (timeDiff < 60) {
    // Less than a minute
    return i18n.t(`organizer.notificationList.days.justNow`);
  } else if (timeDiff < 3600) {
    // Less than an hour   "${minutes} Minuten zuvor"
    const minutes = Math.floor(timeDiff / 60);
    return `${minutes}${i18n.t(`organizer.notificationList.days.minitAgo`)}`;
  } else if (timeDiff < 86400) {
    // Less than a day
    const hours = Math.floor(timeDiff / 3600);
    return `${hours}${i18n.t(`organizer.notificationList.days.hoursAgo`)}`;
  } else {
    // More than a day
    const days = Math.floor(timeDiff / 86400);
    return days === 1 ? i18n.t(`organizer.notificationList.days.yesterday`) : `${days} ${i18n.t(`organizer.notificationList.days.daysToGo`)}`;
  }
}

function EventBookingTimeStamp(timestamp) {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]
const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]
  const date = new Date(+timestamp);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = monthsOfYear[date.getUTCMonth()]?.substring(0, 3);
  const year = date.getUTCFullYear().toString()?.substring(2, 4);

 
  // const dateObject = new Date(timestamp);
  // const day = dateObject.getDate().toString().padStart(2, '0');
  // const month = dateObject.toLocaleString("en-US", { month: "numeric" });
  // const year = dateObject.getFullYear();
  // const formattedDate = `${day}/${month}/${year}`;
  // // return formattedDate;
  // // Convert timestamp to Date object
  // const date = new Date(timestamp);
  
  // console.log(timestamp,"timestamptimestamp",date)
  // // Define desired format options
  const options = {
    // weekday: "short",
    // day: "numeric",
    // month: "short",
    // year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };

  const formattedDate = `${dayOfWeek?.substring(0, 3)}, ${day}. ${month} ${year}, ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
  return formattedDate;

  // // Use Intl.DateTimeFormat to format the date
  // return `${formattedDate}, ${new Intl.DateTimeFormat("en-US", options).format(date)}`;
}

const languageList = {
  1: i18n.t(`organizer.event.commonArray.LanguageList.option.1`),
  2: i18n.t(`organizer.event.commonArray.LanguageList.option.2`),
};
const EventRecurrence = [
  {
    title: i18n.t(`organizer.event.commonArray.EventRecurrence.option.1`),
    id: 1,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventRecurrence.option.2`),
    id: 2,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventRecurrence.option.3`),
    id: 3,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventRecurrence.option.4`),
    id: 4,
  },
];

const CreateEventType = [
  {
    title: i18n.t(`organizer.event.commonArray.CreateEventType.option.1`),
    id: 1,
  },
  {
    title: i18n.t(`organizer.event.commonArray.CreateEventType.option.2`),
    id: 2,
  },
];

const EventCategory = [
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.1`),
    id: 1,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.2`),
    id: 2,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.3`),
    id: 3,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.4`),
    id: 4,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.5`),
    id: 7,
  },
  {
    title: i18n.t(`organizer.event.commonArray.EventCategory.option.6`),
    id: 8,
  }
];

const Currency = [
  {
    name: "$",
    id: 1,
    title: i18n.t(`organizer.event.commonArray.Currency.option.1`),
  },
  {
    name: "₣",
    id: 2,
    title: i18n.t(`organizer.event.commonArray.Currency.option.2`),
  },
  {
    name: "€",
    id: 3,
    title: i18n.t(`organizer.event.commonArray.Currency.option.3`),
  },
  // { title: "Sponsored", id: 5 },
];

const DiscountTypeList = [
  {
    title: i18n.t(`organizer.event.commonArray.DiscountTypeList.option.1`),
    id: 1,
  },
  {
    title: i18n.t(`organizer.event.commonArray.DiscountTypeList.option.2`),
    id: 2,
  },
];

const PaymentMethods = [
  {
    title: "FREE",
    id: 1,
  },
  {
    title: "PAYPAL",
    id: 2,
  },
  {
    title: "TWINT",
    id: 3,
  },
  {
    title: "CREDIT_CARD",
    id: 4,
  },
];

const LanguageList = [
  { id: "de", name: "DE" },
  { id: "en", name: "EN" },
];

export {
  convertHours,
  languageList,
  EventRecurrence,
  CreateEventType,
  EventCategory,
  Currency,
  DiscountTypeList,
  LanguageList,
  PaymentMethods,
  EventBookingTimeStamp,
  getHumanReadableTime,
};



