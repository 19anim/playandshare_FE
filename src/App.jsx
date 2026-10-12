import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./layout/layout";
import PageLoader from "./components/Loading/pageLoader.component";
import { RequireAuth, GuestOnly } from "./components/Auth/routeGuards";

import useFetchSignedInUser from "./hooks/fetchSigninedUser.hook";

const Search = lazy(() => import("./pages/search.page"));
const SignIn = lazy(() => import("./pages/signin.page"));
const SignUp = lazy(() => import("./pages/signup.page"));
const UserInfor = lazy(() => import("./pages/userInfor.page"));
const UserPosts = lazy(() => import("./pages/userPosts.page"));
const PostDetail = lazy(() => import("./pages/postDetail.page"));
const CreatePost = lazy(() => import("./pages/createPost.page"));
const ImageDetail = lazy(() => import("./pages/imageDetail.page"));
const Schedule = lazy(() => import("./pages/schedule.page"));
const ScheduleDetail = lazy(() => import("./pages/scheduleDetail.page"));
const EditScheduleDetail = lazy(() => import("./pages/editSchedultDetail.page"));
const Calculator = lazy(() => import("./pages/calculator.page"));
const CalculatorDetail = lazy(() => import("./components/calculator/calculatorDetail.component"));
const NotFound = lazy(() => import("./pages/notFound.page"));

const loadPage = (page) => <Suspense fallback={<PageLoader />}>{page}</Suspense>;
const protectedPage = (page) => <RequireAuth>{loadPage(page)}</RequireAuth>;
const guestPage = (page) => <GuestOnly>{loadPage(page)}</GuestOnly>;

// Created once so re-renders of App (e.g. after sign in) don't rebuild the router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: loadPage(<Search />),
      },
      {
        path: "user",
        children: [
          {
            path: "info",
            element: protectedPage(<UserInfor />),
          },
          {
            path: "posts",
            element: protectedPage(<UserPosts />),
          },
        ],
      },
      {
        path: "posts/:postId",
        element: protectedPage(<PostDetail />),
      },
      {
        path: "create-post",
        element: protectedPage(<CreatePost />),
      },
      {
        path: "schedule",
        element: protectedPage(<Schedule />),
      },
      {
        path: "schedule/:scheduleId",
        element: protectedPage(<ScheduleDetail />),
      },
      {
        path: "schedule/edit/:scheduleId",
        element: protectedPage(<EditScheduleDetail />),
      },
      {
        path: "signin",
        element: guestPage(<SignIn />),
      },
      {
        path: "signup",
        element: guestPage(<SignUp />),
      },
      {
        path: "calculator",
        element: protectedPage(<Calculator />),
      },
      {
        path: "calculator/:calculatorId",
        element: protectedPage(<CalculatorDetail />),
      },
    ],
  },
  {
    path: "photo",
    element: loadPage(<ImageDetail />),
  },
  {
    path: "*",
    element: loadPage(<NotFound />),
  },
]);

const App = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode === "dark" ? "dark" : "light");
  }, [mode]);

  useFetchSignedInUser();

  return (
    <div className={`App w-screen ${mode === "dark" ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
