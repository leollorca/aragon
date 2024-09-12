"use client";

import { useState } from "react";
import Image from "next/image";
import classNames from 'classnames';

import ImageWithSkeleton from "../ImageWithSkeleton";
import Modal from "../Modal";

const Gallery = ({ photos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const toggleModal = (e) => {
    setSelectedPhoto(e.target.id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
    {
    isModalOpen
      ? <Modal
          selectedPhoto={selectedPhoto}
          photos={photos}
          toggleModal={toggleModal}
        />
      : <ul className={
          classNames(
            "grid grid-cols-3 gap-8 w-[1600px] mx-auto",
            "max-[1920px]:grid-cols-2 max-[1920px]:w-[calc(100%-320px)]",
            "max-[1376px]:grid-cols-1",
            "max-[832px]:w-[calc(100%-64px)]"
          )}
        >
          {photos.map((photo, index) => (
            <ImageWithSkeleton
              toggleModal={toggleModal}
              photo={photo}
              index={index}
            />
          ))}
        </ul>
    }
    </>
  );
};

export default Gallery;