import Image from "./image.component";
import ImageLayout from "./imageLayout.component";
import { useRef, useState } from "react";
import ImageModal from "../Modal/imageModal.component";
import { useNavigate } from "react-router-dom";

const PostImages = ({ images, postId }) => {
  const navigate = useNavigate();
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const modalRef = useRef(null);

  return (
    <>
      {images.length <= 2 ? (
        <div className="grow min-h-[500px] self-center w-full flex flex-col gap-y-0.5">
          <ImageLayout col={images.length}>
            {images.map((image, index) => (
              <Image
                key={`${image}_${index}`}
                image={image.url}
                onclickHandler={() =>
                  navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                    state: { scrollToPostId: postId },
                  })
                }
              />
            ))}
          </ImageLayout>
        </div>
      ) : (
        <div className="grow min-h-[500px]  self-center w-full flex flex-col gap-y-0.5">
          <ImageLayout col={2}>
            {images.map((image, index) => {
              if (index < 2) {
                return (
                  <Image
                    key={`${image}_${index}`}
                    image={image.url}
                    onclickHandler={() =>
                      navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                        state: { scrollToPostId: postId },
                      })
                    }
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
                    onclickHandler={() =>
                      navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                        state: { scrollToPostId: postId },
                      })
                    }
                  />
                );
              } else if (index >= 2 && index <= 4) {
                return (
                  <Image
                    key={`${image}_${index}`}
                    image={image.url}
                    onclickHandler={() =>
                      navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                        state: { scrollToPostId: postId },
                      })
                    }
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
