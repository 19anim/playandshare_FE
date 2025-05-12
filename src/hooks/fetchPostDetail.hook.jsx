import { useEffect, useState } from "react";
import api from "../helper/api";

const fetchPostDetail = ({ postId }) => {
  const [loading, setLoading] = useState(false);
  const [post, setpost] = useState(null);
  useEffect(() => {
    const fetching = async () => {
      setLoading(true);
      try {
        const response = await api.request({
          url: `/post/${postId}`,
        });
        if (response) {
          const { post } = response.data;
          setpost(post);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetching();
  }, []);
  return [loading, post];
};

export default fetchPostDetail;
