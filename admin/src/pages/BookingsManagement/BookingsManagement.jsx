import React, { useCallback, useState } from "react";
import "./BookingsManagement.scss";
import { home } from "../../config/routeConsts";
import BookingsManagementTable from "./BookingsManagementTable";
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb";
import { useForm } from "react-hook-form";
import requestApi from "../../common/request";
import { useDispatch } from "react-redux";

const BookingsManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 1
  );
  const dispatch = useDispatch();
  const [filterData, setFilterData] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSearch = useCallback((e) => {
    setTimeout(() => {
      setSearch(e.target.value);
      localStorage.setItem("currentPage", 1);
      setPage(1);
    }, 1000);
  }, []);

  const downloadEvents = async () => {
    try {
      const response = await requestApi.post("/event-booking/export-data", {
        startDate: filterData?.start_date
          ? new Date(filterData?.start_date).getTime()
          : "",
        endDate: filterData?.end_date
          ? new Date(filterData?.end_date).getTime()
          : "",
      });

      const fileURL = response.data.url;
      if (fileURL) {
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", "filename.ext");
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
      } else {
        console.log("no data available");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const BreadcrumbData = [
    {
      title: "Home",
      url: home,
    },
    {
      title: "Bookings Management",
    },
  ];
  return (
    <>
      <div className="bookings-management">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>Bookings Management</h2>
          <div className="flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8">
            <button
              className="flex items-center download-link"
              onClick={() => downloadEvents()}
            >
              <i className="icon-download"></i>Download Data
            </button>
          </div>
          {/* <form
                        className="flex items-center flex-wrap searchbar-wrap date-filter-bar"
                        {...register('search', {
                            onChange: (e) => {
                                handleSearch(e)
                            }
                        })}
                    >
                               <div className="flex items-center search-input input-group mb-0">
                                <i className='icon-search'></i>
                                <input type="search" name="search" placeholder='Search here' />
                            </div>
                    </form> */}
          {/* <div
                        className="flex items-center download-link"
                        onClick={() => downloadEvents()}
                    >
                        <i className="icon-download"></i>Download Data
                    </div> */}
        </div>
        <BookingsManagementTable
          // filterData={filterData}
          // setFilterData={setFilterData}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default BookingsManagement;
