const PostActionButtons = ({ likeHandler, commentHandler = null, isLiked }) => {
  return (
    <div className="grid grid-cols-3 px-2 pb-2">
      <button onClick={likeHandler} className={`btn btn-ghost btn-sm ${isLiked ? "text-primary" : ""}`}>
        <i className={`${isLiked ? "fa-solid" : "fa-regular"} fa-heart`}></i>
        <span className="hidden sm:inline">Yêu thích</span>
      </button>
      <button onClick={commentHandler} className="btn btn-ghost btn-sm">
        <i className="fa-regular fa-comment"></i>
        <span className="hidden sm:inline">Bình luận</span>
      </button>
      <button className="btn btn-ghost btn-sm">
        <i className="fa-regular fa-paper-plane"></i>
        <span className="hidden sm:inline">Chia sẻ</span>
      </button>
    </div>
  );
};

export default PostActionButtons;
