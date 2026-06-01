import PostImages from "../Post/postImages.component";
import PostComment from "../Post/postComment.component";
import PostActionButtons from "../Post/postActionButtons.component";
import PostStatus from "../Post/postStatus.component";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../store/post";
import { formatDate } from "../../helper/formatDate";
import token from "../../helper/token";

const PostModal = ({ modalRef, post, likeHandler, currentLikeAmount, liked }) => {
  const { _id, author, title, content, images, comments, shares, createdAt } = post;
  const { avatar } = useSelector((state) => state.user);
  const accessToken = token.getAccessToken();
  const formattedDate = formatDate(createdAt);

  const [commentContent, setCommentContent] = useState("");
  const dispatch = useDispatch();

  const commentHandler = (e) => {
    const value = e.target.value;
    setCommentContent(value);
  };

  const commentToPost = async () => {
    if (commentContent.length > 0) {
      try {
        dispatch(
          getComments({
            postId: _id,
            content: commentContent,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setCommentContent("");
      }
    }
  };

  return (
    <dialog
      ref={modalRef}
      className="modal"
      onCancel={(event) => {
        event.preventDefault();
        modalRef.current?.close();
      }}
    >
      <div className="modal-box max-w-screen md:w-[700px] w-[95%] p-0">
        <div className="flex max-h-[90vh] flex-col overflow-y-auto bg-base-100 text-base-content">
          <section className="sticky top-0 z-50 bg-base-100">
            <header className="py-3 text-center text-xl font-bold">
              {author.displayName}'s post
            </header>
            <div className="divider m-0 h-0"></div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            </form>
          </section>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
            <section className="px-3 grid grid-cols-[auto_1fr_auto] gap-x-3 pt-3">
              <div className="avatar">
                <div className="size-12 rounded-full">
                    <img src={author.avatar} alt={author.displayName} loading="lazy" />
                </div>
              </div>

              <div>
                <header className="font-bold text-lg">{author.displayName}</header>
                <div className="flex gap-2 items-center">
                  <p>{formattedDate}</p>
                  <i className="fa-regular fa-paper-plane"></i>
                </div>
              </div>

              <i className="fa-solid fa-ellipsis text-xl self-center cursor-pointer"></i>
            </section>

            <section className="px-3 flex-shrink-0">
              <header className="text-2xl font-medium">{title}</header>
              <main className="whitespace-pre-wrap break-words text-sm md:text-base">
                {content}
              </main>
            </section>

            <section className="flex-shrink-0">
              {images.length > 0 && <PostImages images={images} postId={_id} />}
            </section>

            <div className="relative z-10 bg-base-100">
              <PostStatus
                currentLikeAmount={currentLikeAmount}
                commentAmount={comments.length}
                shareAmount={shares}
              />
              {accessToken && <PostActionButtons likeHandler={likeHandler} isLiked={liked} />}
            </div>

            <section className="flex flex-col gap-2 px-3">
              {comments?.map((comment) => (
                <PostComment
                  key={comment._id}
                  user={comment.user}
                  comment={comment.content}
                  createdAt={comment.createdAt}
                />
              ))}
            </section>
          </div>

          {accessToken && (
            <fieldset className="fieldset sticky bottom-0 z-20 grid w-full grid-cols-[auto_1fr] border-t border-base-300 bg-base-100 p-4 pb-5">
              <div className="avatar">
                <div className="size-12 rounded-full">
                  <img src={avatar} alt="Your avatar" loading="lazy" />
                </div>
              </div>
              <div className="relative">
                <textarea
                  value={commentContent}
                  onChange={commentHandler}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      commentToPost();
                    }
                  }}
                  className="textarea w-full resize-none rounded-2xl bg-base-200 outline-none focus:outline-none"
                  placeholder="Bình luận về bài viết nhennnn"
                ></textarea>
                <i
                  onClick={commentToPost}
                  className={`fa-solid fa-paper-plane absolute bottom-2 right-2 text-base p-2 ${
                    commentContent.length === 0
                      ? "cursor-not-allowed text-gray-500"
                      : "cursor-pointer text-primary hover:bg-base-200 hover:rounded-full"
                  }`}
                ></i>
              </div>
            </fieldset>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default PostModal;
