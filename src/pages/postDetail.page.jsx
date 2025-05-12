import { useParams } from "react-router-dom";
import Post from "../components/Post/post.component";
import fetchPostDetail from "../hooks/fetchPostDetail.hook";

const PostDetail = () => {
  const { postId } = useParams();
  const [loading, post] = fetchPostDetail({ postId });

  return (
    <div className="place-items-center flex flex-col w-full h-full p-4">
      {loading ? (
        <>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
          <span className="loading loading-ring loading-xl"></span>
        </>
      ) : (
        post && <Post post={post} />
      )}
    </div>
  );
};

export default PostDetail;
