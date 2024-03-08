'use client'
import React from 'react'
import H3 from '@/app/components/common/h3'
import H4 from '@/app/components/common/h4'
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import {
    convertTimestampToTimeFormat,
    eventdetailsformatDate
} from '@/app/components/common/Common'
import { useTranslation } from 'react-i18next'
import { TimeZoneMoment } from '@/utils/commonfn/Date_TimeTS';

const EventCardBox = ({ eventData,languageName }) => {
    const { i18n } = useTranslation()

    const currency = {
        1: '$',
        2: '₣',
        3: '€'
    }

    const currencyName = {
        1: 'USD',
        2: 'CHF',
        3: 'EUR'
    }

    const SetEventDate = () => {
        if (eventData?.eventData?.startTime) {
            if (eventData?.eventData?.endTime) {
                return `${eventdetailsformatDate(
                    parseInt(eventData?.eventData?.startTime),languageName
                )} - ${eventdetailsformatDate(
                    parseInt(eventData?.eventData?.endTime),languageName
                )}`
            } else {
                return `${eventdetailsformatDate(
                    parseInt(eventData?.eventData?.startTime),languageName
                )}`
            }
        } else {
            return ''
        }
    }

    const SetEventTime = () => {
        if (eventData?.eventData?.startTime) {
            if (eventData?.eventData?.endTime) {
                return `${convertTimestampToTimeFormat(
                    parseInt(eventData?.eventData?.startTime)
                )} - ${convertTimestampToTimeFormat(
                    parseInt(eventData?.eventData?.endTime)
                )} (${TimeZoneMoment()})`
            } else {
                return `${convertTimestampToTimeFormat(
                    parseInt(eventData?.eventData?.startTime)
                )} (${TimeZoneMoment()})`
            }
        } else {
            return ''
        }
    }

    return (
        <div className="credit-card-box">
            <div className="top">
                {SetEventDate()?.length > 0 && (
                    <p className="date">{SetEventDate(eventData)}</p>
                )}
                {SetEventTime()?.length > 0 && (
                    <p className="time">{SetEventTime(eventData)}</p>
                )}
                <H3 className="title">{eventData?.eventData?.title}</H3>
                <p className="description">
                    {eventData?.eventData?.description}
                </p>
                {!eventData?.eventData?.onlineMeetingLink ||
                    (eventData?.eventData?.venue && (
                        <p className="flex items-center location">
                            <i className="icon-location"></i>
                            {eventData?.eventData?.city?.name}
                            {eventData?.eventData?.venue}
                        </p>
                    ))}
            </div>
            <div className="bottom">
                <H3 className="title">
                    {i18n.t(`useEvent.paymentDetails.title`)}
                </H3>
                <ul className="payment-list">
                    <li className="flex items-center justify-between">
                        {i18n.t(`useEvent.paymentDetails.quantity`)}
                        <span>
                            {eventData?.paymentDetails?.quantity}
                            {/* {Math.ceil(+eventData?.paymentDetails?.subTotal) ? `${currency[eventData?.paymentDetails?.currency]}${eventData?.paymentDetails?.subTotal} ${currencyName[eventData?.paymentDetails?.currency]}` : i18n.t(`useEvent.paymentDetails.eventType`)} */}
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                        {i18n.t(`useEvent.paymentDetails.subTotal`)}
                        <span>
                            {Math.ceil(+eventData?.paymentDetails?.subTotal)
                                ? `${eventData?.paymentDetails?.currency !== 2 ? 
                                      currency[
                                          eventData?.paymentDetails?.currency
                                      ] : ""
                                  }${priceFormator(eventData?.paymentDetails?.subTotal,i18n?.language)} ${
                                      currencyName[
                                          eventData?.paymentDetails?.currency
                                      ]
                                  }`
                                : i18n.t(`useEvent.paymentDetails.eventType`)}
                        </span>
                    </li>
                    <li className="flex items-center justify-between">
                        {i18n.t(`useEvent.paymentDetails.transactionFees`)}
                        <span>
                            {Math.ceil(
                                +eventData?.paymentDetails?.transactionFees
                            )
                                ? `${eventData?.paymentDetails?.currency !== 2 ? 
                                      currency[
                                          eventData?.paymentDetails?.currency
                                      ] : ''
                                  }${
                                    priceFormator(eventData?.paymentDetails?.transactionFees,i18n?.language)
                                  } ${
                                      currencyName[
                                          eventData?.paymentDetails?.currency
                                      ]
                                  }`
                                : i18n.t(`useEvent.paymentDetails.eventType`)}
                        </span>
                    </li>
                    <li className="flex items-center justify-between totle">
                        <H4 className="totle-title">
                            {i18n.t(`useEvent.paymentDetails.totalPrice`)}
                        </H4>
                        <H4 className="totle-title totle-amount">
                            {Math.ceil(+eventData?.paymentDetails?.totalPrice)
                                ? `${eventData?.paymentDetails?.currency !== 2 ? 
                                      currency[
                                          eventData?.paymentDetails?.currency
                                      ] : ''
                                  }
                                  ${priceFormator(eventData?.paymentDetails?.totalPrice,i18n?.language)} ${
                                      currencyName[
                                          eventData?.paymentDetails?.currency
                                      ]
                                  }`
                                : i18n.t(`useEvent.paymentDetails.eventType`)}
                        </H4>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default EventCardBox
