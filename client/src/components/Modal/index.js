import { useState } from "react";
import Image from "next/image";
import classNames from 'classnames';

import cross from "../../images/cross.svg";
import arrow from "../../images/arrow.svg";

const Modal = ({ selectedPhoto, photos, toggleModal }) => {
  const [currentPhoto, setCurrentPhoto] = useState(selectedPhoto);

  const goToPrevious = () => {
    const currentIndex = photos.indexOf(currentPhoto);
    const previousIndex =
      currentIndex === 0 ? photos.length - 1 : currentIndex - 1;

    setCurrentPhoto(photos[previousIndex]);
  };

  const goToNext = () => {
    const currentIndex = photos.indexOf(currentPhoto);
    const nextIndex =
      currentIndex === photos.length - 1 ? 0 : currentIndex + 1;

    setCurrentPhoto(photos[nextIndex]);
  };

  return (
    <div className={classNames(
        "absolute z-10 top-0 flex justify-center items-center",
        "w-screen h-screen bg-black"
      )}
    >
      <Image
        className="absolute z-20 top-16 right-16 cursor-pointer"
        src={cross}
        alt="cross"
        onClick={toggleModal}
      />
      <div className="flex items-center justify-between w-full px-16">
      {photos.length > 1 && (
          <Image
            className="cursor-pointer"
            src={arrow}
            alt="arrow"
            onClick={goToPrevious}
          />
        )}
        <div className="relative w-[calc(100vw-128px)] h-[calc(100vh-128px)] mx-16">
          <Image
            style={{objectFit:"contain"}}
            src={currentPhoto}
            alt="selected photo"
            fill={true}
            priority={true}
          />
        </div>
        {photos.length > 1 && (
          <Image
            className="rotate-180 cursor-pointer"
            src={arrow}
            alt="arrow"
            onClick={goToNext}
          />
        )}
      </div>
    </div>
  );
};

export default Modal;