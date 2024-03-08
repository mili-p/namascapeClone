"use client";
import React, { useEffect, useState } from "react";
import "./LightboxSlider.scss";

const LightboxSlider = ({ image, Modal, setModal, eventData }) => {
  // Light Box Slider
  const [indexNumber, setIndexNumber] = useState(Modal - 1);

  const handlePrevClick = () => {
    setIndexNumber((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : eventData?.length - 1;
    });
  };
  // console.log(indexNumber, "indexNumber");
  const handleNextClick = () => {
    setIndexNumber((prevIndex) => {
      return eventData?.length - 1 === prevIndex ? 0 : prevIndex + 1;
    });
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setIndexNumber((prevIndex) => (prevIndex + 1 < SliderImages?.length ? prevIndex + 1 : 0));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  // END Light Box Slider
  // console.log(eventData, "eventData?.type");

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case 'Escape':
          // Your logic for handling the "Escape" key press goes here
          setModal(false)
          break;
        case 'ArrowRight':
          // Your logic for handling the right arrow key press goes here
          setIndexNumber((prevIndex) => {
            return eventData?.length - 1 === prevIndex ? 0 : prevIndex + 1;
          });
          break;
        case 'ArrowLeft':
          // Your logic for handling the left arrow key press goes here
          setIndexNumber((prevIndex) => {
            return prevIndex > 0 ? prevIndex - 1 : eventData?.length - 1;
          });
          break;
        default:
          // Handle other key presses if needed
          break;
      }
    };

    // Adding event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress);

    // Cleaning up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <>
      <div
        className={`flex items-center lightbox-slider-wrapper ${
          Modal ? "show" : ""
        }`}
      >
        <div className="hidden-box" onClick={() => setModal(0)}></div>
        {eventData?.[indexNumber]?.type === "image" ? (
          <img src={typeof eventData?.[indexNumber]?.imageUrl === "object" ? URL.createObjectURL(eventData?.[indexNumber]?.imageUrl)  :  eventData?.[indexNumber]?.imageUrl} alt="slider-image" />
        ) : (
          <video controls>
            <source src={typeof eventData?.[indexNumber]?.imageUrl === "object" ? URL.createObjectURL(eventData?.[indexNumber]?.videoUrl)  :  eventData?.[indexNumber]?.videoUrl}></source>
          </video>
        )}

        <button
          type="button"
          className="flex items-center justify-center close-btn"
          onClick={() => setModal(0)}
        >
          <i class="icon-reject"></i>
        </button>
        <button
          type="button"
          onClick={handlePrevClick}
          className="flex items-center justify-center slider-btn pre"
        >
          <i class="icon-back"></i>
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center justify-center slider-btn next"
        >
          <i class="icon-back"></i>
        </button>
      </div>
    </>
  );
};

export default LightboxSlider;
