"use client";
import Pagination from "@/app/components/Pagination/Pagination";
import ReactTableList from "@/app/components/Table/ReactTableList";
import { createColumnHelper } from "@tanstack/react-table";
import { EventBookingTimeStamp } from "@/utils/commonfn";
import { OrgGetDate, OrgGetTime } from "@/utils/commonfn/Date_TimeTS/index";
import {
  EventCategoryFn,
  EventRecurrenceFn,
  CreateEventTypeFn,
  CurrencyFn,
  DiscountTypeListFn,
} from "@/i18n/i18nCM/i18CM";
import { useTranslation } from "react-i18next";
import { priceFormator } from "@/utils/commonfn/PriceCMFun/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

const EventTable = ({
  languageName,
  data,
  isLoading,
  totalCount,
  setCurrentPage,
  currentPage,
  TotalLimit,
  currency,
}) => {
  const { i18n } = useTranslation();
  // const search = useSearchParams()
  const router = useRouter();
  // const pageCount = search.get("ct")
  /////////////////////////////////
  const EventRecurrence = EventRecurrenceFn(i18n);
  const CreateEventType = CreateEventTypeFn(i18n);
  const Currency = CurrencyFn(i18n);
  const DiscountTypeList = DiscountTypeListFn(i18n);
  const EventCategory = EventCategoryFn(i18n);
  ///////////////////////////////////////////
  // function EventBookingTimeStamp(timestamp) {
  //   // Convert timestamp to Date object
  //   const date = new Date(timestamp);

  //   // Define desired format options
  //   const options = {
  //     // weekday: "short",
  //     month: "short",
  //     day: "numeric",
  //     year: "numeric",
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: true,
  //   };

  //   // Use Intl.DateTimeFormat to format the date
  //   return new Intl.DateTimeFormat("en-US", options).format(date);
  // }

  const transformTableData = (data) => {
    return data?.map((list) => {
      const categoryData = EventCategory.find(
        (e) => e?.id === list?.eventDetails?.category
      );
      const currency = Currency?.find((e) => e?.id === list?.currency);

      const formattedDate = list?.bookingTime
        ? `${OrgGetDate(Number(list?.bookingTime), languageName)}, ${OrgGetTime(
            Number(list?.bookingTime)
          )}`
        : "";
      return {
        image: list?.userDetails?.profileImage,
        id: list?.bookingId,
        title: list?.eventDetails?.title,
        category: categoryData?.title,
        qty: list?.quantity,
        asaGift: list?.asAGift ? "Yes" : "No",
        totalamoutwithoutTransaction: list?.eventPrice * list?.quantity,
        amount: list?.eventPrice,
        transationFees: list?.transactionFeesInPercentage,
        totalPrice: list?.amountPaid,
        username: `${list?.userDetails?.firstName} ${list?.userDetails?.lastName}`,
        bookingDateTime: formattedDate,
        actions: list?.eventBookingId,
        currency,
      };
    });
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor((row) => row?.id, {
      id: "id",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.BookingID`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.image, {
      id: "image",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.Image`),
      cell: (e) => {
        return (
          <>
            <Image
              src={e.getValue()}
              alt="event-image"
              width={52}
              height={52}
            />
          </>
        );
      },
    }),
    columnHelper.accessor((row) => row?.title, {
      id: "title",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.title`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.category, {
      id: "category",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.Category`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.qty, {
      id: "qty",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.quantity`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.amount, {
      id: "amount",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.Amount`),
      cell: (info) => {
        const amountValue = info.getValue();
        const hasAmount = amountValue > 0;
        return (
          <>
            {hasAmount && (
              <i
                className={
                  info.row.original.currency?.id === 1
                    ? "icon-USD"
                    : info.row.original.currency?.id === 2
                    ? "" ////// icon-CHF
                    : info.row.original.currency?.id === 3
                    ? "icon-EUR"
                    : ""
                }
              ></i>
            )}
            {hasAmount
              ? `${priceFormator(amountValue,i18n?.language)} ${info.row.original.currency?.title}`
              : "Free"}
          </>
        );
      },
    }),

    columnHelper.accessor((row) => row?.totalamoutwithoutTransaction, {
      id: "totalamoutwithoutTransaction",
      header: () =>
        i18n.t(
          `organizer.eventBooking.BookingTable.tableHeader.totalPriceWithoutTransaction`
        ),
      cell: (info) => {
        const amountValue = info.getValue();
        const hasAmount = amountValue > 0;
        return (
          <>
            {hasAmount && (
              <i
                className={
                  info.row.original.currency?.id === 1
                    ? "icon-USD"
                    : info.row.original.currency?.id === 2
                    ? "" ////// icon-CHF
                    : info.row.original.currency?.id === 3
                    ? "icon-EUR"
                    : ""
                }
              ></i>
            )}
            {hasAmount
              ? `${priceFormator(amountValue,i18n?.language)} ${info.row.original.currency?.title}`
              : "Free"}
          </>
        );
      },
    }),

    columnHelper.accessor((row) => row?.asaGift, {
      id: "asaGift",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.asAGift`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    // columnHelper.accessor((row) => row?.transationFees, {
    //     id: 'transationFees',
    //     header: () => i18n.t(`organizer.eventBooking.BookingTable.tableHeader.transactionFees`),
    //     cell: (info) => {
    //         const amountValue = info.getValue()
    //         const hasAmount = amountValue > 0
    //         return (
    //             <>
    //                 {/* {hasAmount && (
    //                     <i
    //                         className={
    //                             info.row.original.currency?.id === 1
    //                                 ? 'icon-USD'
    //                                 : info.row.original.currency?.id === 2
    //                                 ? 'icon-CHF'
    //                                 : info.row.original.currency?.id === 3
    //                                 ? 'icon-EUR'
    //                                 : ''
    //                         }
    //                     ></i>
    //                 )} */}
    //                 {hasAmount
    //                     ? `${amountValue}`
    //                     : 'Free'}
    //             </>
    //         )
    //     }
    // }),
    // columnHelper.accessor((row) => row?.totalPrice, {
    //     id: 'totalPrice',
    //     header: () => i18n.t(`organizer.eventBooking.BookingTable.tableHeader.totalPrice`),
    //     cell: (info) => {
    //         const amountValue = info.getValue()
    //         const hasAmount = amountValue > 0
    //         return (
    //             <>
    //                 {hasAmount && (
    //                     <i
    //                         className={
    //                             info.row.original.currency?.id === 1
    //                                 ? 'icon-USD'
    //                                 : info.row.original.currency?.id === 2
    //                                 ? 'icon-CHF'
    //                                 : info.row.original.currency?.id === 3
    //                                 ? 'icon-EUR'
    //                                 : ''
    //                         }
    //                     ></i>
    //                 )}
    //                 {hasAmount
    //                     ? `${amountValue} ${info.row.original.currency?.title}`
    //                     : 'Free'}
    //             </>
    //         )
    //     }
    // }),
    columnHelper.accessor((row) => row?.username, {
      id: "username",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.Username`),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.bookingDateTime, {
      id: "bookingDateTime",
      header: () =>
        i18n.t(
          `organizer.eventBooking.BookingTable.tableHeader.BookingDateandTime`
        ),
      cell: (info) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor((row) => row?.actions, {
      id: "actions",
      header: () =>
        i18n.t(`organizer.eventBooking.BookingTable.tableHeader.Actions`),
      cell: (e) => {
        return (
          <Link
            href={`/event-booking/${e.getValue()}`}
            className="solid-btn dashboard-form-btn"
          >
            {i18n.t(`organizer.eventBooking.BookingTable.tableHeader.ViewBTN`)}
          </Link>
        );
      },
    }),
  ];

  const tableData = transformTableData(data);

  return (
    <>
      <ReactTableList
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        noData={i18n.t("organizer.eventBooking.BookingTable.noData")}
      />
      {totalCount > 6 && (
        <Pagination
          totalCount={totalCount}
          setCurrentPage={(e) => {
            router.push(`/event-booking?ct=${e}`);
            // setCurrentPage(e)
          }}
          activePage={currentPage || "1"}
          TotalLimit={TotalLimit}
          pageCount={Math?.ceil(totalCount / TotalLimit)}
        />
      )}
    </>
  );
};

export default EventTable;
