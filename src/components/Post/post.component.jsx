import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../helper/api";
import { formatDate } from "../../helper/formatDate";
import PostModal from "../Modal/postModal.component";
import PostActionButtons from "./postActionButtons.component";
import PostImages from "./postImages.component";
import PostStatus from "./postStatus.component";

const Post = ({ post }) => {
  const { _id, author, title, content, types, city, images, likes, comments, shares, createdAt } = post;
  const { userId } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(likes.indexOf(userId) !== -1);
  const [currentLikeAmount, setCurrentLikeAmount] = useState(likes.length);
  const modalRef = useRef(null);

  const onLikeHandler = async () => {
    try {
      const response = await axios.request("/post/like", {
        method: "POST",
        data: { postId: _id },
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
    <article className="card mb-4 break-inside-avoid overflow-hidden border border-base-300 bg-base-100">
      {images.length > 0 ? <PostImages images={images} postId={_id} /> : null}

      <div className="card-body gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={author.avatar} alt={author.displayName} loading="lazy" />
            </div>
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{author.displayName}</p>
            <p className="text-xs text-base-content/60">{formatDate(createdAt)}</p>
          </div>
        </div>

        <h2 className="text-lg font-bold">{title}</h2>
        <p className="line-clamp-3 whitespace-pre-line text-sm text-base-content/75">{content}</p>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-primary badge-soft font-bold">{city.name}</span>
          {types.map((type) => (
            <span key={`${_id}_${type.name}`} className="badge badge-soft">
              {type.name}
            </span>
          ))}
        </div>
      </div>

      <PostStatus currentLikeAmount={currentLikeAmount} commentAmount={comments.length} shareAmount={shares} />
      <div className="divider my-0 px-4"></div>
      <PostActionButtons
        likeHandler={onLikeHandler}
        commentHandler={() => modalRef.current.showModal()}
        isLiked={liked}
      />
      <PostModal modalRef={modalRef} post={post} likeHandler={onLikeHandler} currentLikeAmount={currentLikeAmount} liked={liked} />
    </article>
  );
};

export default Post;
