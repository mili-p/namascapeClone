import React, { Suspense, useCallback, useState } from "react";
import "./UserManagement.scss";
import SiteBreadcrumb from "../../components/SiteBreadcrumb/SiteBreadcrumb";
import { home } from "../../config/routeConsts";
import { useForm } from "react-hook-form";
import { ExportToExcel } from "../../functions/ExportToExcel";
import requestApi from "../../common/request";
import { asyncUserListThunk } from "../../redux/thunk/userThunk/user.thunk";
import { useDispatch } from "react-redux";
const UsersManagementTable = React.lazy(() => import("./UsersManagementTable"));

const UserManagement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const [page, setPage] = useState(
    JSON.parse(localStorage.getItem("currentPage")) || 1
  );
  console.log(search, "searchsearch");
  // const handleSearch = useCallback((e) => {
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
      const response = await requestApi.post("/user/export-users", {
        userType: 2,
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
      title: "Users Management",
    },
  ];
  return (
    <>
      <div className="user-management">
        <SiteBreadcrumb
          BreadcrumbData={BreadcrumbData}
          className="protected-breadcrumb"
        />
        <div className="protected-head">
          <h2>Users Management</h2>
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
                          // dispatch(
                          //     asyncUserListThunk({
                          //         page,
                          //         limit: 10,
                          //         userType: 2,
                          //     })
                          // )
                        }
                      },
                    })}
                  />
                </div>
              </form>
            </div>
            <div
              className="flex items-center download-link"
              onClick={() => downloadEvents()}
            >
              <i className="icon-download"></i>Download Data
            </div>
          </div>
        </div>
        <div className="mt-32">
          <Suspense fallback={<div>Loading</div>}>
            <UsersManagementTable
              search={search}
              setSearch={setSearch}
              page={page}
              setPage={setPage}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default UserManagement;
