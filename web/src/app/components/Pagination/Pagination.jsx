"use client"
import ReactPaginate from "react-paginate";
import "./Pagination.scss";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({
  setCurrentPage,
  pageCount,
  activePage,
  totalCount,
  TotalLimit,
  className
}) => {
  const  {i18n} = useTranslation()
  const [isClient, setisClient] = useState(false)
  useEffect(() => {
    setisClient(true)
  }, [])

  

  return isClient && (
    <div className={`custom-pgntion ${className ? className : ''}`}>
      <p>
        {/* {i18n.t(`organizer.event.eventmanagement.pagination.shoingcount.showing`)}{" "} */}
        {(activePage - 1) * TotalLimit + // DataLimit  -it's state when its come from parent
          1} - {" "}
        {/* {i18n.t(`organizer.event.eventmanagement.pagination.shoingcount.to`)}{" "} */}
        {Math?.min(
          activePage * TotalLimit, // DataLimit -it's state when its come from parent
          totalCount
        )}{" "}
        {i18n.t(`organizer.event.eventmanagement.pagination.shoingcount.of`)} {totalCount} {i18n.t(`organizer.event.eventmanagement.pagination.shoingcount.entries`)}
      </p>

        <ReactPaginate
          forcePage={activePage - 1}
          breakLabel="..."
          breakLinkClassName="notPointer"
          className="pagination-wrap"
          nextLabel=""
          previousLabel=""
          onPageChange={(e) => {
            setCurrentPage(e.selected + 1);
            
          }}
          // pageRangeDisplayed={3}
          // marginPagesDisplayed={1}
          pageCount={pageCount}
          previousLinkClassName="icon-back"
          nextLinkClassName="icon-back"
          renderOnZeroPageCount={null}
          activeClassName="selected"
          disabledClassName="disable"
        />
    </div>
  );
};

export default Pagination;
