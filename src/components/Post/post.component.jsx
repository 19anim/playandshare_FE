import PostImages from "./postImages.component";
import axios from "../../helper/api";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import PostComment from "./postComment.component";
import PostModal from "../Modal/postModal.component";
import PostActionButtons from "./postActionButtons.component";
import PostStatus from "./postStatus.component";

const Post = ({ post }) => {
  const { _id, author, title, content, types, city, images, likes, comments, shares } = post;
  const { userId } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(likes.indexOf(userId) !== -1);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likes.length);
  const modalRef = useRef(null);

  const handleCommentClick = () => {
    modalRef.current.showModal();
  };

  const onLikeHandler = async () => {
    try {
      const response = await axios.request("/post/like", {
        method: "POST",
        data: {
          postId: _id,
        },
      });

      if (response) {
        setCurrentLikeAmount(response.data.post.likes.length);
        setLiked(!liked);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`fieldset w-full ${
        images.length > 0 ? "min-h-[950px]" : null
      } max-w-[950px] bg-[#555] rounded-box self-center text-white flex flex-col grow`}
    >
      <div className="card w-full">
        <div className="card-body">
          <h2 className="card-title">
            <div className="avatar">
              <div className="w-14 rounded-full">
                {/* Get user image avatar here */}
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            {author.username}
          </h2>
          <h1 className="text-xl font-medium"> {title}</h1>
          <p className="whitespace-pre-line">{content}</p>
          <div className="card-actions justify-end">
            {types.map((type) => (
              <div
                key={`${author}_${title}_${type.name}`}
                className="badge badge-soft badge-neutral"
              >
                {type.name}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <div className="badge badge-soft badge-primary font-bold">{city.name}</div>
          </div>
        </div>
      </div>
      {images.length > 0 ? <PostImages images={images} postId={_id} /> : null}
      <PostStatus
        currentLikeAmount={currentLikeAmount}
        commentAmount={comments.length}
        shareAmount={shares}
      />
      <div className="divider my-0 before:bg-[#9d9d9d] after:bg-[#9d9d9d]"></div>
      <PostActionButtons
        likeHandler={onLikeHandler}
        commentHandler={handleCommentClick}
        isLiked={liked}
      />
      <PostModal
        modalRef={modalRef}
        post={post}
        likeHandler={onLikeHandler}
        currentLikeAmount={currentLikeAmount}
        liked={liked}
      />
    </div>
  );
};

export default Post;
