import React, { useEffect, useState } from "react";
import Progress from "./Progress.jsx";
import Slide from "./Slide.jsx";
import { useSelector } from "react-redux";
import reloadImg from "../../../assets/reloadsmall.png";
import arrow from "../../../assets/arrow.png";

const StorySlider = ({ slides }) => {
  const [reload, setReload] = useState(false);
  const { isMobileScreen } = useSelector((state) => state.layout);

  const images = slides && slides.map((slide) => slide.imageUrl);

  const progress =
    images &&
    images.map((_, index) => {
      return { id: index, progress: 0, image: images[index], completed: false };
    });

  const [progressBars, setProgressBars] = useState(progress);
  const [imgIndex, setImgIndex] = useState(0);

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      updateProgress(imgIndex);
    }, 50);

    return () => clearInterval(interval);
  }, [imgIndex, images]);

  const updateProgress = (barIndex) => {
    setProgressBars((prevProgressBars) => {
      if (!Array.isArray(prevProgressBars)) {
        return [];
      }
      const newProgressBars = [...prevProgressBars];
      if (!newProgressBars[barIndex]) {
        return [];
      }
      newProgressBars[barIndex].progress += 0.5;

      if (newProgressBars[barIndex].progress >= 100) {
        newProgressBars[barIndex].progress = 0;
        newProgressBars[barIndex].completed = true;

        if (barIndex !== images.length - 1) {
          setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
          newProgressBars[barIndex + 1].completed = false;
        } else {
          clearInterval(interval);
        }
      }
      return newProgressBars;
    });
  };

  const handleBtns = (value) => {
    setProgressBars(progress);
    progressBars[imgIndex].progress = 0;

    if (value === "next") {
      if (reload) {
        setImgIndex(0);
      }
      if (imgIndex === images.length - 1) {
        setReload(!reload);
      } else {
        setImgIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    } else {
      if (imgIndex === 0) {
        setImgIndex(0);
      } else {
        setImgIndex((prevIndex) => (prevIndex - 1) % images.length);
      }
    }

    updateProgress(imgIndex);
  };

  return (
    <div className=" h-[90vh] flex flex-col relative">
      <div
        className={`absolute top-[48%] ${
          isMobileScreen ? "w-[100vw]" : "left-[-25%] w-[50vw]"
        } flex justify-between items-center`}
      >
        <button className="prev-btn p-8 m-4" onClick={() => handleBtns("prev")}>
          <img
            src={arrow}
            alt="<"
            className={isMobileScreen ? "w-4 rotate-180" : "w-6 rotate-180"}
          />
        </button>
        <button className="next-btn p-8 m-4" onClick={() => handleBtns("next")}>
          {reload ? (
            <img src={reloadImg} alt="reload" />
          ) : (
            <img
              src={arrow}
              alt=">"
              className={isMobileScreen ? "w-4" : "w-6"}
            />
          )}
        </button>
      </div>

      <Progress images={images} progressBars={progressBars} />

      <Slide slides={slides} imgIndex={imgIndex} />
    </div>
  );
};

export default StorySlider;
