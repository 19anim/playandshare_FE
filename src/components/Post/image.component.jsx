import { useRef } from "react";

const Image = ({ image, isOverLayout, overAmount, onclickHandler }) => {
  return (
    <div className="absolute inset-0 w-full h-full">
      <img
        className={`w-full h-full object-cover cursor-pointer ${
          isOverLayout ? "brightness-50" : ""
        }`}
        onClick={onclickHandler}
        src={image}
        alt="image_preview"
      />
      {isOverLayout && (
        <span
          onClick={onclickHandler}
          className="absolute inset-0 flex justify-center items-center text-white text-3xl cursor-pointer"
        >
          +{overAmount}
        </span>
      )}
    </div>
  );
};

export default Image;
