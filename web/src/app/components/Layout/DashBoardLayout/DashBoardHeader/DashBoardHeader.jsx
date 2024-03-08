"use client";
import Link from "next/link";
import React, { useState, useEffect, useCallback } from "react";
import "./DashBoardHeader.scss";
import Image from "next/image";
import deafultImage from "@/public/assets/images/signUpUser.png";
import H5 from "@/app/components/common/h5";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import DeleteLogoutModal from "@/app/components/SiteModal/DeleteLogoutModal/DeleteLogoutModal";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../../../../redux/Thunks/auth.thunk";
import { signInSuccess } from "../../../../../../redux/slices/authentication";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import ReactSelectcmp from "../../../../components/ReactSelectcmp/ReactSelectcmp";
import { LanguageList } from "@/utils/commonfn";
import NotificationOrgCM from "@/app/components/NotificationOrgCM/NotificationOrgCM";
import { eventManagementThunk } from "../../../../../../redux/Thunks/Organizer/EventManagement/eventmanagement.thunk";
import { asyncViewprofile } from "../../../../../../redux/Thunks/Account/viewprofile.thunk";
import { globalSearchDataList } from "../../../../../../redux/slices/Organizer/EventManagement/EventManagementSlice";

let timer;
const DashBoardHeader = ({ setmobileToggle }) => {
  const [show, setshow] = useState(false);
  const [searchShow, setSearchShow] = useState(true);
  const router = useRouter();
  const [Toggle, setToggle] = useState(false);
  const [Toggle2, setToggle2] = useState(false);
  const [active, setActive] = useState(false);
  const { notiData, ViewCount } = useSelector((e) => e.NotificationSlice);
  const { eventList, globalSearchEventData } = useSelector(
    (m) => m.EventManagementSlice
  );
  const { userData } = useSelector((e) => e.authentication);
  const userProfileData =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("userData")
      : null;
  const userDataFromLocal = JSON.parse(userProfileData);
  // const getDataLG =
  //   typeof localStorage !== "undefined"
  //     ? localStorage.getItem("language")
  //     : "en";
  // const lg = {
  //   id: getDataLG ? getDataLG : "en",
  //   name: getDataLG === "de" ? "DE" : "EN",
  // };
  const getDataLG =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("language")
      : "de";
  const lg = {
    id: getDataLG ? getDataLG : "de",
    name: getDataLG === "en" ? "EN" : "DE",
  };
  const { control, watch, handleSubmit, register } = useForm({
    defaultValues: {
      launguage: lg,
      // launguage : { id: "de", name: "DE" },
      // language : localStorage.getItem('language')
    },
  });
  //   const [userData, setUserData] = useState(userDataFromLocal || "");
  // useEffect(()=> {
  //     if(reducerData){
  //         setUserData(reducerData)
  //     }
  // },[reducerData])
  //   useEffect(() => {
  //     if (userDataFromLocal) {
  //       setUserData(userDataFromLocal);
  //     }
  //   }, [userDataFromLocal]);

  useEffect(() => {
    // dispatch(signInSuccess(userProfile))
    if (typeof localStorage !== "undefined") {
      setActive(true);

      // console.log(userData,"userDatauserData");
    }
  }, []);

  const dispatch = useDispatch();

  const OpenMenu2 = () => {
    setToggle2(!Toggle2);
    setToggle(false);
  };

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const activeTab = searchParams.get("activeTab");
  const globalSearchValue = searchParams.get("search");
  const uniqueId = searchParams.get("uniqueId");
  const duplicate = searchParams.get("duplicate");

  const [searchValue, setSearchValue] = useState(globalSearchValue || "");
  const [aa, setAA] = useState(null);
  const openMobileMenu = () => {
    setmobileToggle(true);
    document.body.classList.add("open-menu");
  };

  const logOutClickFunction = () => {
    setshow(true);
    setToggle2(false);
  };

  const CancelModal = () => {
    setshow(false);
    document.body.classList.remove("open-modal");
  };

  const logOutSuccessFunction = () => {
    // alert('')
    dispatch(
      logOutUser("", () => {
        setshow(false);
        router.push("/");
      })
    );
    document.body.classList.remove("open-modal");
    // localStorage.removeItem('userData')
  };

  useEffect(() => {
    dispatch(asyncViewprofile());
  }, []);

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );
  // useEffect(() => {
  //   if (!!searchValue) {
  //     if (timer) {
  //       clearTimeout(timer);
  //     }
  //     timer = setTimeout(() => {
  //       if (activeTab) {
  //         if (searchValue === "") {
  //           const updatedURL = new URL(window.location.href);
  //           updatedURL.searchValue = ""; // Empty search string removes the query string

  //           // Replace the current URL with the updated URL
  //           window.history.replaceState(null, null, updatedURL.toString());
  //         } else {
  //           const updatedURL = new URL(window.location.href);
  //           updatedURL.searchParams.set("searchValue", searchValue);
  //           // updatedURL.searchParams.set('activeTab', searchValue);
  //           console.log(updatedURL, "updatedURL");
  //           window.history.replaceState(null, null, updatedURL.toString());
  //         }
  //       } else {
  //         if (searchValue === "") {
  //           const updatedURL = new URL(window.location.href);
  //           updatedURL.searchValue = ""; // Empty search string removes the query string

  //           // Replace the current URL with the updated URL
  //           window.history.replaceState(null, null, updatedURL.toString());
  //         } else {
  //           const updatedURL = new URL(window.location.href);
  //           updatedURL.searchParams.set("searchValue", searchValue);
  //           // updatedURL.searchParams.set('activeTab', 1);
  //           console.log(updatedURL, "updatedURL");
  //           window.history.replaceState(null, null, updatedURL.toString());
  //         }
  //         // router.push(`${pathName}?searchValue=${searchValue}`)
  //       }
  //     }, 500);
  //   }
  //   if (typeof window !== "undefined" && activeTab) {
  //     if (searchValue === "") {
  //       const updatedURL = new URL(window.location.href);
  //       updatedURL.searchValue = ""; // Empty search string removes the query string

  //       // Replace the current URL with the updated URL
  //       window.history.replaceState(null, null, updatedURL.toString());
  //     } else {
  //       const updatedURL = new URL(window.location.href);
  //       // updatedURL.searchParams.set('searchValue', searchValue);
  //       updatedURL.searchParams.set("activeTab", 1);
  //       console.log(updatedURL, "updatedURL");
  //       window.history.replaceState(null, null, updatedURL.toString());
  //     }
  //     // router.push(`${pathName}?activeTab=${activeTab}`);
  //   }
  // }, [searchValue]);

  //////////// language change functionality //////
  const { i18n, t } = useTranslation();
  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
  }

  /////////// End Language change functionality ////

  // useEffect(() => {
  //   if (activeTab) {
  //     if (searchValue) {
  //       router.push(`${pathName}?${createQueryString("search", searchValue)}`);
  //     } else {
  //       router.push(`${pathName}?activeTab=${activeTab}`);
  //     }
  //   } else {
  //     if (searchValue) {
  //       router.push(`${pathName}?${createQueryString("search", searchValue)}`);
  //     }
  //     if (uniqueId) {
  //       router.push(`${pathName}?uniqueId=${uniqueId}`);
  //     } else {
  //       router.push(`${pathName}`);
  //     }
  //     if (duplicate === "true") {
  //       router.push(`${pathName}?uniqueId=${uniqueId}&duplicate=${duplicate}`);
  //     }
  //   }
  // }, [searchValue, activeTab]);

  useEffect(() => {
    if (typeof window !== "undefined" && pathName) {
      return () => {
        setSearchValue("");
      };
    }
  }, [pathName]);

  ////////////// search header start ////////////////////
  // const [searchData,setSearchData] = useState()

  // useEffect(() => {
  //   if (timer) {
  //     clearTimeout(timer);
  //   }
  //   timer = setTimeout(() => {
  //     if (aa) {
  //       dispatch(
  //         eventManagementThunk({
  //           search: aa || "",
  //         })
  //       );
  //     }
  //   }, [600]);
  // }, [aa]);

  useEffect(() => {
    if (!watch("search")) {
      dispatch(globalSearchDataList());
    }
  }, [watch("search")]);

  const handleSearch = (e) => {
    if (e?.search) {
      dispatch(
        eventManagementThunk(
          {
            search: e?.search || "",
          },
          () => {
            setSearchShow(true);
          }
        )
      );
    }
  };

  /////////////  search header end ////////

  return (
    <>
      <header className="flex justify-between protected-header">
        <div className="flex items-center">
          <div className="flex items-center protected-logo">
            <div
              className="flex items-center protected-mobile-toggle"
              onClick={openMobileMenu}
            >
              <i className=""></i>
            </div>
            <Link href={"/dashboard"}>
              <Image
                src="/assets/images/protected-logo.svg"
                alt="logo"
                width={174}
                height={50}
              />
            </Link>
          </div>
          <div className="search-bar-wrapper">
            <form
              className="protected-search"
              onSubmit={handleSubmit(handleSearch)}
            >
              {/* {(pathName === '/dashboard/' ||
                                    pathName === '/event-management/') && ( */}
              <input
                type="search"
                // value={aa || ""}
                placeholder={i18n.t(`organizer.dashboardheader.search`)}
                // onChange={(e) => {
                //   console.log(e.target.value,"gbfbgxcbcbb")
                //   if(!e.target.value){
                //     dispatch(globalSearchDataList())
                //   }
                //   // setAA(e.target.value);
                //   // setSearchShow(true);
                // }}
                {...register("search")}
              />
              {/* // )} */}
            </form>
            {globalSearchEventData?.length > 0 && watch("search") ? (
              <>
                <ul
                  className={`search-list-wrapper ${searchShow ? "show" : ""} `}
                >
                  {globalSearchEventData?.map((ET, i) => (
                    <li
                      key={i}
                      className="search-list"
                      onClick={() => {
                        router.push(`/create-event/${ET?.eventId}`);
                        setSearchShow(false);
                        setAA(null);
                      }}
                    >
                      {ET?.title}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                {globalSearchEventData?.length === 0 && watch("search") && (
                  <ul
                    className={`search-list-wrapper ${
                      searchShow ? "show" : ""
                    } `}
                  >
                    <li className="search-list">
                      {i18n.t(`organizer.dashboardheader.noExperience`)}
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex items-center action-group">
          {active ? (
            <>
              {(pathName !== "/create-event/" || uniqueId) && (
                <Link
                  href="/create-event"
                  className="solid-btn create-event-btn"
                >
                  {i18n.t(`organizer.dashboardheader.createBtn`)}
                </Link>
              )}

              <NotificationOrgCM
                setToggle={setToggle}
                setToggle2={setToggle2}
                Toggle={Toggle}
              />
              <div
                className="my-account-dropdown"
                onMouseLeave={() => setToggle2(false)}
              >
                <div
                  className="flex items-center account-toggle"
                  onClick={OpenMenu2}
                >
                  {/* <Image src='/assets/images/protected-user-image.png' alt='user-image' width={50} height={50}/> */}
                  <Image
                    src={
                      userData?.data?.profileImage
                        ? userData?.data?.profileImage
                        : deafultImage
                    }
                    alt="user-image"
                    width={50}
                    height={50}
                  />
                  {/* <H5 className="title">Leslie Alexander</H5> */}
                  <H5 className="title">
                    {userData?.data?.firstName} {userData?.data?.lastName}
                  </H5>
                  <i className="icon-back"></i>
                </div>
                <div
                  className={`account-body ${Toggle2 == true ? "show" : ""}`}
                >
                  <Link
                    href="/myaccount"
                    className="flex items-center link"
                    onClick={() => setToggle2(false)}
                  >
                    <i className="icon-account"></i>
                    {i18n.t(`headerDropDown.dropDown.myaccount`)}
                  </Link>
                  <div
                    className="flex items-center link"
                    onClick={() => logOutClickFunction()}
                  >
                    <i className="icon-logout"></i>
                    {i18n.t(`headerDropDown.dropDown.logout`)}
                  </div>
                </div>
              </div>

              <Controller
                name="launguage"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <ReactSelectcmp
                      value={value}
                      className="header-ln-select"
                      openMenuOnFocus={true}
                      onChange={(e) => {
                        if (e?.id === "en") {
                          onChange(e);
                          localStorage.setItem("language", "en");
                          document.cookie = "language=en; path=/";
                          changeLanguage("en");
                          window.location.reload(true);
                        } else {
                          onChange(e);
                          localStorage.setItem("language", "de");
                          document.cookie = "language=de; path=/";
                          changeLanguage("de");
                          window.location.reload(true);
                        }
                      }}
                      isSearchable={false}
                      getOptionLabel={(e) => {
                        return e?.name;
                      }}
                      getOptionValue={(e) => {
                        return e?.id;
                      }}
                      options={LanguageList}
                    />
                  </>
                )}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <DeleteLogoutModal
          show={show}
          setshow={setshow}
          title={i18n.t(`logout.title`)}
          // title={<>are you sure you want <br /> Log out?</>}
          IconClass={"icon-logout"}
          SolidBTNText={i18n.t(`logout.logoutBtn`)}
          onClickCancle={() => CancelModal()}
          onClickOK={() => logOutSuccessFunction()}
        />
      </header>
    </>
  );
};

export default DashBoardHeader;
