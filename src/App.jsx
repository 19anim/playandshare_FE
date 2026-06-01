import { lazy, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Layout from "./layout/layout";
import PageLoader from "./components/Loading/pageLoader.component";

import token from "./helper/token";
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

const App = () => {
  const { mode } = useSelector((state) => state.theme);
  const { username } = useSelector((state) => state.user);
  const accessToken = token.getAccessToken();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode === "dark" ? "dark" : "light");
  }, [mode]);

  useFetchSignedInUser();

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
              element: accessToken ? loadPage(<UserInfor />) : <Navigate to="/signin" replace />,
            },
            {
              path: "posts",
              element: accessToken ? loadPage(<UserPosts />) : <Navigate to="/signin" replace />,
            },
          ],
        },
        {
          path: "posts/:postId",
          element: accessToken ? loadPage(<PostDetail />) : <Navigate to="/signin" replace />,
        },
        {
          path: "create-post",
          element: accessToken ? loadPage(<CreatePost />) : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule",
          element: accessToken ? loadPage(<Schedule />) : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule/:scheduleId",
          element: accessToken ? loadPage(<ScheduleDetail />) : <Navigate to="/signin" replace />,
        },
        {
          path: "schedule/edit/:scheduleId",
          element: accessToken ? loadPage(<EditScheduleDetail />) : <Navigate to="/signin" replace />,
        },
        {
          path: "signin",
          element: username ? <Navigate to="/" replace /> : loadPage(<SignIn />),
        },
        {
          path: "signup",
          element: username ? <Navigate to="/" replace /> : loadPage(<SignUp />),
        },
        {
          path: "calculator",
          element: accessToken ? loadPage(<Calculator />) : <Navigate to="/signin" replace />,
        },
        {
          path: "calculator/:calculatorId",
          element: accessToken ? loadPage(<CalculatorDetail />) : <Navigate to="/signin" replace />,
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

  return (
    <div className={`App w-screen ${mode === "dark" ? "dark" : ""}`}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
