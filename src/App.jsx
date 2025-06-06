import "./App.css";
import Layout from "./layout/layout";
import CreatePost from "./pages/createPost.page";
import NotFound from "./pages/notFound.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import Search from "./pages/search.page";
import UserInfor from "./pages/userInfor.page";
import UserPosts from "./pages/userPosts.page";
import PostDetail from "./pages/postDetail.page";
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
import Schedule from "./pages/schedule.page";

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const { username } = useSelector((state) => state.user);
  const accessToken = token.getAccessToken();
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
              element: accessToken !== "" ? <UserInfor /> : <Navigate to="/signin" replace />,
            },
            {
              path: "posts",
              element: accessToken !== "" ? <UserPosts /> : <Navigate to="/signin" replace />,
            },
          ],
        },
        {
          path: "posts/:postId",
          element: <PostDetail />,
        },
        {
          path: "create-post",
          element: accessToken !== "" ? <CreatePost /> : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule",
          element: accessToken !== "" ? <Schedule /> : <Navigate to="/signin" replace />,
        },
        { path: "signin", element: username ? <Navigate to="/signin" replace /> : <SignIn /> },
        { path: "signup", element: username ? <Navigate to="/signin" replace /> : <SignUp /> },
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
      {/* <ThemeToggle /> */}
      <RouterProvider router={router} />
    </div>
  );
};
export default App;
