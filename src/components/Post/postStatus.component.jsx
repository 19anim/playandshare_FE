const PostStatus = ({ currentLikeAmount, commentAmount, shareAmount }) => {
  return (
    <section className="flex justify-between gap-3 px-4 text-xs text-base-content/60">
      <span>{currentLikeAmount} lượt yêu thích</span>
      <span>{commentAmount} bình luận · {shareAmount || 0} chia sẻ</span>
    </section>
  );
};

export default PostStatus;
