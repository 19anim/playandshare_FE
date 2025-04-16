import { useNavigate, useSearchParams, useLocation, Link } from "react-router-dom";
import api from "../helper/api";
import { useEffect, useState } from "react";

const ImageModal = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const postId = searchParams.get("postId");
  const imageId = searchParams.get("imageId");
  const [currentIndex, setCurrentIndex] = useState();
  const [images, setImages] = useState();
  const [scrollToPostId, setScrollToPostId] = useState();

  useEffect(() => {
    const fetchImage = async () => {
      const response = await api.request(`/post/${postId}/images/${imageId}`);
      console.log(response.data);
      if (response) {
        const tempImage = response.data.post.images;
        setImages(tempImage);
        tempImage.forEach((image, index) => {
          if (image._id === imageId) {
            setCurrentIndex(index);
          }
        });
      }
    };
    fetchImage();
    setScrollToPostId(location.state?.scrollToPostId);
  }, [postId, imageId]);
  return (
    <>
      {currentIndex !== undefined ? (
        <div className="w-full h-full">
          <div className="grid lg:grid-cols-3 lg:grid-rows-1 md:grid-rows-3 grid-rows-2 h-full">
            <div className="col-span-2 lg:row-span-1 md:row-span-2 bg-black flex justify-center items-center gap-5">
              <button
                onClick={() =>
                  navigate(
                    `/posts/photo?postId=${postId}&imageId=${
                      currentIndex === 0
                        ? images[images.length - 1]._id
                        : images[currentIndex - 1]._id
                    }`,
                    { state: { scrollToPostId } }
                  )
                }
              >
                ❮
              </button>
              <div
                style={{ backgroundImage: `url("${images[currentIndex]?.url}")` }}
                className="bg-white w-[70%] h-full bg-cover bg-center"
              ></div>
              <button
                onClick={() =>
                  navigate(
                    `/posts/photo?postId=${postId}&imageId=${
                      currentIndex === images.length - 1
                        ? images[0]._id
                        : images[currentIndex + 1]._id
                    }`,
                    { state: { scrollToPostId } }
                  )
                }
              >
                ❯
              </button>

              <button onClick={() => navigate("/posts", { state: { scrollToPostId } })}>
                Back
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageModal;
