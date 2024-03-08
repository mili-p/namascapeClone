import React from "react";
import "./EventProviderList.scss";
import Link from "next/link";

const EventProviderList = ({ EventListWrapper, eventData,booking }) => {
  return (
    <>
      <ul className="flex items-center flex-wrap event-list-wrapper">
        {EventListWrapper?.map((list, i) => {
          return (
            <React.Fragment key={i}>
              {(list.title || list.meetLink) && (
                <li className="flex items-center w-full xl:w-1/2">
                  <span className="inline-flex items-center justify-center icon">
                    {list.icon}
                  </span>
                  <div>
                    {list.title && (
                    <span
                      className={`block head ${
                        list?.title === "FREE" ? "m-0" : ""
                      }`}
                    >
                      {list.title}
                    </span>
                    )}
                    {list?.link ?  <Link href={list?.link || "/"} target="__blank">
                        {list.subTitle}
                      </Link> :  booking && list?.meetLink ? <Link href={list?.meetLink || "/"} target="__blank">
                        {list.subTitle}
                      </Link>  :  list.subTitle }
                    {/* {(list?.link || booking) ? (
                      <Link href={(list?.link ? list?.link : list?.meetLink) || "/"} target="__blank">
                        {list.subTitle}
                      </Link>
                    ) : (
                      <>{list.subTitle}</>
                    )} */}
                  </div>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
};

export default EventProviderList;
