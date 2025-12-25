import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

const savedTheme = localStorage.getItem("theme");
const initialTheme =
  savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.setAttribute("data-theme", initialTheme);

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</StrictMode>
);
