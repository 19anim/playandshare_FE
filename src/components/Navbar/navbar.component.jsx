import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../store/store";
import { signout } from "../../store/user";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { displayName, avatar, accessToken } = useSelector((state) => state.user);
  const signOutHandler = () => {
    store.dispatch(signout());
    navigate("/");
  };
  return (
    <div className="navbar bg-base-100 shadow-sm px-6">
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
              <Link onClick={() => document.activeElement.blur()} to="/create-post" className="btn">
                Đăng bài viết
              </Link>
            </li>
            <li>
              <Link onClick={() => document.activeElement.blur()} to="/schedule" className="btn">
                Tạo timeline du lịch
              </Link>
            </li>
          </ul>
        </div>
        <Link onClick={() => document.activeElement.blur()} to="/" className="btn">
          Trang chủ
        </Link>
      </div>
      <div className="navbar-center hidden lg:block">
        <ul className="menu menu-horizontal px-1 text-xl gap-3">
          <li>
            <Link to="/create-post" className="btn">
              Đăng bài viết
            </Link>
          </li>
          <li>
            <Link to="/schedule" className="btn">
              Tạo timeline du lịch
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {accessToken === "" ? (
          <Link onClick={() => document.activeElement.blur()} to="signin" className="btn">
            Đăng ký / Đăng nhập
          </Link>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={avatar !== "" ? avatar : "https://avatar.iran.liara.run/public"} />
              </div>
            </div>
            <div className="dropdown">
              <div tabIndex={1} role="button" className="badge badge-success cursor-pointer">
                {displayName && (
                  <>
                    <span className="block sm:hidden">
                      {displayName.length > 8 ? displayName.slice(0, 8) + "…" : displayName}
                    </span>
                    <span className="hidden sm:block">{displayName}</span>
                  </>
                )}
              </div>
              <ul
                tabIndex={1}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-25 p-2 shadow-sm"
              >
                <li>
                  <Link onClick={() => document.activeElement.blur()} to="/user/info">
                    Thông tin
                  </Link>
                </li>
                <li>
                  <Link onClick={() => document.activeElement.blur()} to="/user/posts">
                    Bài viết
                  </Link>
                </li>
              </ul>
            </div>

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
