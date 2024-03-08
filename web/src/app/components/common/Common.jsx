import Swal from "sweetalert2";
import "./sweetalert.scss";

const errorIcon = `<svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" fill="none" stroke="#F96E66" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                        <line class="path line" fill="none" stroke="#F96E66" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="34.4" y1="37.9" x2="95.8" y2="92.3" />
                        <line class="path line" fill="none" stroke="#F96E66" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" x1="95.8" y1="38" x2="34.4" y2="92.2" />
                    </svg>`;
const successIcon = `<svg class="svg-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" stroke="" fill="#B09684" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/>
                        <polyline class="path check" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/>
                    </svg>`;

let icon = {
  success: successIcon,
  error: errorIcon,
};

const sweetalert = async ({ message, type }) =>
  Swal.fire({
    html: `<div class='custom-swal-modal'>
                    <div class='modal-body'>
                        ${icon?.[type]}
                        <h2>${message}</h2>
                    </div>
                </div>`,
    showConfirmButton: type === "success" ? false : true,
    timer: type === "success" && 2000,
  });

function shortformatDate(timestamp) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // const date = new Date(timestamp)
  // const day = date.getUTCDate()
  // const month = months[date.getUTCMonth()]
  // const year = date.getUTCFullYear()

  // return `${day}, ${month} ${year}`
  const date = new Date(timestamp);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getUTCDate();
  const month = monthsOfYear[date.getUTCMonth()].substring(0, 3);
  const year = date.getUTCFullYear().toString().substring(2, 4);

  const formattedDate = `${dayOfWeek.substring(
    0,
    3
  )}, ${day}. ${month} ${year}`;
  return formattedDate;
}

function eventdetailsformatDate(timestamp, lang) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeekGerman = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const monthsOfYearGerman = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  // const date = new Date(timestamp)

  // const dayOfWeek = daysOfWeek[date.getUTCDay()]
  // const month = monthsOfYear[date.getUTCMonth()]
  // const day = date.getUTCDate()
  // const year = date.getUTCFullYear()

  // const formattedDate = `${dayOfWeek} ${day} ${month} , ${year}`

  // return formattedDate

  //////////// HHHHHHHHHHH ///////////
  const date = new Date(timestamp);
  let tmpDate = date.setHours(0, 0, 0);
  let newH = new Date(tmpDate);
  const dayOfWeek =
    lang === "en" ? daysOfWeek[newH.getDay()] : daysOfWeekGerman[newH.getDay()];
  const day = newH.getDate();
  const month =
    lang === "en"
      ? monthsOfYear[newH.getMonth()]?.substring(0, 3)
      : monthsOfYearGerman[newH.getMonth()]?.substring(0, 3);
  const year = newH.getFullYear().toString()?.substring(2, 4);

  const formattedDate = `${dayOfWeek?.substring(
    0,
    3
  )}, ${day}. ${month} ${year}`;
  return formattedDate;

  /////////// HHHHHHHHHHHHH ENds ////////////

  // const date = new Date(timestamp);
  // const dayOfWeek = daysOfWeek[date.getUTCDay()];
  // const day = date.getUTCDate();
  // const month = monthsOfYear[date.getUTCMonth()].substring(0, 3);
  // const year = date.getUTCFullYear().toString().substring(2, 4);

  // const formattedDate = `${dayOfWeek.substring(0, 3)}, ${day}. ${month} ${year}`;
  // return formattedDate;

  // const dateObject = new Date(+timestamp);
  // const dayOfWeek = dateObject[dateObject.getUTCDay()]
  // const day = dateObject.getDate().toString().padStart(2, '0');
  // const month = dateObject.toLocaleString("en-US", { month: "short" });
  // const year = dateObject.getFullYear();
  // const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;
  // return formattedDate;
}

function eventdetailsformatFullDate(data, lang) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeekGerman = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const monthsOfYearGerman = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const date = new Date(+data);
  let tmpDate = date.setHours(0, 0, 0);
  let newH = new Date(tmpDate);
  const dayOfWeek =
    lang === "en" ? daysOfWeek[newH.getDay()] : daysOfWeekGerman[newH.getDay()];
  const day = newH.getDate();
  const month =
    lang === "en"
      ? monthsOfYear[newH.getMonth()]
      : monthsOfYearGerman[newH.getMonth()];
  const year = newH.getFullYear();

  const formattedDate = `${dayOfWeek}, ${day}. ${month} ${year}`;
  return formattedDate;
}

function shortToshortFormateDate(timestamp, lang) {
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthsOfYearGerman = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const date = new Date(timestamp);
  let tmpDate = date.setHours(0, 0, 0);
  let newH = new Date(tmpDate);
  const day = newH.getDate();
  const month =
    lang === "en"
      ? monthsOfYear[newH.getMonth()]?.substring(0, 3)
      : monthsOfYearGerman[newH.getMonth()]?.substring(0, 3);

  const formattedDate = `${day}, ${month}.`;
  return formattedDate;
}

function convertTimestampToTimeFormat(timestamp) {
  const timeObject = new Date(+timestamp);
  // Format time
  const hours = timeObject.getHours();
  const minutes = timeObject.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  return formattedTime;
}

function formatDate(timestamp) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(+timestamp);
  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const day = date.getDate();
  const month = monthsOfYear[date.getUTCMonth()].substring(0, 3);
  const year = date.getUTCFullYear().toString().substring(2, 4);

  const formattedDate = `${dayOfWeek.substring(
    0,
    3
  )}, ${day}. ${month} ${year}`;
  return formattedDate;
  // const date = new Date(timestamp)
  // const month = months[date.getMonth()]
  // const day = date.getDate()
  // const year = date.getFullYear()

  // return `${month} ${day}, ${year}`
}

const eventType = {
  1: "Online",
  2: "Offline",
  3: "As A Gift",
  4: "For Myself",
};
const language = {
  1: "EN",
  2: "DE",
};

const currency = {
  1: "$",
  2: "₣",
  3: "€",
};

const currencyName = {
  1: "USD",
  2: "CHF",
  3: "EUR",
};

const eventCategory = {
  1: "Gatherings",
  2: "Retreats",
  3: "Treats",
  4: "Classes",
  7: "Coachings",
  8: "Trainings",
};

//Event category page

const EventCategoryTitle = {
  sponsored: "Sponsored",
  classes: "Classes",
  retreats: "Retreats",
  // 'gatherings-event': 'Gatherings',
  event: "Events",
  treats: "Treats",
  // "all-event": "All",
  coaching: "Coachings",
  training: "Trainings",
};

const Category = {
  // 'gatherings-event': 1,
  event: 1,
  retreats: 2,
  treats: 3,
  classes: 4,
  sponsored: 5,
  coachings: 7,
  trainings: 8,
};

const TabData = [
  {
    name: "Sponsored",
    url: "/events/sponsored",
  },
  {
    name: "Events",
    url: "/events/event",
  },
  // {
  //     name: 'Gatherings',
  //     url: '/events/gatherings-event'
  // },
  // {
  //     name: 'Sponsored',
  //     url: '/events/sponsored-event'
  // },
  {
    name: "Retreats",
    url: "/events/retreats",
  },
  {
    name: "Treats",
    url: "/events/treats",
  },
  {
    name: "Classes",
    url: "/events/classes",
  },
  {
    name: "Coaching",
    url: "/events/coachings",
  },
  {
    name: "Training",
    url: "/events/trainings",
  },
];

//EVENT DETAILS

const eventDetailsCategory = {
  // 1 : 'Gatherings',
  1: "Events",
  2: "Retreats",
  3: "Treats",
  4: "Classes",
  7: "Coachings",
  8: "Trainings",
};

//event filter form

const FilterEventType = [
  {
    title: "All",
    id: 1,
  },
  {
    title: "Online",
    id: 2,
  },
  {
    title: "Offline",
    id: 3,
  },
];

const EventPaid = [
  {
    title: "All",
    id: 1,
  },
  {
    title: "Paid",
    id: 2,
  },
  {
    title: "Free",
    id: 3,
  },
];

const SortingByPrice = [
  {
    title: "Low to High",
    id: 1,
  },
  {
    title: "High to Low",
    id: 2,
  },
];

const SortingByDate = [
  {
    title: "Earliest to Latest",
    id: 1,
  },
  {
    title: "Latest to Earliest",
    id: 2,
  },
];

//E-Ticket

const paymentMethod = {
  1: "FREE",
  2: "PAYPAL",
  3: "TWINT",
  4: "CREDIT CARD",
};

//All event Card

const EventCardTitle = {
  1: "event",
  2: "retreats",
  3: "treats",
  4: "classes",
  7: "coachings",
  8: "trainings",
};

export {
  sweetalert,
  shortformatDate,
  eventdetailsformatDate,
  eventdetailsformatFullDate,
  convertTimestampToTimeFormat,
  eventType,
  language,
  currency,
  currencyName,
  eventCategory,
  formatDate,
  EventCategoryTitle,
  Category,
  TabData,
  eventDetailsCategory,
  FilterEventType,
  EventPaid,
  SortingByPrice,
  shortToshortFormateDate,
  SortingByDate,
  paymentMethod,
  EventCardTitle,
};
