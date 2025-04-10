import Image from "./image.component";
import ImageLayout from "./imageLayout.component";
import { useRef, useState } from "react";
import ImageModal from "../Modal/imageModal.component";

const PostImages = ({ images }) => {
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const modalRef = useRef(null);
  const handleImageClick = (index) => {
    setModalStartIndex(index);
    modalRef.current.showModal();
  };

  return (
    <>
      {images.length <= 2 ? (
        <div className="grow self-center w-full flex flex-col gap-y-0.5">
          <ImageLayout col={images.length}>
            {images.map((image, index) => (
              <Image
                key={`${image}_${index}`}
                image={image.url}
                onclickHandler={() => {
                  handleImageClick(index);
                }}
              />
            ))}
          </ImageLayout>
        </div>
      ) : (
        <div className="grow md:min-h-[500px] min-h-[300px] self-center w-full flex flex-col gap-y-0.5">
          <ImageLayout col={2}>
            {images.map((image, index) => {
              if (index < 2) {
                return (
                  <Image
                    key={`${image}_${index}`}
                    image={image.url}
                    onclickHandler={() => {
                      handleImageClick(index);
                    }}
                  />
                );
              }
            })}
          </ImageLayout>
          <ImageLayout col={images.length > 5 ? 3 : images.length - 2}>
            {images.map((image, index) => {
              if (index === 4 && images.length > 5) {
                return (
                  <Image
                    key={`${image}_${index}`}
                    image={image.url}
                    isOverLayout={true}
                    overAmount={images.length - 5}
                    onclickHandler={() => {
                      handleImageClick(index);
                    }}
                  />
                );
              } else if (index >= 2 && index <= 4) {
                return (
                  <Image
                    key={`${image}_${index}`}
                    image={image.url}
                    onclickHandler={() => {
                      handleImageClick(index);
                    }}
                  />
                );
              }
            })}
          </ImageLayout>
        </div>
      )}
      <ImageModal modalRef={modalRef} images={images} modalStartIndex={modalStartIndex} />
    </>
  );
};

export default PostImages;
