import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSelfPosts } from "../store/post";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const UserPosts = () => {
  const dispatch = useDispatch();
  const { selfPosts, loading } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getSelfPosts());
  }, []);

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <ul className="list dark:bg-zinc-800 dark:border-zinc-900 dark:text-white bg-bright border border-base-300 fieldset h-full w-full max-w-[600px] p-4 m-4 rounded-box flex flex-col items-center">
        <li className="p-4 pb-2 textarea-md opacity-60 tracking-wide">Bài viết đã đăng</li>
        {loading ? (
          <span className="loading loading-spinner loading-xl"></span>
        ) : selfPosts.length === 0 ? (
          <li className="p-4 pb-2 textarea-md opacity-60 tracking-wide">Chưa có bài viết nào</li>
        ) : (
          selfPosts.map((post) => (
            <li key={post._id} className="list-row w-full">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={
                    post.images.length > 0
                      ? post.images[0].url
                      : "https://placehold.co/40x40?text=No+Image"
                  }
                />
              </div>
              <div>
                <div className="font-semibold text-sm capitalize">{post.author.displayName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">{post.title}</div>
                <p className="list-col-wrap text-xs">
                  {post.content.length > 100 ? `${post.content.slice(0, 100)}...` : post.content}
                </p>
              </div>
              <button className="btn btn-square btn-ghost bg-[#dfdfdf] w-fit px-4 hover:bg-zinc-300">
                <Link to={`/posts/${post._id}`}>Chi tiết</Link>
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default UserPosts;
