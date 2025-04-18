import "./App.css";
import HomePage from "./pages/home.page";
import Layout from "./layout/layout";
import CreatePost from "./pages/createPost.page";
import NotFound from "./pages/notFound.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import Search from "./pages/search.page";
import PostLayout from "./layout/postLayout";
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
        { index: true, element: <HomePage /> },
        {
          path: "posts",
          element: <PostLayout />,
          children: [{ index: true, element: <Search /> }],
        },
        { path: "test", element: <TestPage /> },
        { path: "create-post", element: <CreatePost /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "/posts/photo",
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
