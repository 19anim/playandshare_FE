import "./App.css";
import HomePage from "./pages/home.page";
import Layout from "./layout/layout";
import CreatePost from "./pages/createPost.page";
import NotFound from "./pages/notFound.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import Search from "./pages/search.page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import fetchSigninedUser from "./hooks/fetchSigninedUser.hook";
import TestPage from "./pages/test.page";
import { fetchCities, fetchPlayTypes } from "./store/postUtil";
import store from "./store/store";

const App = () => {
  store.dispatch(fetchCities());
  store.dispatch(fetchPlayTypes());
  fetchSigninedUser();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "search", element: <Search /> },
        { path: "test", element: <TestPage /> },
        { path: "create-post", element: <CreatePost /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;
