import "./App.css";
import Layout from "./layout/layout";
import CreatePost from "./pages/createPost.page";
import NotFound from "./pages/notFound.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import Search from "./pages/search.page";
import UserInfor from "./pages/userInfor.page";
import UserPosts from "./pages/userPosts.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import fetchSigninedUser from "./hooks/fetchSigninedUser.hook";
import TestPage from "./pages/test.page";
import { fetchCities, fetchPlayTypes } from "./store/postUtil";
import store from "./store/store";
import ImageDetail from "./pages/imageDetail.page";
import { getPosts } from "./store/post";
import { useEffect } from "react";
import ThemeToggle from "./components/ThemeToggle/themeToggle.component";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import token from "./helper/token";

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const { username } = useSelector((state) => state.user);
  const acessToken = token.getAccessToken();

  useEffect(() => {
    store.dispatch(fetchCities());
    store.dispatch(fetchPlayTypes());
    store.dispatch(getPosts());
  }, []);
  fetchSigninedUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Search /> },
        { path: "test", element: <TestPage /> },
        {
          path: "user",
          children: [
            {
              path: "info",
              element: acessToken !== "" ? <UserInfor /> : <Navigate to="/" replace />,
            },
            {
              path: "posts",
              element: acessToken !== "" ? <UserPosts /> : <Navigate to="/" replace />,
            },
          ],
        },
        { path: "create-post", element: <CreatePost /> },
        { path: "signin", element: username ? <Navigate to="/" replace /> : <SignIn /> },
        { path: "signup", element: username ? <Navigate to="/" replace /> : <SignUp /> },
      ],
    },
    {
      path: "photo",
      element: <ImageDetail />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <div className={`App w-screen ${mode === "dark" ? "dark" : ""}`}>
      <ThemeToggle />
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
