import { useEffect, useState } from "react";
import axios from "../helper/api";

const createPost = ({ formData }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);

  useEffect(() => {
    const createNewPost = async () => {
      try {
        setIsCreating(true);
        const response = await axios.request("/post/", {
          method: "POST",
          headers: { "Content-Type": "multipart/form-data" },
          data: formData,
        });
        if (response.data) setResponseStatus(response.data.success);
      } catch (error) {
        console.log(error);
        setResponseStatus(false);
      } finally {
        setIsCreating(false);
      }
    };

    createNewPost();
  }, []);
  return [isCreating, responseStatus];
};

export default createPost;
