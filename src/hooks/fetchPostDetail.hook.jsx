import { useEffect, useRef, useState } from "react";
import api from "../helper/api";

const useFetchPostDetail = ({ postId, refreshKey = 0 }) => {
  const [loading, setLoading] = useState(false);
  const [post, setpost] = useState(null);
  const loadedPostIdRef = useRef(null);

  useEffect(() => {
    const fetching = async () => {
      setLoading(loadedPostIdRef.current !== postId);
      try {
        const response = await api.request({
          url: `/post/${postId}`,
        });
        if (response) {
          const { post } = response.data;
          setpost(post);
          loadedPostIdRef.current = postId;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, [postId, refreshKey]);
  return [loading, post];
};

export default useFetchPostDetail;
