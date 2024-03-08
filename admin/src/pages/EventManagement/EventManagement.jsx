import React, { useCallback, useEffect, useState } from "react";
import "./EventManagement.scss";
import { useForm } from "react-hook-form";
import { home } from "../../config/routeConsts";
import requestApi from "../../common/request";
import { EVENTSTATUS, EVENTTYPE } from "../../common/constsforCodes";

import EventManagementTable from "./EventManagementTable";
import { asyncUserListThunk } from "../../redux/thunk/userThunk/user.thunk";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

const EventFilterForm = React.lazy(() => import("./EventFilterForm"));
const SiteBreadcrumb = React.lazy(() =>
  import("../../components/SiteBreadcrumb/SiteBreadcrumb")
);
const EventFilterModal = React.lazy(() =>
  import("../../components/EventFilterModal/EventFilterModal")
);

const EventManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const dispatch = useDispatch();
  const { userList, isLoading } = useSelector((e) => e.user);
  const { search: p } = useLocation();
  console.log(new URLSearchParams(p).get("cd"), "IIIIIIIIIIIIIIIIIII");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 1
  );
  const [filterModalShow, setFilterModalShow] = useState(false);
  const [filterData, setFilterData] = useState(null);

  // const handleSearch = useCallback((e) => {
  //     setTimeout(() => {
  //         setSearch(e.target.value)
  //         setPage(1)
  //     }, 1000)
  // }, [])

  ///// Create New for searching code start Hiren //////
  const handleSearch = (e) => {
    setSearch(e?.search);
    localStorage.setItem("currentPage", 1);
    setPage(1);
  };
  ///// Create New for searching code ends Hiren //////
  const downloadEvents = async () => {
    try {
      const payload = {
        isPaid: false,
        isFree: false,
      };
      if (filterData?.isPaid?.title == "Paid") {
        payload.isPaid = true;
      } else if (filterData?.isPaid?.title == "Free") {
        payload.isFree = true;
      } else if (filterData?.sortbyprice?.title === "Low - High") {
        payload.sortBy = "price:1";
      } else if (filterData?.sortbyprice?.title === "High - Low") {
        payload.sortBy = "price:-1";
      } else if (filterData?.sortbytime?.title === "Earliest to Latest") {
        payload.sortBy = "startTime:1";
      } else if (filterData?.sortbytime?.title === "Latest to Earliest") {
        payload.sortBy = "startTime:-1";
      }
      
      const response = await requestApi.post("/event/export-events", {
        status: EVENTSTATUS.find(
          (e) => e.title === filterData?.EventStatus?.title
        )?.id,
        search,
        eventType: EVENTTYPE.find(
          (e) => e.title === filterData?.eventType?.title
        )?.id,
        location: filterData?.city?.cityId,
        ...payload,
        startDate: filterData?.start_date
          ? new Date(filterData?.start_date).setHours(0,0,0)
          : "",
        endDate: filterData?.end_date
          ? new Date(filterData?.end_date).setHours(0,0,0)
          : "",
      });

      const fileURL = response?.data?.url;
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
      title: "Experience Management",
    },
  ];

  useEffect(() => {
    dispatch(
      asyncUserListThunk({
        limit: -1,
        userType: 1,
      })
    );
  }, []);

  return (
    <>
      <div className="event-management">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head mb-32">
          <h2>Experience Management</h2>
          <div className="flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8">
            <div className="flex items-center flex-wrap header-action">
              <button
                className="filter-btn list-btn"
                title="Filter"
                onClick={() => setFilterModalShow(true)}
              >
                <i className="icon-filter"></i>
              </button>
              <form
                className="flex items-center flex-wrap searchbar-wrap date-filter-bar"
                // {...register('search', {
                //     onChange: (e) => {
                //         handleSearch(e)
                //     }
                // })}
                onSubmit={handleSubmit(handleSearch)}
              >
                <div className="flex items-center search-input input-group mb-0">
                  <i className="icon-search"></i>
                  <input
                    type="search"
                    name="search"
                    placeholder="Search here"
                    {...register("search", {
                      onChange: (e) => {
                        if (!e?.target?.value) {
                          setSearch("");
                        }
                      },
                    })}
                  />
                </div>
              </form>

              <button
                className="flex items-center download-link"
                onClick={() => downloadEvents()}
              >
                <i className="icon-download"></i>Download Data
              </button>
            </div>
          </div>
        </div>
        <EventManagementTable
          filterData={filterData}
          setFilterData={setFilterData}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
        />
      </div>

      <EventFilterModal show={filterModalShow} className={"filter-modal"}>
        {filterModalShow && (
          <EventFilterForm
            setFilterModalShow={setFilterModalShow}
            filterData={filterData}
            setFilterData={setFilterData}
            getValue={(value) => {
              setFilterData(value);
            }}
            partnerList={userList.data}
            setPage={setPage}
          />
        )}
      </EventFilterModal>
    </>
  );
};

export default EventManagement;
