'use client'
import React from "react";
import "./AboutEvent.scss";
import H2 from "@/app/components/common/h2";
import AboutEventOrganizer from "./AboutEventOrganizer";
import { useTranslation } from "react-i18next";

const AboutEvent = ({eventDetails}) => {
  // console.log('AboutEvent',eventDetails)
  const {i18n} = useTranslation()
  return (
    <section className="about-event-section pt-120 pb-120">
      <div className="container">
        <div className="flex items-start flex-col justify-between lg:flex-row gap-6 xl:gap-8">
          <div className="w-full lg:w-1/2 xl:w-3/5 about-contents">
            <div className="event-title-wrapper">
              <H2 className='title'>{i18n.t(`useEvent.aboutEvents`)}</H2>
            </div>
            <pre className="description">
              {eventDetails?.eventData?.description}
            </pre>
          </div>
            <AboutEventOrganizer eventDetails={eventDetails} />
        </div>
      </div>
    </section>
  );
};

export default AboutEvent;
