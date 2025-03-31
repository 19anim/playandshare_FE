import { useEffect } from "react";
import store from "../store/store";
import { initiateCities } from "../store/postUtil";
import normalAxios from "../helper/normalAxios";

const fetchCities = () => {
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await normalAxios.request({
          url: "/admin/city",
        });

        if (response) {
          const { cities } = response.data;
          store.dispatch(initiateCities(cities));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetching();
  }, []);
  return null;
};

export default fetchCities;
