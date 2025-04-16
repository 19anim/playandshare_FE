import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { userDataClearance } from "../../store/user";

const Navbar = () => {
  const { username, accessToken } = useSelector((state) => state.user);

  const signOutHandler = () => {
    store.dispatch(userDataClearance());
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/posts" className="btn">
                Bài viết
              </Link>
            </li>
            <li>
              <Link to="/create-post" className="btn">
                Đăng bài viết
              </Link>
            </li>
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl">Trang chủ</a> */}
        <Link to="/" className="btn">
          Trang chủ
        </Link>
      </div>
      <div className="navbar-center hidden lg:block">
        <ul className="menu menu-horizontal px-1 text-xl gap-3">
          <li>
            <Link to="/posts" className="btn">
              Bài viết
            </Link>
          </li>
          <li>
            <Link to="/create-post" className="btn">
              Đăng bài viết
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {accessToken === "" ? (
          <Link to="signin" className="btn">
            Sign in/ Sign up
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <p>Hello</p>
            <span className="badge badge-success">{username.toUpperCase()}</span>{" "}
            <i
              onClick={signOutHandler}
              className="fa-solid fa-right-from-bracket cursor-pointer"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
