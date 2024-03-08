import React, { useCallback, useState } from "react";
import { adddiscountcode, home } from "../../config/routeConsts";
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb";
import { Link } from "react-router-dom";
import DiscountCodeManagementTable from "./DiscountCodeManagementTable";
import "./DiscountCodeManagement.scss";
import { useForm } from "react-hook-form";
import requestApi from "../../common/request";
import { ExportToExcel } from "../../functions/ExportToExcel";

const DiscountCodeManagement = () => {
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

  // const handleSearch = useCallback((e) => {
  //   setTimeout(() => {
  //     setSearch(e.target.value);
  //     localStorage.setItem("currentPage", 1);
  //     setPage(1);
  //   }, 1000);
  // }, []);

  ///// Create New for searching code start Hiren //////
  const handleSearch = (e) => {
    setSearch(e?.search);
    localStorage.setItem("currentPage", 1);
    setPage(1);
  };
  ///// Create New for searching code ends Hiren //////

  const downloadEvents = async () => {
    try {
      const response = await requestApi.post("/discount/export-discount");

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
      title: "Discount Code Management",
    },
  ];
  return (
    <>
      <div className="discount-code-management">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>Discount Code Management</h2>
          <div className="flex items-center wrap-boxs flex-wrap gap-4 sm:gap-5 3xl:gap-8">
            <div className="flex items-center flex-wrap header-action">
              <form
                className="flex items-center flex-wrap searchbar-wrap date-filter-bar"
                // {...register("search", {
                //   onChange: (e) => {
                //     handleSearch(e);
                //   },
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
              <Link
                to={adddiscountcode}
                className="solid-btn dashboard-form-btn"
              >
                + Add Discount Code
              </Link>
              <div
                className="flex items-center download-link"
                onClick={() => downloadEvents()}
              >
                <i className="icon-download"></i>Download Data
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32">
          <DiscountCodeManagementTable
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

export default DiscountCodeManagement;
