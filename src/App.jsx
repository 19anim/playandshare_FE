import "./App.css";
import HomePage from "./pages/home.page";
import Layout from "./layout/layout";
import TestPage from "./pages/test.page";
import NotFound from "./pages/notFound.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import store from "./store/store";
import { initiateAccessToken } from "./store/user";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";

// Check if user have login before

const App = () => {
  // const user = useSelector((state) => state.user);
  // store.dispatch(initiateAccessToken());
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      // errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "test", element: <TestPage /> },
        {
          path: "signin",
          element: <SignIn />,
        },
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
