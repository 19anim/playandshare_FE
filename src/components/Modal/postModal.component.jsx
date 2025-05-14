import PostImages from "../Post/postImages.component";
import PostComment from "../Post/postComment.component";
import PostActionButtons from "../Post/postActionButtons.component";
import PostStatus from "../Post/postStatus.component";
import axios from "../../helper/api";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getComments } from "../../store/post";

const PostModal = ({ modalRef, post, likeHandler, currentLikeAmount, liked }) => {
  const { _id, author, title, content, images, comments, shares } = post;
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
    <dialog ref={modalRef} className="modal text-black">
      <div className="modal-box max-w-screen md:w-[700px] w-[95%] p-0">
        <div className="max-h-[90vh] overflow-y-auto bg-[#252728] text-[#e2e5e9] flex flex-col">
          <section className="sticky top-0 bg-[#252728] z-50">
            <header className="text-center text-3xl py-3 font-mono">
              {author.username}'s post
            </header>
            <div className="divider h-0 before:h-[1px] before:bg-[#393939] after:h-[1px] after:bg-[#393939] m-0"></div>
            <form method="dialog">
              <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
            </form>
          </section>

          <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
            <section className="px-3 grid grid-cols-[auto_1fr_auto] gap-x-3">
              <div className="avatar">
                <div className="size-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>

              <div>
                <header className="font-bold text-lg">{author.username}</header>
                <div className="flex gap-2 items-center">
                  <p>1h</p>
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

            <div className="relative z-10 bg-[#252728]">
              <PostStatus
                currentLikeAmount={currentLikeAmount}
                commentAmount={comments.length}
                shareAmount={shares}
              />
              <PostActionButtons likeHandler={likeHandler} isLiked={liked} />
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

          <fieldset className="fieldset border-t-1 border-[#393939] w-full bg-[#252728] p-4 pb-5 sticky bottom-0 grid grid-cols-[auto_1fr] z-20">
            <div className="avatar">
              <div className="size-12 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
                className="textarea w-full rounded-2xl bg-[#333334] resize-none outline-none focus:outline-none ring-0 focus:ring-0 border-0 focus:border-0 outline-offset-0 focus:outline-offset-0"
                placeholder="Bình luận về bài viết nhennnn"
              ></textarea>
              <i
                onClick={commentToPost}
                className={`fa-solid fa-paper-plane absolute bottom-2 right-2 text-base p-2 ${
                  commentContent.length === 0
                    ? "cursor-not-allowed text-gray-500"
                    : "cursor-pointer text-blue-400 hover:bg-[#474646] hover:rounded-full"
                }`}
              ></i>
            </div>
          </fieldset>
        </div>
      </div>
    </dialog>
  );
};

export default PostModal;
