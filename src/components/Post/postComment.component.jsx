const PostComment = ({ user, comment }) => {
  return (
    <>
      <section className="grid grid-cols-[auto_1fr] gap-x-2 px-5">
        <div className="avatar">
          <div className="size-12 rounded-full">
            {/* <img src={user.avatar} /> */}
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="card text-black bg-[#bfbfbf] card-xs rounded-2xl shadow-sm">
          <div className="card-body">
            <h2 className="card-title">{user.username}</h2>
            <p>{comment}</p>
          </div>
        </div>
        <div className="col-start-2 flex gap-2">
          <p>10 minutes</p>
          <p className="cursor-pointer hover:underline">Like</p>
          <p className="cursor-pointer hover:underline">Reply</p>
        </div>
      </section>
    </>
  );
};

export default PostComment;
