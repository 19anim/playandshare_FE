import axios from "axios";

const currentMode = import.meta.env.MODE;
const apiUrl =
  currentMode === "development"
    ? "http://localhost:3000/api"
    : "https://playandshare.onrender.com/api";

const normalAxios = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default normalAxios;
