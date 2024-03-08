
import React, { useState } from "react";
import './LightboxSlider.scss'

const LightboxSlider = ({ image, Modal, setModal, eventData}) => {
  // Light Box Slider
  const [indexNumber, setIndexNumber] = useState(Modal-1);
  
  const handlePrevClick = () => {
    setIndexNumber((prevIndex) =>{
        return prevIndex >0 ? prevIndex-1:eventData?.length-1
    }
    );
  };

  const handleNextClick = () => {
    setIndexNumber((prevIndex) =>{
        return eventData?.length-1 === prevIndex ? 0 :prevIndex+1
    }
    );
  };

  return (
    <>
      <div
        className={`flex items-center lightbox-slider-wrapper ${Modal ? "show" : ""}`}
      >
        <div className="hidden-box" onClick={() => setModal(0)}></div>
        {/* <img src={eventData?.[indexNumber]} alt="slider-image" /> */}
        {eventData?.[indexNumber]?.type === "image" ? (
          <img src={eventData?.[indexNumber]?.imageUrl} alt="slider-image" />
        ) : (
          <video controls>
            <source src={eventData?.[indexNumber]?.videoUrl}></source>
          </video>
        )}
        <button
          type="button"
          className="flex items-center justify-center close-btn"
          onClick={() => setModal(0)}
        >
          <i className="icon-reject"></i>
        </button>
        <button
          type="button"
          onClick={handlePrevClick}
          className="flex items-center justify-center slider-btn pre"
        >
          <i className="icon-back"></i>
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="flex items-center justify-center slider-btn next"
        >
          <i className="icon-back"></i>
        </button>
      </div>
    </>
  );
};

export default LightboxSlider;