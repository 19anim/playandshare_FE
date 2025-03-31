const Image = ({ image, isOverLayout, overAmount }) => {
  return isOverLayout ? (
    <div className="relative w-full">
      <div
        className=" bg-cover w-full h-full bg-center brightness-50"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>
      <span className="absolute inset-0 flex justify-center items-center text-white text-3xl">
        +{overAmount}
      </span>
    </div>
  ) : (
    <div className="bg-cover w-full bg-center" style={{ backgroundImage: `url("${image}")` }}></div>
  );
};

export default Image;
