"use client"
import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { EventCardTitle } from '../common/Common';
import i18n from '@/i18n/i18n';
import timeGridPlugin from '@fullcalendar/timegrid';
function extractTime(inputDatetimeStr) {
    // Convert the input string to a Date object
    const inputDatetime = new Date(inputDatetimeStr);

    // Extract hours, minutes, and AM/PM
    let hours = inputDatetime.getHours();
    const minutes = inputDatetime.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format the time
    const timeStr = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

    return timeStr;
}

const CalendarView = ({ eventData, setCalenderData }) => {
    // console.log('eventData',eventData)
    const router = useRouter();

    const handleViewChange = (view) => {
        // console.log('View changed to:', view);

        const StartDate = view?.currentStart
        const EndDate = view?.currentEnd
        const StartDateTimeStemp = StartDate.getTime()
        const EndDateTimeStemp = EndDate.getTime()
        let Obj = {}
        Obj.startDate = StartDateTimeStemp
        Obj.endDate = EndDateTimeStemp - 1
        setCalenderData(Obj)
    };

    const CalendarData = eventData?.map((e) => {
        let payload = {}
        payload.title = e.title
        payload.data = e
        payload.start = new Date(Number(e.startTime))
        if (!!e.endTime) {
            payload.end = new Date(Number(e.endTime))
        }
        return payload
    })
    // console.log(CalendarData,"CalendarData")
    useEffect(() => {
        return () => {
            setCalenderData(null)
        }
    }, [])

    const language = getCookie('language') || 'en'
    // console.log('language',language)

    const buttonTextTranslations = {
        en: {
            today: 'Today',
            dayGridWeek: 'Week',
            dayGridMonth: 'Month',
            dayGridYear: 'Year',
        },
        de: {
            today: 'Heute',
            dayGridWeek: 'Woche',
            dayGridMonth: 'Monat',
            dayGridYear: 'Jahr',
        },
    };

    return (
        <div>
            <FullCalendar
                axis={{
                    left: {
                        visible: true,
                        labelFormat: 'hh:mm a',  // Adjust the displayed time format
                    },
                }}
                timeGridWeekView={{
                    hourStart: 0,
                    hourEnd: 24,
                    slotLabelInterval: '01:30:00',  // Set the interval for displaying time slot labels
                    slotLabelFormat: {
                      hour: '2-digit',
                      minute: '2-digit',
                      meridiem: false,  // Use 24-hour format
                    },
                  }}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView='dayGridMonth'
                locale={language}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridWeek,dayGridMonth,dayGridYear',
                }}
                buttonText={buttonTextTranslations[language]}
                events={CalendarData}
                eventContent={
                    (...rest) => renderEventContent(...rest, router)}
                datesSet={(info) => handleViewChange(info.view)}
            />
        </div>
    )
}

export default CalendarView;

const renderEventContent = (eventInfo, _, router) => {

    const item = eventInfo?.event?._def?.extendedProps?.data
    const language = getCookie('language') || 'en'

    const CalenderEventDetaisl = () => {
        router.push(item?.isSponsored ? `/events/sponsored/${item?._id ? item?._id : item?.eventId}` : `/events/${EventCardTitle?.[item?.category]}/${item?._id ? item?._id : item?.eventId}`)
    }
    return (
        <div className='cursor-pointer' onClick={CalenderEventDetaisl}>
            <b>{eventInfo?.event?.title}</b>
            <p>{language === 'en' ? 'Start:' : 'Start:'} {extractTime(eventInfo?.event?.start)}</p>
            {eventInfo?.event?.end && <p>{language === 'en' ? 'End:' : 'Ende:'} {extractTime(eventInfo?.event?.end)}</p>}
        </div>
    );
}