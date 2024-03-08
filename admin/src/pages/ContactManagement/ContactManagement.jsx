import React, { useCallback, useEffect, useState } from "react";
import { home } from "../../config/routeConsts";
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb";
import ContactManagementTable from "./ContactManagementTable";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import requestApi from "../../common/request";

const ContactManagement = () => {
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
  const dispatch = useDispatch();

  //   const handleSearch = useCallback((e) => {
  //     setTimeout(() => {
  //         setSearch(e.target.value)
  //         localStorage.setItem("currentPage",1)
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
      const response = await requestApi.post(
        `${process.env.VITE_APP_API_HOST}/contact-us/export-contact-us`
        // "https://staging.multiqos.com:8843/admin/contact-us/export-contact-us"
      );

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
      title: "Contact Management",
    },
  ];
  return (
    <>
      <div className="contact-management">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>Contact Management</h2>
          <div className="flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8">
            <div className="flex items-center flex-wrap header-action">
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
        <div className="mt-32">
          <ContactManagementTable
            search={search}
            setSearch={setSearch}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </>
  );
};

export default ContactManagement;
