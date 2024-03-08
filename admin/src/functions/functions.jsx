export const formatDateToMonthShortwithFormate = (value, toTimeForCurrentDay = true) => {
    if (!value) {
        return ''
    }

    const month = new Intl.DateTimeFormat('en-GB', {
        month: '2-digit'
    }).format(new Date(value))

    const year = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric'
    }).format(new Date(value))

    const day = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit'
    }).format(new Date(value))

    return day + '-' + month + '-' + year
}

export const formatDateToMonthShortwithFormate2 = (value, toTimeForCurrentDay = true) => {
    if (!value) {
        return '';
    }

    const timestamp = Number(value);

    if (isNaN(timestamp)) {
        return 'Invalid timestamp';
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) {
        return 'Invalid date';
    }

    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
export const formatDateToMonthShortwithFormateForformfield = (
    value,
    toTimeForCurrentDay = true
) => {
    if (!value) {
        return ''
    }

    const month = new Intl.DateTimeFormat('en-GB', {
        month: '2-digit'
    }).format(new Date(value))

    const year = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric'
    }).format(new Date(value))

    const day = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit'
    }).format(new Date(value))

    return year + '-' + month + '-' + day
}
export const getFormData = (object) =>
    Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key])
        return formData
    }, new FormData())
export const chatTimeDifference = (timestamp, locale = 'en') => {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msSixDay = msPerHour * 24 * 7
    const current = Date.now()
    const elapsed = current - timestamp

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'always' })

    if (elapsed < msPerMinute) {
        if (Math.floor(elapsed / 1000) === 0) {
            return 'just now'
        } else {
            return rtf.format(-Math.floor(elapsed / 1000), 'seconds')
        }
    } else if (elapsed < msPerHour) {
        return rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes')
    } else if (elapsed < msPerDay) {
        return rtf.format(-Math.floor(elapsed / msPerHour), 'hours')
    } else if (elapsed < msSixDay) {
        return rtf.format(-Math.floor(elapsed / msPerDay), 'days')
    } else {
        // return new Date(timestamp).toLocaleDateString(locale)
        return new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
            // hour12: true
        }).format(timestamp)
    }
}

export const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
].map((e) => e.toUpperCase())

export let yearsList = Array.from(Array(new Date().getFullYear() - 1989), (_, i) =>
    (i + 1990).toString()
)

export let experienceLists = [...Array(51).keys()]

export const GetCurrentYear = () => {
    // Add By AMIT 27/01/2023
    let currentYear = new Date().getFullYear()
    return currentYear
}

export function getExperience(start) {
    var diffInMonths = (start?.e_year - start?.s_year) * 12 + (start?.e_month - start?.s_month)
    var years = Math.floor(diffInMonths / 12)
    var months = Math.floor(diffInMonths % 12)
    return `${years} ${years > 1 ? 'Years' : 'Year'} ${months} ${months > 1 ? 'Months' : 'Month'}`
}

export function isValidURL(string) {
    var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    return res !== null
}

export const currency = {
    INR: '&#x20B9;',
    EUR: '&#128;',
    USD: '&#36;',
    CAD: '&#36;',
    AED: '&#1583;.&#1573;'
}

// Created By Amit its Return Output:  7 Dec 2023, 12:01
export const timeDifference = (timestamp, locale = 'en') => {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const current = Date.now()
    const elapsed = current - timestamp

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
        // hour12: true
    }).format(timestamp)
    // }
}
export const timeDifference3 = (timestamp, locale = 'en') => {
    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const current = Date.now()
    const elapsed = current - timestamp

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // To display in 12-hour format
    }).format(timestamp)?.replace(","," ")
    // }
}

// Created By Amit its Return Output: "Nov 03, 2023, 08:00 AM"
export const timeDifference2 = (timestamp, locale = 'en') => {
    const current = Date.now();
    // const elapsed = current - timestamp;
  
    // if (elapsed < 0) {
    //   return 'Future date';
    // }
  
    const formattedDate = new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false // To display in 12-hour format
    }).format(timestamp);
  
    return formattedDate;
}

// Added By Amit 27-11-2023 get Only Time with AM/PM
export function getTimeFromTimestamp(timestamp) {
    if (!timestamp) {
        return '';
      }
    
      const date = new Date(Number(timestamp)); 
    
      if (isNaN(date.getTime())) {
        return 'Invalid timestamp';
      }
    
      let hours = date.getHours();
      const minutes = ('0' + date.getMinutes()).slice(-2);
    
      // Determine if it's AM or PM
      const period = hours >= 12 ? 'PM' : 'AM';
    
      // Convert hours to 12-hour format
    //   hours = hours % 12 || 12;
    
      const formattedTime = `${hours}:${minutes} `;
      return formattedTime;
  }

//Added by Amit Date format Fri Nov. 3 
export function formatDateWithNewFormat(timestamp) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const days = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
  ];

  const date = new Date(timestamp * 1000); // Assuming timestamp is in seconds

  const dayOfWeek = days[date.getDay()];
  const month = months[date.getMonth()];
  const dayOfMonth = date.getDate();

  return `${dayOfWeek} ${month}.${('0' + dayOfMonth).slice(-2)}`;
}



export const languageList={
    1:"English",
    2:"German"
}

// date format in  Friday, November 03, 2023
  export function formatDatewihnewdate(timestamp) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const date = new Date(timestamp);

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = monthsOfYear[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    const formattedDate = `${dayOfWeek},  ${day} ${month} , ${year}`;

    return formattedDate;
}

export function getHumanReadableTime(timestamp) {
    const now = new Date();
    const timeDiff = Math.floor((now - timestamp) / 1000); // Calculate time difference in seconds
    if (timeDiff < 60) { // Less than a minute
      return "Just now";
    } else if (timeDiff < 3600) { // Less than an hour
      const minutes = Math.floor(timeDiff / 60);
      return `${minutes}m ago`;
    } else if (timeDiff < 86400) { // Less than a day
      const hours = Math.floor(timeDiff / 3600);
      return `${hours}h ago`;
    } else { // More than a day
      const days = Math.floor(timeDiff / 86400);
      return days === 1 ? "Yesterday" : `${days} days ago`;
    }
  }


  export const getTime = (data) => {
    const timeObject = new Date(+data)
    // Format time
    const hours = timeObject.getHours()
    const minutes = timeObject.getMinutes()
    const formattedTime = `${hours % 12 || 12}:${
        minutes < 10 ? '0' : ''
    }${minutes} ${hours < 12 ? 'AM' : 'PM'}`
    return formattedTime
}


// export const priceFormator = (number,currName) => {
//     if(currName === 'CHF'){
//         return Number(number).toLocaleString('de-CH', {
//             currency: 'CHF',
//             minimumFractionDigits: 0
//         })
//     }else if(currName === 'usd'){
//         return Number(number).toLocaleString('en-US', {
//             currency: 'USD',
//             minimumFractionDigits: 0
//         })
//     }else{
//         return Number(number).toLocaleString('de-DE', {
//             currency: 'EUR',
//             minimumFractionDigits: 0
//         })
//     }
  
// }
//// price Formator start  Hiren  //////
export const priceFormator = (number) => {
    return Number(number).toLocaleString('de-CH', {
        currency: 'CHF',
        minimumFractionDigits: 0
    })
}
//// Price formator ends Hiren /////

/// common date and time function start Hiren /////
export const OrgGetDate = (data) => {
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

    const date = new Date(+data);
    let tmpDate = date.setHours(0,0,0)
    let newH = new Date(tmpDate)
    const dayOfWeek = daysOfWeek[newH.getDay()]
    const day = newH.getDate();
    const month = monthsOfYear[newH.getMonth()]?.substring(0, 3)
    const year = newH.getFullYear().toString()?.substring(2, 4);
  
    const formattedDate = `${dayOfWeek?.substring(
      0,
      3
    )}, ${day}. ${month} ${year}`;
    return formattedDate;
  };
  
  export const OrgGetFullDate = (data) => {
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

    const date = new Date(+data);
    let tmpDate = date.setHours(0,0,0)
    let newH = new Date(tmpDate)
    const dayOfWeek = daysOfWeek[newH.getDay()]
        const day = newH.getDate();
        const month = monthsOfYear[newH.getMonth()];
        const year = newH.getFullYear();
        const formattedDate = `${dayOfWeek}, ${day}. ${month} ${year}`;
    return formattedDate;
  };
  
  export const OrgGetTime = (data) => {
    const timeObject = new Date(+data);
    // Format time
    const hours = timeObject.getHours();
    const minutes = timeObject.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
    return formattedTime;
  };
  
  export const combinedTimestamp = ({
    eventDate,
    eventTime,
    eventEndTime,
    eventEndDate,
  }) => {
    if (eventDate && eventTime) {
      const date = new Date(eventDate).setHours(0,0,0)
      const time = eventTime;
      var timeParts = time?.split(":");
      const timestamp = (date +(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000))
      return timestamp;
    }
    if (eventEndTime && eventEndDate) {
      const date = new Date(eventEndDate).setHours(0,0,0)
      const time = eventEndTime;
      var timeParts = time?.split(":");
      const timestamp = (date+(+timeParts[0] * (60000 * 60)) + (+timeParts[1] * 60000))
      return timestamp;
    }
  };

  /// common date and time function ends Hiren /////