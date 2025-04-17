const PostActionButtons = ({ likeHandler, commentHandler = null, isLiked }) => {
  return (
    <div className="join">
      <button onClick={likeHandler} className="btn btn-ghost join-item grow">
        {isLiked ? (
          <span className="flex gap-2 items-center">
            <i className="fa-solid fa-heart"></i>Bỏ yêu thích
          </span>
        ) : (
          <span className="flex gap-2 items-center">
            <i className="fa-regular fa-heart"></i>Yêu thích
          </span>
        )}
      </button>
      <button onClick={commentHandler} className="btn btn-ghost join-item grow">
        Bình luận
      </button>
      <button className="btn btn-ghost join-item grow">Chia sẻ</button>
    </div>
  );
};

export default PostActionButtons;
