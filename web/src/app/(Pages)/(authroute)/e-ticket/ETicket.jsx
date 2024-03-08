"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import H4 from "@/app/components/common/h4";
import { asyncViewBookingTicket } from "../../../../../redux/Thunks/User/viewbookingticket.thunk";
import { asyncDownloadPdf } from "../../../../../redux/Thunks/User/downloadpdf.thunk";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { eventdetailsformatDate } from "@/app/components/common/Common";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import { OrgGetDate, OrgGetTime } from "@/utils/commonfn/Date_TimeTS/index";
import jsPDF from "jspdf";
// import {
//     paymentMethod,
//     eventType,
//     eventCategory
// } from '@/app/components/common/Common'
import LoaderBtn from "@/app/components/common/LoaderBtn";
import { useTranslation } from "react-i18next";
import { eventDetailsCategoryFN, PaymentMethodsFn } from "@/i18n/i18nCM/i18CM";
import { CurrencyFn } from "@/i18n/i18nCM/i18CM";
import Skeleton from "@/app/components/Skeleton/Skeleton";

const ETicket = ({ languageName }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const InvoiceRef = useRef(null);
  const eventCategory = eventDetailsCategoryFN(i18n);

  const { viewBookingTicketData, isLoading } = useSelector(
    (m) => m.viewbookingticket
  );
  const { downloadpdfData, isPdfLoading } = useSelector((m) => m.downloadpdf);

  const search = useSearchParams();
  const tId = search.get("tId");

  const paymentMethod = PaymentMethodsFn(i18n);
  // const { downloadpdfData, isPdfLoading } = useSelector((m) => m.downloadpdf);
  // const search = useSearchParams();
  // const tId = search.get("tId");
  const Currency = CurrencyFn(i18n);
  const currency = Currency.find(
    (e) => e?.id === viewBookingTicketData?.data?.currency
  );

  const selectedPaymentMethod = paymentMethod.find(
    (method) => method.id === viewBookingTicketData?.data?.paymentMethod
  );

  const SetEventType = () => {
    if (viewBookingTicketData?.data?.eventDetails?.eventType === 2) {
      return {
        location:
          viewBookingTicketData?.data?.eventDetails?.venue +
          ", " +
          viewBookingTicketData?.data?.eventDetails?.city?.name,
        gmap: viewBookingTicketData?.data?.eventDetails?.googleMapsLink,
      };
    } else if (viewBookingTicketData?.data?.eventDetails?.eventType === 1) {
      return viewBookingTicketData?.data?.eventDetails?.onlineMeetingLink;
    } else {
      return "";
    }
  };

  const timeDifference2 = (timestamp, locale = "en") => {
    // const formattedDate = new Intl.DateTimeFormat(locale, {
    //   day: "2-digit",
    //   month: "short",
    //   year: "numeric",
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   hour12: false, // To display in 12-hour format
    // }).format(timestamp);

    // return formattedDate;
    const date = new Date(+timestamp);

    const day = date.getDate();
    const formattedDate = new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);

    return `${day}. ${formattedDate}`;
  };
  const SetEventDateTime = () => {
    // if(viewBookingTicketData?.data?.eventDetails?.startTime){
    //   return `${OrgGetDate(Number(viewBookingTicketData?.data?.eventDetails?.startTime), languageName)}, ${OrgGetTime(
    //     Number(viewBookingTicketData?.data?.eventDetails?.startTime)
    //   )}`;
    // }
    if (
      viewBookingTicketData?.data?.eventDetails?.endTime &&
      viewBookingTicketData?.data?.eventDetails?.startTime
    ) {
      return `${OrgGetDate(
        Number(viewBookingTicketData?.data?.eventDetails?.startTime),
        languageName
      )}, ${OrgGetTime(
        Number(viewBookingTicketData?.data?.eventDetails?.startTime)
      )} - ${OrgGetDate(
        Number(viewBookingTicketData?.data?.eventDetails?.endTime),
        languageName
      )}, ${OrgGetTime(
        Number(viewBookingTicketData?.data?.eventDetails?.endTime)
      )}`;
    } else {
      if (viewBookingTicketData?.data?.eventDetails?.startTime) {
        return `${OrgGetDate(
          Number(viewBookingTicketData?.data?.eventDetails?.startTime),
          languageName
        )}, ${OrgGetTime(
          Number(viewBookingTicketData?.data?.eventDetails?.startTime)
        )}`;
      }
    }
    // if (viewBookingTicketData?.data?.eventDetails?.startTime) {
    //   if (viewBookingTicketData?.data?.eventDetails?.endTime) {
    //     return `${eventdetailsformatDate(
    //       Number(viewBookingTicketData?.data?.eventDetails?.startTime),
    //       languageName
    //     )} - ${eventdetailsformatDate(
    //       Number(viewBookingTicketData?.data?.eventDetails?.endTime),
    //       languageName
    //     )}`;
    //   } else {
    //     return `${eventdetailsformatDate(
    //       Number(viewBookingTicketData?.data?.eventDetails?.startTime),
    //       languageName
    //     )}`;
    //   }
    // } else {
    //   return "";
    // }
  };

  const UserContentList = [
    {
      title: i18n.t(`eTicket.viewHeader.name`),
      data:
        viewBookingTicketData?.data?.userDetails?.firstName &&
        viewBookingTicketData?.data?.userDetails?.firstName +
          " " +
          viewBookingTicketData?.data?.userDetails?.lastName,
    },
    {
      title: i18n.t(`eTicket.viewHeader.email`),
      data:
        viewBookingTicketData?.data?.userDetails?.email &&
        viewBookingTicketData?.data?.userDetails?.email,
    },
    {
      title: i18n.t(`eTicket.viewHeader.BookingID`),
      data: viewBookingTicketData?.data?.bookingId,
    },
    {
      title: i18n.t(`eTicket.viewHeader.PaymentMethod`),
      data: selectedPaymentMethod?.title,
      // data: paymentMethod[viewBookingTicketData?.data?.paymentMethod],
    },
    // {
    //   title: i18n.t(`eTicket.viewHeader.BookingDateAndTime`),
    //   data:
    //     viewBookingTicketData?.data?.bookingTime &&
    //     eventdetailsformatDate(Number(viewBookingTicketData?.data?.bookingTime),languageName),
    // },
    {
      title: i18n.t(`eTicket.viewHeader.quantity`),
      data: viewBookingTicketData?.data?.quantity,
      // ? i18n.t(`eTicket.viewHeader.free`)
      // : `${currency?.name} ${viewBookingTicketData?.data?.eventPrice} ${currency?.title}`
    },
    {
      title: i18n.t(`eTicket.viewHeader.EventPrice`),
      data:
        viewBookingTicketData?.data?.eventPrice === 0 ? (
          i18n.t(`eTicket.viewHeader.free`)
        ) : (
          <>
            <i
              className={
                currency?.id === 1
                  ? "icon-USD"
                  : currency?.id === 2
                  ? "" //////// "icon-CHF"
                  : currency?.id === 3
                  ? "icon-EUR"
                  : ""
              }
            ></i>
            {`${priceFormator(
              viewBookingTicketData?.data?.eventPrice,
              i18n?.language
            )} ${currency?.title}`}
          </>
        ),
    },
    {
      title: i18n.t(`eTicket.viewHeader.BookingDateAndTime`),
      data:
        viewBookingTicketData?.data?.bookingTime &&
        `${OrgGetDate(
          Number(viewBookingTicketData?.data?.bookingTime),
          languageName
        )}, ${OrgGetTime(Number(viewBookingTicketData?.data?.bookingTime))}`,
    },
    // {
    //   title: i18n.t(`eTicket.viewHeader.quantity`),
    //   data: viewBookingTicketData?.data?.quantity,
    //   // ? i18n.t(`eTicket.viewHeader.free`)
    //   // : `${currency?.name} ${viewBookingTicketData?.data?.eventPrice} ${currency?.title}`
    // },
  ];
  const UserContentList2 = [
    {
      title: i18n.t(`eTicket.viewHeader.Event`),
      data: viewBookingTicketData?.data?.eventDetails?.title,
    },
    {
      title: viewBookingTicketData?.data?.eventDetails?.city?.name
        ? i18n.t(`eTicket.viewHeader.EventLocation`)
        : i18n.t(`eTicket.viewHeader.onlineLink`),
      data: SetEventType(),
    },
    {
      title: i18n.t(`eTicket.viewHeader.EventDateandTime`),
      data: viewBookingTicketData?.data?.bookingId && SetEventDateTime(),
    },
    {
      title: i18n.t(`eTicket.viewHeader.EventCategory`),
      data: eventCategory[viewBookingTicketData?.data?.eventDetails?.category],
    },
  ];

  useEffect(() => {
    dispatch(
      asyncViewBookingTicket(
        {
          eventId: tId,
        },
        (e) => {
          dispatch(asyncDownloadPdf(e));
        }
      )
    );
  }, []);

  // useEffect(() => {
  //     !isLoading &&
  //         dispatch(
  //             asyncDownloadPdf({
  //                 eventBookingId: viewBookingTicketData?.data?.eventBookingId,
  //                 eventId: viewBookingTicketData?.data?.eventDetails?.eventId
  //             })
  //         )
  // }, [isLoading])

  const handleGeneratePdf = async () => {
    // dispatch(asyncDownloadPdf({
    //   eventBookingId: viewBookingTicketData?.data?.eventBookingId,
    //   eventId: viewBookingTicketData?.data?.eventDetails?.eventId
    // }))
    // downloadpdfData?.data?.url
    // Ensure that the PDF data is available
    if (downloadpdfData && downloadpdfData.data && downloadpdfData.data.url) {
      const pdfUrl = downloadpdfData.data.url;

      // Fetch the PDF content from the URL
      fetch(pdfUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // Create an object URL from the blob
          const url = URL.createObjectURL(blob);

          // Create a link element
          const link = document.createElement("a");
          link.href = url;
          link.download = "NamaScape-Booking.pdf"; // specify the filename

          // Append the link to the document
          document.body.appendChild(link);

          // Trigger a click on the link to initiate the download
          link.click();

          // Remove the link from the document
          document.body.removeChild(link);

          // Revoke the object URL to free up resources
          URL.revokeObjectURL(url);
        })
        .catch((error) => {
          console.error("Error downloading PDF:", error);
        });
    } else {
      console.error("PDF data is not available.");
    }
  };

  return (
    <>
      <div className="e-ticket-box">
        <div className="top">
          <div className="qr-code">
            {isLoading ? (
              <>
                <Skeleton width={238} height={238} />
              </>
            ) : (
              <Image
                src={viewBookingTicketData?.data?.qrcode}
                alt="qr-code"
                width={238}
                height={238}
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
              />
            )}
          </div>
        </div>
        <div className="bottom">
          <ul className="user-content-list">
            {UserContentList?.map((list, i) => {
              return (
                <li key={i}>
                  {console.log("listlistlistlist",selectedPaymentMethod?.title)}
                  <div className="label-name" >{list?.title}</div>
                  {isLoading ? (
                    <>
                      <Skeleton width="100%" height={20} />
                    </>
                  ) : (
                    <>
                    {(list?.title === "Name") ? (
                       <p>
                       {list?.data}
                       </p>
                    ) : (
                      <>
                      {list?.data}
                      </>
                    )}
                    </>
                  )}
                </li>
              );
            })}
          </ul>

          {isLoading ? (
            <>
              <ul className="user-content-list">
                {Array.from({ length: 4 }).map((_, j) => {
                  return (
                    <React.Fragment key={j}>
                      <li>
                        <div className="label-name">
                          <Skeleton width="60%" height={10} />
                        </div>
                        <H4>
                          <Skeleton width="100%" height={20} />
                        </H4>
                      </li>
                    </React.Fragment>
                  );
                })}
              </ul>
            </>
          ) : (
            <ul className="user-content-list">
              {UserContentList2?.map((list, i) => {
                return (
                  list?.data && (
                    <li key={i}>
                      <div className="label-name">{list?.title}</div>
                      {typeof list?.data === "object" ? (
                        <>
                          {/* {list?.data?.location} */}
                          <a target="_blank" href={list?.data?.gmap}>
                          {list?.data?.location}
                            {/* {list?.data?.gmap} */}
                          </a>
                        </>
                      ) : (
                        <>
                          {viewBookingTicketData?.data?.eventDetails
                            ?.onlineMeetingLink ? (
                            <a target="_blank" href={list?.data}>
                              {list?.data}
                            </a>
                          ) : (
                            <p>{list?.data}</p>
                          )}
                        </>
                      )}
                      {/* {list?.title === "Event Location" &&
                    typeof list?.data === "object" ?
                    (
                      <>
                        {list?.data?.location}
                        <a target="_blank" href={list?.data?.gmap}>
                          {list?.data?.gmap}
                        </a>
                      </>
                    ) : 
                    viewBookingTicketData?.data?.eventDetails
                        ?.onlineMeetingLink &&
                      list?.title === "Event Location" ? (
                      <a target="_blank" href={list?.data}>
                        {list?.data}
                      </a>
                    ) : (
                      <H4>{list?.data}</H4>
                    )} */}
                    </li>
                  )
                );
              })}
            </ul>
          )}

          {isPdfLoading ? (
            <button type="button" className="solid-btn download-btn">
              <LoaderBtn />
            </button>
          ) : (
            <button
              type="button"
              className="solid-btn download-btn"
              onClick={handleGeneratePdf}
            >
              {i18n.t(`eTicket.viewHeader.downloadBTN`)}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ETicket;
