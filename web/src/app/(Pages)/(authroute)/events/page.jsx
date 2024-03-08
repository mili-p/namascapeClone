import React from "react";
import EventList from './EventList'
import InnerDataTitleCM from "@/app/components/InnerDataTitleCM/InnerDataTitleCM";


// export const metadata = {
//   title: 'NamaScape - Events',
//   description: 'NamaScape - Events',
//   openGraph: {
//     images: '../../../../../public/assets/images/ogimages/og-events-image.jpg',
//   }
// }

export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Namascape - Events',
  description: 'Namascape - Events',
  openGraph: {
    title: 'Namascape - Events',
    description: 'Namascape - Events',
    image: 'url/image.png'
  },
  twitter: {
    card: 'Namascape - Events',
    site: 'Namascape',
    title: 'Namascape - Events',
    description: 'Namascape - Events',
    image: '../../../../../public/assets/images/ogimages/og-events-image.jpg'
  }
}

const page = () => {
  return (
    <>
      {/* <InnerBanner BreadcrumbData={BreadcrumbData} heading={"Events"} className="mb-120" /> */}
      <InnerDataTitleCM heading={"EventHeading"} bredcrumbTitle = {"eventsTitle"}/>
      <EventList />
    </>
  );
};

export default page;
