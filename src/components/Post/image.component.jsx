import { useRef } from "react";

const Image = ({ image, isOverLayout, overAmount }) => {
  const modalRef = useRef(null);
  const handleImageClick = () => {
    modalRef.current.showModal();
  };

  return (
    <>
      {isOverLayout ? (
        <div className="relative w-full">
          <div
            className="bg-cover w-full h-full bg-center brightness-50"
            style={{ backgroundImage: `url("${image}")` }}
          ></div>
          <span
            onClick={handleImageClick}
            className="absolute inset-0 flex justify-center items-center text-white text-3xl cursor-pointer"
          >
            +{overAmount}
          </span>
        </div>
      ) : (
        <div
          onClick={handleImageClick}
          className="bg-cover w-full bg-center cursor-pointer"
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
      )}
      <dialog ref={modalRef} className="modal text-black">
        <div className="modal-box max-w-screen w-[95%] h-[95%] p-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-3 grid-rows-2 h-full">
            <div className="col-span-2 lg:row-span-1 md:row-span-2 bg-black flex justify-center items-center">
              <div
                style={{ backgroundImage: `url("${image}")` }}
                className="bg-white w-[70%] h-full bg-cover bg-center"
              ></div>
            </div>
            <div className="px-3 py-10 overflow-scroll">Post detail</div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Image;
