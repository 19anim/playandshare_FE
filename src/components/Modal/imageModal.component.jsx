import { useEffect, useState } from "react";

const ImageModal = ({ modalRef, images, modalStartIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    setCurrentIndex(modalStartIndex);
  }, [modalStartIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <dialog ref={modalRef} className="modal text-black z-50">
      <div className="modal-box max-w-screen w-[95%] h-[95%] p-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-3 grid-rows-2 h-full">
          <div className="col-span-2 lg:row-span-1 md:row-span-2 bg-black flex justify-center items-center gap-5">
            <a onClick={handlePrev} className="btn btn-circle">
              ❮
            </a>
            <div
              style={{ backgroundImage: `url("${images[currentIndex]?.url}")` }}
              className="bg-white w-[70%] h-full bg-cover bg-center"
            ></div>
            <a onClick={handleNext} className="btn btn-circle">
              ❯
            </a>
          </div>
          <div className="px-3 py-10 overflow-scroll">Post detail</div>
        </div>
      </div>
    </dialog>
  );
};

export default ImageModal;
