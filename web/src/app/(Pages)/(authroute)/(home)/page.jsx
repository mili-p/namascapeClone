import React from "react";
import Banner from "./banner/banner";
import AboutUs from "./aboutUs/aboutUs";
import MainFeatures from "./mainFeatures/mainFeatures";
import Testimonial from "./Testimonial/Testimonial";
import EventOrganizer from "@/app/components/EventOrganizer/EventOrganizer";
import GetInTough from "./GetInTough/GetInTough";
import getContactUsList from "@/utils/ssrapi/user/getcontactuslist";
import dynamicTitle from "../../../../../src/utils/commonfn/dynamicMetaFunction";
// export const metadata = {
//   title: 'NamaScape | The Platform for Body, Mind & Soul',
//   description: 'NamaScape',
//   openGraph:{
//     images : `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/og-home-image.jpg`
//   }
// }

export async function generateMetadata({ params }) {
  return {
    title: dynamicTitle({
      de: `Namascape - Die Plattform für Körper, Geist & Seele`,
      en: `Namascape - The Platform for Body, Mind & Soul`,
    }),
    description: dynamicTitle({
      de: `Tauche ein in die spirituelle Welt mit Namascape. Finde vielfältige Events, Klassen, Treats, Retreats, Coachings und Trainings in deiner Stadt, die alle sorgfältig für Dich ausgewählt wurden. Wir heissen alle, die auf der Suche nach Selbstfindung und Achtsamkeit sind, herzlich willkommen.`,
      en: `Immerse yourself in the spiritual world with our App — discover diverse Events, Classes, Treats, Retreats, Coachings and Trainings in your city. All carefully chosen and curated to foster holistic well-being. It welcomes all seekers on the path of self-discovery and mindfulness, serving as your nurturing companion and guide.`,
    }),
    openGraph: {
      images: `${process.env.NEXT_PUBLIC_OG_PURPOSE}/assets/images/ogimages/og-home-image1.png`,
    },
  };
}

const Home = async () => {
  const getData = await getContactUsList();
  return (
    <>
      <Banner />
      <AboutUs />
      <MainFeatures />
      <Testimonial className={"pt-120"} />
      <EventOrganizer className={"pt-120 pb-120"} />
      <GetInTough getData={getData} />
    </>
  );
};

export default Home;
