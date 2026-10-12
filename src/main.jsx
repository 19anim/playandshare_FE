import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";

// After a deploy, an open tab/installed app may try to lazy-load a page chunk that no
// longer exists. Reload once to pick up the new version instead of showing a broken page.
window.addEventListener("vite:preloadError", (event) => {
  if (sessionStorage.getItem("reloaded-after-deploy")) return;
  event.preventDefault();
  sessionStorage.setItem("reloaded-after-deploy", "1");
  window.location.reload();
});
window.addEventListener("load", () => {
  setTimeout(() => sessionStorage.removeItem("reloaded-after-deploy"), 10000);
});

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
