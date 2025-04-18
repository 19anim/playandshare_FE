const PostComment = ({ user, comment, createdAt }) => {
  return (
    <>
      <section className="grid grid-cols-[auto_1fr] gap-x-2 px-5">
        <div className="avatar">
          <div className="size-10 rounded-full">
            {/* <img src={user.avatar} /> */}
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div className="card text-white bg-[#333334] card-xs rounded-2xl shadow-sm">
          <div className="card-body gap-0.5">
            <h2 className="card-title">{user.username}</h2>
            <p className="textarea-md whitespace-pre">{comment}</p>
          </div>
        </div>
        <div className="col-start-2 flex items-center gap-2 text-xs">
          {/* <p>10 minutes</p> */}
          <p>{createdAt}</p>
          <p className="cursor-pointer hover:underline">Like</p>
          <p className="cursor-pointer hover:underline">Reply</p>
        </div>
      </section>
    </>
  );
};

export default PostComment;
