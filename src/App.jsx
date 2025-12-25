import { useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./App.css";

import Layout from "./layout/layout";
import Search from "./pages/search.page";
import SignIn from "./pages/signin.page";
import SignUp from "./pages/signup.page";
import UserInfor from "./pages/userInfor.page";
import UserPosts from "./pages/userPosts.page";
import PostDetail from "./pages/postDetail.page";
import CreatePost from "./pages/createPost.page";
import ImageDetail from "./pages/imageDetail.page";
import Schedule from "./pages/schedule.page";
import ScheduleDetail from "./pages/scheduleDetail.page";
import EditScheduleDetail from "./pages/editSchedultDetail.page";
import Calculator from "./pages/calculator.page";
import CalculatorDetail from "./components/calculator/calculatorDetail.component";
import NotFound from "./pages/notFound.page";

import store from "./store/store";
import token from "./helper/token";
import { getPosts } from "./store/post";
import { getCurrencyRates } from "./store/currenyRate";
import { fetchSchedule } from "./store/schedule";
import { fetchCities, fetchPlayTypes } from "./store/postUtil";
import fetchSigninedUser from "./hooks/fetchSigninedUser.hook";
import { fetchExpenses } from "./store/expense";

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const { username } = useSelector((state) => state.user);
  const accessToken = token.getAccessToken();

  useEffect(() => {
    console.log("Fetching initial data...");
    store.dispatch(fetchCities());
    store.dispatch(fetchPlayTypes());
    store.dispatch(getPosts());
    store.dispatch(fetchSchedule());
    store.dispatch(fetchExpenses());
    store.dispatch(getCurrencyRates());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode === "dark" ? "dark" : "light");
  }, [mode]);

  fetchSigninedUser();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Search />,
        },
        {
          path: "user",
          children: [
            {
              path: "info",
              element: accessToken ? <UserInfor /> : <Navigate to="/signin" replace />,
            },
            {
              path: "posts",
              element: accessToken ? <UserPosts /> : <Navigate to="/signin" replace />,
            },
          ],
        },
        {
          path: "posts/:postId",
          element: accessToken ? <PostDetail /> : <Navigate to="/signin" replace />,
        },
        {
          path: "create-post",
          element: accessToken ? <CreatePost /> : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule",
          element: accessToken ? <Schedule /> : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule/:scheduleId",
          element: accessToken ? <ScheduleDetail /> : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule/edit/:scheduleId",
          element: accessToken ? <EditScheduleDetail /> : <Navigate to="/signin" replace />,
        },
        {
          path: "signin",
          element: username ? <Navigate to="/" replace /> : <SignIn />,
        },
        {
          path: "signup",
          element: username ? <Navigate to="/" replace /> : <SignUp />,
        },
        {
          path: "calculator",
          element: accessToken ? <Calculator /> : <Navigate to="/signin" replace />,
        },
        {
          path: "calculator/:calculatorId",
          element: accessToken ? <CalculatorDetail /> : <Navigate to="/signin" replace />,
        },
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
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
