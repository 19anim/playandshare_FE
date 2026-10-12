import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import token from "../../helper/token";

// Where the user was trying to go before being sent to /signin
const getRedirectPath = (location) => {
  const from = location.state?.from;
  if (typeof from === "string" && from.startsWith("/") && !from.startsWith("/signin") && !from.startsWith("/signup")) {
    return from;
  }
  return "/";
};

// Subscribing to the user's accessToken re-renders the guard on sign in / sign out
const useIsSignedIn = () => {
  useSelector((state) => state.user.accessToken);
  return token.getAccessToken() !== "";
};

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    const from = `${location.pathname}${location.search}${location.hash}`;
    return <Navigate to="/signin" replace state={{ from }} />;
  }
  return children;
};

export const GuestOnly = ({ children }) => {
  const location = useLocation();
  const isSignedIn = useIsSignedIn();

  if (isSignedIn) {
    return <Navigate to={getRedirectPath(location)} replace />;
  }
  return children;
};
