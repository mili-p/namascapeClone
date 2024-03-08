"use client";
import React, { useEffect } from "react";
import H3 from "../common/h3";
import { useRouter, useSearchParams } from "next/navigation";
const Tabs = ({ data, setActiveTab }) => {
  const search = useSearchParams()
  const activeTab = search.get("activeTab") || "1"
  const router = useRouter();
  // useEffect(()=> {
  //   router.push(`/event-management/?activeTab=${activeTab}&ct=1`);
  // },[])
  return (
    <>
      {data?.map((list, index) => {
        return (
          <li key={list?.key}>
            <H3 className={`item ${activeTab === list.key ? "active" : ""}`}>
              <button
                onClick={() => {
                  setActiveTab(list?.key);
                  router.push(`/event-management/?activeTab=${list?.key}&ct=1`);
                }}
              >
                {list?.title}
              </button>
            </H3>
          </li>
        );
      })}
    </>
  );
};

export default Tabs;
