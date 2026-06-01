import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import PostComment from "../components/Post/postComment.component";
import { useSelector } from "react-redux";
import PostActionButtons from "../components/Post/postActionButtons.component";
import PostStatus from "../components/Post/postStatus.component";
import { useDispatch } from "react-redux";
import { getComments, getLikes } from "../store/post";
import useFetchPostDetail from "../hooks/fetchPostDetail.hook";
import token from "../helper/token";

const ImageDetail = () => {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("postId");
  const imageId = searchParams.get("imageId");
  const [refreshKey, setRefreshKey] = useState(0);
  const [loading, post] = useFetchPostDetail({ postId, refreshKey });
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState();
  const [images, setImages] = useState();
  const [commentContent, setCommentContent] = useState("");
  const [currentLikeAmount, setCurrentLikeAmount] = useState(post?.likes.length);
  const { avatar, userId } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(post?.likes.indexOf(userId) !== -1);
  const dispatch = useDispatch();
  const commentInputRef = useRef(null);
  const accessToken = token.getAccessToken();

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

  const commentToPost = async () => {
    if (!commentContent.trim()) return;

    await dispatch(
      getComments({
        postId,
        content: commentContent,
      })
    );
    setCommentContent("");
    setRefreshKey((currentKey) => currentKey + 1);
  };

  useEffect(() => {
    setCurrentLikeAmount(post?.likes.length);
    setLiked(post?.likes.indexOf(userId) !== -1);
  }, [post, userId]);

  useEffect(() => {
    post?.images.forEach((image, index) => {
      if (image._id === imageId) setCurrentIndex(index);
    });
    setImages(post?.images);
  }, [imageId, post]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") navigate("/");
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [navigate]);

  return (
    <>
      {loading ? (
        <div className="grid h-screen place-items-center bg-black">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : currentIndex !== undefined ? (
        <div className="w-screen h-screen">
          <div className="grid grid-rows-2 lg:grid-cols-4 lg:grid-rows-1 h-full">
            <div className="lg:col-span-3 bg-black relative">
              <button
                className="btn btn-circle absolute left-5 top-1/2 z-10 -translate-y-1/2 border-0 bg-white/30 text-black hover:bg-white"
                onClick={() =>
                  navigate(`/photo?postId=${postId}&imageId=${
                      currentIndex === 0
                        ? images[images.length - 1]._id
                        : images[currentIndex - 1]._id
                    }`)
                }
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <div className="flex justify-center items-center h-full bg-black">
                <img
                  src={images[currentIndex]?.url}
                  alt="Post"
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>
              <button
                className="btn btn-circle absolute right-5 top-1/2 z-10 -translate-y-1/2 border-0 bg-white/30 text-black hover:bg-white"
                onClick={() =>
                  navigate(`/photo?postId=${postId}&imageId=${
                      currentIndex === images.length - 1
                        ? images[0]._id
                        : images[currentIndex + 1]._id
                    }`)
                }
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <button
                className="btn btn-circle btn-ghost absolute left-3 top-3 z-10 text-xl text-white hover:bg-white/20"
                onClick={() => navigate("/")}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <section className="flex flex-col gap-3 overflow-y-auto bg-base-100 text-base-content">
              <section className="px-3 py-3 grid grid-cols-[auto_1fr_auto] gap-x-3">
                <div className="avatar">
                  <div className="size-12 rounded-full"><img src={post?.author.avatar} alt={post?.author.username} loading="lazy" /></div>
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
              <PostActionButtons
                likeHandler={onLikeHandler}
                commentHandler={() => commentInputRef.current?.focus()}
                isLiked={liked}
              />
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
              {accessToken && (
                <fieldset className="fieldset sticky bottom-0 grid w-full grid-cols-[auto_1fr] border-t border-base-300 bg-base-100 p-4 pb-5">
                  <div className="avatar">
                    <div className="size-12 rounded-full">
                      <img src={avatar} alt="Your avatar" loading="lazy" />
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      ref={commentInputRef}
                      value={commentContent}
                      onChange={(event) => setCommentContent(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          commentToPost();
                        }
                      }}
                      className="textarea w-full resize-none rounded-2xl bg-base-200 outline-none focus:outline-none"
                      placeholder="Bình luận về bài viết"
                    ></textarea>
                    <button
                      type="button"
                      onClick={commentToPost}
                      disabled={!commentContent.trim()}
                      aria-label="Send comment"
                      className="btn btn-circle btn-ghost btn-sm absolute bottom-2 right-2 text-primary"
                    >
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </fieldset>
              )}
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ImageDetail;
