import moment from 'moment-timezone';

export const OrgGetDate = (data, lang) => {
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
  let tmpDate = date.setHours(0,0,0)
  let newH = new Date(tmpDate)
  const dayOfWeek =
    lang === "de"
    ? daysOfWeekGerman[newH.getDay()]
      : daysOfWeek[newH.getDay()]
  const day = newH.getDate();
  const month =
    lang === "de"
    ? monthsOfYearGerman[newH.getMonth()]?.substring(0, 3)
      : monthsOfYear[newH.getMonth()]?.substring(0, 3)
  const year = newH.getFullYear().toString()?.substring(2, 4);

  const formattedDate = `${dayOfWeek?.substring(
    0,
    3
  )}, ${day}. ${month} ${year}`;
  return formattedDate;
};

export const OrgGetFullDate = (data, lang) => {
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
  let tmpDate = date.setHours(0,0,0)
  let newH = new Date(tmpDate)
  const dayOfWeek =
    lang === "de"
    ? daysOfWeekGerman[newH.getDay()]
      : daysOfWeek[newH.getDay()]
      const day = newH.getDate();
      const month =
        lang === "de"
          ? monthsOfYearGerman[newH.getMonth()]
          : monthsOfYear[newH.getMonth()];
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

export const TimeZoneMoment = (data) => {
  const Timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const offset = moment().tz(Timezone).format('Z');
  const formattedOffset = offset.replace(/(\d{2})(\d{2})/, '$1:$2');
  const output = moment().tz(Timezone).format(`z [${formattedOffset}]`);
  return output
}
