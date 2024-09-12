import { useState } from "react";
import Image from "next/image";

const ImageWithSkeleton = ({ toggleModal, photo, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
    <li
      key={index}
      className="relative w-full aspect-square cursor-pointer"
      onClick={toggleModal}
    >
      <Image
        style={{objectFit:"cover"}}
        id={photo}
        src={photo}
        alt="photo"
        fill={true}
        priority={index > 9 ? false : true}
        onLoad={() => setIsLoaded(true)}
      />
    </li>
    {!isLoaded && (
      <div className="relative w-full aspect-square bg-white">
        <div className="w-full aspect-square bg-lightGray animate-pulse" />
      </div>
    )}
    </>
  );
};

export default ImageWithSkeleton;
