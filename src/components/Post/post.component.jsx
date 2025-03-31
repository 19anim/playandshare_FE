import PostImages from "./postImages.component";

const Post = ({ post }) => {
  const { author, title, content, typeTags, cityTag, images, likes, comments, shares } = post;
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
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            {author}
          </h2>
          <h1 className="text-xl font-medium"> {title}</h1>
          <p className="whitespace-pre-line">{content}</p>
          <div className="card-actions justify-end">
            {typeTags.map((type) => (
              <div key={`${author}_${title}_${type}`} className="badge badge-soft badge-neutral">
                {type}
              </div>
            ))}
          </div>
          <div className="card-actions justify-end">
            <div className="badge badge-soft badge-primary font-bold">{cityTag}</div>
          </div>
        </div>
      </div>
      <PostImages images={images} />
      <section className="flex gap-3 px-6 justify-between text-base text-[#9d9d9d]">
        <section>{likes} Lượt yêu thích</section>
        <section className="flex gap-3">
          <p>{comments.length} Bình luận</p>
          <p>{shares} chia sẻ</p>
        </section>
      </section>
      <div className="divider my-0 before:bg-[#9d9d9d] after:bg-[#9d9d9d]"></div>
      <div className="join">
        <button className="btn btn-ghost join-item grow">Yêu thích</button>
        <button className="btn btn-ghost join-item grow">Bình luận</button>
        <button className="btn btn-ghost join-item grow">Chia sẻ</button>
      </div>
    </div>
  );
};

export default Post;
