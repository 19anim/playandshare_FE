import { useEffect } from "react";
import store from "../store/store";
import { initiatePlayTypes } from "../store/postUtil";
import normalAxios from "../helper/normalAxios";

const fetchPlayTypes = () => {
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await normalAxios.request({
          url: "/admin/play-type",
        });

        if (response) {
          const { playTypes } = response.data;
          store.dispatch(initiatePlayTypes(playTypes));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, []);
  return null;
};

export default fetchPlayTypes;
