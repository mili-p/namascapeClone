import React, { useCallback, useState } from "react";
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb";
import { addorganizerprofile, home } from "../../config/routeConsts";
import { Link } from "react-router-dom";
import EventOrganizerManagementTable from "./EventOrganizerManagementTable";
import { useForm } from "react-hook-form";
import requestApi from "../../common/request";
import { ExportToExcel } from "../../functions/ExportToExcel";
import { PARTNER } from "../../common/constsforCodes";
const EventOrganizerManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 1
  );

  //   const handleSearch = useCallback((e) => {
  //     setTimeout(() => {
  //       setSearch(e.target.value);
  //       localStorage.setItem("currentPage", 1);
  //       setPage(1);
  //     }, 1000);
  //   }, []);

  ///// Create New for searching code start Hiren //////
  const handleSearch = (e) => {
    setSearch(e?.search);
    localStorage.setItem("currentPage", 1);
    setPage(1);
  };

  ///// Create New for searching code ends Hiren //////

  const downloadEvents = async () => {
    try {
      const response = await requestApi.post("/user/export-users", {
        userType: 1,
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
      title: `${PARTNER} Management`,
    },
  ];
  return (
    <div className="event-organizer-management">
      <SiteBreadcrumb
        BreadcrumbData={BreadcrumbData}
        className="protected-breadcrumb"
      />
      <div className="protected-head">
        <h2>{`${PARTNER} Management`}</h2>
        <div className="flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8">
          <div className="flex items-center flex-wrap header-action">
            <form
              className="flex items-center flex-wrap searchbar-wrap date-filter-bar"
              onSubmit={handleSubmit(handleSearch)}
              // {...register('search', {
              //     onChange: (e) => {
              //         handleSearch(e)
              //     }
              // })}
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

            <Link
              to={addorganizerprofile}
              className="solid-btn dashboard-form-btn"
            >
              {`+ Add ${PARTNER}`}
            </Link>
            <div
              className="flex items-center download-link"
              onClick={() => downloadEvents()}
            >
              <i className="icon-download"></i>
              Download Data
            </div>
          </div>
        </div>
      </div>
      <div className="mt-32">
        <EventOrganizerManagementTable
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default EventOrganizerManagement;
