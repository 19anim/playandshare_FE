import PostImages from "./postImages.component";
import axios from "../../helper/api";
import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import PostComment from "./postComment.component";
import PostModal from "../Modal/postModal.component";

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
      <section className="flex gap-3 px-6 justify-between text-base text-[#9d9d9d]">
        <section>{currentLikeAmount} Lượt yêu thích</section>
        <section className="flex gap-3">
          <p>{comments.length} Bình luận</p>
          <p>{shares} chia sẻ</p>
        </section>
      </section>
      <div className="divider my-0 before:bg-[#9d9d9d] after:bg-[#9d9d9d]"></div>
      <div className="join">
        <button onClick={onLikeHandler} className="btn btn-ghost join-item grow">
          {liked ? (
            <span className="flex gap-2 items-center">
              <i className="fa-solid fa-heart"></i>Bỏ yêu thích
            </span>
          ) : (
            <span className="flex gap-2 items-center">
              <i className="fa-regular fa-heart"></i>Yêu thích
            </span>
          )}
        </button>
        <button onClick={handleCommentClick} className="btn btn-ghost join-item grow">
          Bình luận
        </button>
        <button className="btn btn-ghost join-item grow">Chia sẻ</button>
      </div>
      <div className="flex flex-col gap-2">
        <PostComment
          user={{ username: "Tuan An" }}
          comment="A card component has a figure, a body part, and inside body there are title and actions parts A card component has a figure, a body part, and inside body there are title and actions parts A card component has a figure, a body part, and inside body there are title and actions parts A card component has a figure, a body part, and inside body there are title and actions parts"
        />

        <PostComment
          user={{ username: "Minh Thu" }}
          comment="A card component has a figure, a body part, and inside body there are title and actions parts A card component has a figure, a body part, and inside body there are title and actions parts A card component has a figure, a body part, a"
        />
      </div>
      <PostModal modalRef={modalRef} post={post} />
    </div>
  );
};

export default Post;
