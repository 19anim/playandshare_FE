import { useRef } from "react";

const Image = ({ image, isOverLayout, overAmount, onclickHandler }) => {
  // const modalRef = useRef(null);
  // const handleImageClick = () => {
  //   modalRef.current.showModal();
  // };

  return (
    <>
      {isOverLayout ? (
        <div className="relative w-full">
          <img
            className="w-full h-full object-cover brightness-50"
            src={image}
            alt="image_preview"
          />
          <span
            onClick={onclickHandler}
            className="absolute inset-0 flex justify-center items-center text-white text-3xl cursor-pointer"
          >
            +{overAmount}
          </span>
        </div>
      ) : (
        <img
          className="w-full h-full object-cover"
          onClick={onclickHandler}
          src={image}
          alt="image_preview"
        />
      )}
    </>
  );
};

export default Image;
