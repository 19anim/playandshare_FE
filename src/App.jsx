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

const App = () => {
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
            { path: "info", element: <UserInfor /> },
            { path: "posts", element: <UserPosts /> },
          ],
        },
        { path: "create-post", element: <CreatePost /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
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
  return <RouterProvider router={router} />;
};
export default App;
