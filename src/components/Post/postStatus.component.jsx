import React from "react";

const PostStatus = ({ currentLikeAmount, commentAmount, shareAmount }) => {
  return (
    <section className="flex gap-3 px-6 justify-between text-base text-[#9d9d9d]">
      <section>{currentLikeAmount} Lượt yêu thích</section>
      <section className="flex gap-3">
        <p>{commentAmount} Bình luận</p>
        <p>{shareAmount} chia sẻ</p>
      </section>
    </section>
  );
};

export default PostStatus;
