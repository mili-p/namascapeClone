"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import "../SiteModal.scss";
import H2 from "../../common/h2";
import CookieConsent, {
  Cookies,
  resetCookieConsentValue,
  getCookieConsentValue,
} from "react-cookie-consent";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const CookiesModal = ({ getCookieValueAcceptDecline }) => {
  const {i18n} = useTranslation()
  const [CookiesModal, setCookiesModal] = useState(true);
  const ddddddddddddd = getCookie("CookieConsent");
  const consentStatus = getCookieConsentValue();
  const router = useRouter();
  const [first, setfirst] = useState("Helloo");
  // useEffect(() => {
  //     // Check the cookie consent status when the component mounts
  //     const consentStatus = getCookieConsentValue();
  // console.log(consentStatus,"consentStatus" , Cookies.CONSENT_ACCEPTED);
  //     // If the user has previously declined cookies, show the modal
  //     if (consentStatus !== Cookies.CONSENT_ACCEPTED) {
  //       setCookiesModal(true);
  //     }
  //   }, []);

  // useEffect(()=> {
  //     if(ddddddddddddd === "true"){
  //         setfirst("h")
  //     }
  //     if(ddddddddddddd === "false"){
  //         setfirst("jjjj")
  //     }
  // },[ddddddddddddd])

  // const handleAccept = (acceptedByScrolling) => {
  //     if (acceptedByScrolling) {
  //       // Handle accept logic for scrolling
  //     } else {
  //       // Set a persistent cookie when the user accepts
  //       Cookies.set('cookieConsent', 'accepted', { expires: 365 }); // expires in 365 days
  //       setShowCookiesModal(false);
  //     }
  //   };

  //   const handleAccept = (acceptedByScrolling) => {
  //     // if (acceptedByScrolling) {
  //       // Handle scrolling acceptance if needed
  //     // } else {
  //         // console.log("Accepted Cookies",getCookieConsentValue(),Cookies.set());
  //       // Set the cookie consent status to accepted
  //     //   Cookies.set(Cookies.CONSENT, Cookies.CONSENT_ACCEPTED);
  //     //   Cookies.set(Cookies.CONSENT, Cookies.CONSENT_ACCEPTED,{ expires: 365 })
  //       // Hide the modal
  //       setCookiesModal(false);
  //     //   window.location.reload()
  //     // }
  //   };

  //   const handleDecline = () => {
  //         // console.log(Cookies.set(),"78787878787887");
  //         // const consentValue = getCookieConsentValue();
  //         // console.log("Cookies.CONSENT:", consentValue);
  //     // Set the cookie consent status to declined
  //         // Cookies.set(Cookies.CONSENT, Cookies.CONSENT_DECLINED);

  //     // Hide the modal
  //     setCookiesModal(false);
  //   };
  useLayoutEffect(() => {
    setfirst(ddddddddddddd);
  }, []);

  return (
    <>
      {/* <div className={`site-modal cookies-modal ${CookiesModal===true  ? "show" : ""}`}>
            <div className='flex items-center justify-between flex-col md:flex-row modal-boday'>

            </div>
        </div> */}
      <div className={first === undefined ? "cookie-box-wrapper" : ""}>
        <CookieConsent
          onAccept={() => {
            setfirst("true");
            // router.push("/")
          }}
          buttonText={i18n.t(`cookie.acceptBtn`)}
          declineButtonText={i18n.t(`cookie.declineBtn`)}
          enableDeclineButton
          onDecline={() => {
            setfirst("false");
            // router.push("/")
          }}
          
        >
          <div className="modal-content">
            <H2>{i18n.t(`cookie.title`)}</H2>
            <p>
            {i18n.t(`cookie.description`)}
            </p>
          </div>
        </CookieConsent>
      </div>
    </>
  );
};

export default CookiesModal;

{
  /* <div className="modal-content">
                    <H2>We use cookies !!</H2>
                    <p>This website use cookies to help you have a superior and more admissible browsing experience on the website.</p>
                </div>
                <div className='flex tems-center justify-center flex-wrap md:flex-nowrap modal-btn-group'>
                    <button type='button' className='border-btn modal-btn' onClick={()=>{setCookiesModal(false)}}>Decline</button>
                    <button type='button' className='solid-btn modal-btn'  onClick={()=>{setCookiesModal(false)}}>Accept</button>
                </div> */
}

{
  /* <CookieConsent
                location="bottom"
                cookieName="myAwesomeCookieName2"
                expires={150}
                onAccept={handleAcceptCookies}
                >
               <div className="modal-content">
                    <H2>We use cookies !!</H2>
                    <p>This website use cookies to help you have a superior and more admissible browsing experience on the website.</p>
                </div>
                <div className='flex tems-center justify-center flex-wrap md:flex-nowrap modal-btn-group'>
                    <button type='button' className='border-btn modal-btn' onClick={()=>{setCookiesModal(false)}}>Decline</button>
                    <button type='button' className='solid-btn modal-btn'  onClick={()=>{handleAcceptCookies()}}>Accept</button>
                </div>
            </CookieConsent>             */
}

{
  /* <CookieConsent
                    // cookieValue={getCookieConsentValue()}
                    onAccept={(acceptedByScrolling) => {
                    if (acceptedByScrolling) {
                        // triggered if user scrolls past threshold
                        // Cookies.set(testCookieName, 500);
                    } else {
                        // Cookies()
                        getCookieConsentValue()
                        setCookiesModal(false)
                        // alert("Accept was triggered by clicking the Accept button");
                        // resetCookieConsentValue()
                    }
                    }}
                    enableDeclineButton
                    onDecline={() => {
                    // alert("nay!");
                    setCookiesModal(false)

                    }}
                    >
                    <div className="modal-content">
                    <H2>We use cookies !!</H2>
                    <p>This website use cookies to help you have a superior and more admissible browsing experience on the website.</p>
                </div>
                {/* <div className='flex tems-center justify-center flex-wrap md:flex-nowrap modal-btn-group'>
                    <button type='button' className='border-btn modal-btn' onClick={()=>{setCookiesModal(false)}}>Decline</button>
                    <button type='button' className='solid-btn modal-btn'  onClick={()=>{handleAcceptCookies()}}>Accept</button>
                </div> */
}
{
  /* </CookieConsent>  */
}
