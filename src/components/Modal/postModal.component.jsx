import PostImages from "../Post/postImages.component";

const PostModal = ({ modalRef, post }) => {
  const { _id, author, title, content, types, city, images, likes, comments, shares } = post;
  return (
    <dialog ref={modalRef} className="modal text-black">
      <div className="modal-box max-w-screen md:w-[700px] w-[95%] h-[95%] p-0">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        </form>
        <div className="h-full bg-[#252728] text-[#e2e5e9]">
          <section>
            <header className="text-center text-3xl py-3 font-mono">
              {author.username}'s post
            </header>
            <div className="divider before:bg-white after:bg-white before:h-[1px] after:h-[1px] m-0"></div>
          </section>

          <section className="px-3 grid grid-cols-[auto_1fr_auto] gap-x-3">
            <div className="avatar">
              <div className="size-12 rounded-full">
                {/* Update for real avatar
                <img src={author.avatar} /> */}
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>

            <div>
              <header className="font-bold text-lg">{author.username}</header>
              <div className="flex gap-2 items-center">
                <p>1h</p>
                <i className="fa-regular fa-paper-plane"></i>
              </div>
            </div>

            <i className="fa-solid fa-ellipsis text-xl self-center cursor-pointer"></i>
          </section>

          <section className="px-3">
            <header className="text-2xl font-medium">{title}</header>
            <main className="whitespace-pre-wrap break-words text-sm md:text-base">{content}</main>
          </section>

          <section>{images.length > 0 ? <PostImages images={images} /> : null}</section>
        </div>
      </div>
    </dialog>
  );
};

export default PostModal;
