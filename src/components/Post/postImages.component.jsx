import Image from "./image.component";
import ImageLayout from "./imageLayout.component";
import { useRef, useState } from "react";
import ImageModal from "../Modal/imageModal.component";
import { useNavigate } from "react-router-dom";

const PostImages = ({ images, postId }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {images.length <= 2 ? (
        <div className="grid gap-0.5 h-[300px] md:h-[500px]">
          <ImageLayout col={images.length}>
            {images.map((image, index) => (
              <div key={`${image._id}_${index}`} className="relative h-full">
                <Image
                  image={image.url}
                  onclickHandler={() =>
                    navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                      state: { scrollToPostId: postId },
                    })
                  }
                />
              </div>
            ))}
          </ImageLayout>
        </div>
      ) : (
        <div className="grid gap-0.5">
          <div className="h-[200px] md:h-[300px]">
            <ImageLayout col={2}>
              {images.slice(0, 2).map((image, index) => (
                <div key={`${image._id}_${index}`} className="relative h-full">
                  <Image
                    image={image.url}
                    onclickHandler={() =>
                      navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                        state: { scrollToPostId: postId },
                      })
                    }
                  />
                </div>
              ))}
            </ImageLayout>
          </div>
          <div className="h-[100px] md:h-[200px]">
            <ImageLayout col={images.length > 5 ? 3 : images.length - 2}>
              {images.slice(2, 5).map((image, index) => (
                <div key={`${image._id}_${index}`} className="relative h-full">
                  <Image
                    image={image.url}
                    isOverLayout={index === 2 && images.length > 5}
                    overAmount={images.length - 5}
                    onclickHandler={() =>
                      navigate(`/photo?postId=${postId}&imageId=${image._id}`, {
                        state: { scrollToPostId: postId },
                      })
                    }
                  />
                </div>
              ))}
            </ImageLayout>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostImages;
