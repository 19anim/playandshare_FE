import { useNavigate, useSearchParams, useLocation, Link } from "react-router-dom";
import axios from "../helper/api";
import { useEffect, useState } from "react";
import PostComment from "../components/Post/postComment.component";
import { useSelector } from "react-redux";
import PostActionButtons from "../components/Post/postActionButtons.component";
import PostStatus from "../components/Post/postStatus.component";
import { useDispatch } from "react-redux";
import { getLikes } from "../store/post";
import fetchPostDetail from "../hooks/fetchPostDetail.hook";

const ImageDetail = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const imageId = searchParams.get("imageId");
  const [loading, post] = fetchPostDetail({ postId });
  const location = useLocation();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState();
  const [images, setImages] = useState();
  const [scrollToPostId, setScrollToPostId] = useState();
  const [currentLikeAmount, setCurrentLikeAmount] = useState(post?.likes.length);
  const { userId } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(post?.likes.indexOf(userId) !== -1);
  const dispatch = useDispatch();

  const onLikeHandler = async () => {
    try {
      dispatch(
        getLikes({
          postId: postId,
        })
      );
    } catch (error) {
      console.log(error.message);
    } finally {
      setLiked(!liked);
    }
  };

  useEffect(() => {
    setCurrentLikeAmount(post?.likes.length);
    setLiked(post?.likes.indexOf(userId) !== -1);
  }, [post]);

  useEffect(() => {
    post?.images.forEach((image, index) => {
      if (image._id === imageId) setCurrentIndex(index);
    });
    setImages(post?.images);

    setScrollToPostId(location.state?.scrollToPostId);
  }, [postId, imageId, post]);

  return (
    <>
      {currentIndex !== undefined ? (
        <div className="w-screen h-screen">
          <div className="grid grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 h-full">
            <div className="lg:col-span-3 bg-black relative">
              <button
                className="absolute left-5 top-1/2 translate-y-[-50%] text-base size-12 flex items-center justify-center hover:bg-[#fff] bg-[#ffffff4f] px-3 py-1 rounded-full cursor-pointer hover:translate-x-[-0.5rem] transition-transform duration-500"
                onClick={() =>
                  navigate(
                    `/photo?postId=${postId}&imageId=${
                      currentIndex === 0
                        ? images[images.length - 1]._id
                        : images[currentIndex - 1]._id
                    }`,
                    { state: { scrollToPostId } }
                  )
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="flex justify-center items-center h-full bg-black">
                <img
                  src={images[currentIndex]?.url}
                  alt="Post"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <button
                className="absolute right-5 top-1/2 translate-y-[-50%] text-base size-12 flex items-center justify-center hover:bg-[#fff] bg-[#ffffff4f] px-3 py-1 rounded-full cursor-pointer hover:translate-x-[0.5rem] transition-transform duration-500"
                onClick={() =>
                  navigate(
                    `/photo?postId=${postId}&imageId=${
                      currentIndex === images.length - 1
                        ? images[0]._id
                        : images[currentIndex + 1]._id
                    }`,
                    { state: { scrollToPostId } }
                  )
                }
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <button
                className="absolute top-3 left-5 text-white text-2xl cursor-pointer"
                onClick={() => navigate("/", { state: { scrollToPostId } })}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <section className="flex flex-col gap-2 overflow-scroll bg-[#252728] text-white">
              <section className="px-3 py-3 grid grid-cols-[auto_1fr_auto] gap-x-3">
                <div className="avatar">
                  <div className="size-12 rounded-full">{<img src={post?.author.avatar} />}</div>
                </div>

                <div>
                  <header className="font-bold text-lg">{post?.author.username}</header>
                  <div className="flex gap-2 items-center textarea-sm">
                    <p>{post?.createdAt}</p>
                    <i className="fa-regular fa-paper-plane"></i>
                  </div>
                </div>

                <i className="fa-solid fa-ellipsis text-xl self-center cursor-pointer"></i>
              </section>
              <PostStatus
                currentLikeAmount={currentLikeAmount}
                commentAmount={post?.comments.length}
                shareAmount={post?.shares}
              />
              <PostActionButtons likeHandler={onLikeHandler} isLiked={liked} />
              {post?.comments?.map((comment) => {
                return (
                  <PostComment
                    key={comment._id}
                    user={comment.user}
                    comment={comment.content}
                    createdAt={comment.createdAt}
                  />
                );
              })}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageDetail;
