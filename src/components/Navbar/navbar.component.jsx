import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "../ThemeToggle/themeToggle.component";
import store from "../../store/store";
import { signout } from "../../store/user";

const navigationItems = [
  { label: "Khám phá", to: "/" },
  { label: "Timeline", to: "/schedule" },
  { label: "Chia tiền", to: "/calculator" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { displayName, avatar, accessToken } = useSelector((state) => state.user);

  const signOutHandler = () => {
    store.dispatch(signout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar mx-auto max-w-[1440px] gap-2 px-3 md:px-6">
        <div className="navbar-start w-auto gap-2">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} type="button" className="btn btn-circle btn-ghost" aria-label="Mở menu">
              <i className="fa-solid fa-bars"></i>
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-20 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-md">
              {navigationItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost gap-2 px-2 text-primary" aria-label="Play and Share home">
            <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-content">
              <i className="fa-solid fa-location-dot"></i>
            </span>
            <span className="hidden font-bold sm:block">Play & Share</span>
          </Link>
        </div>

        <div className="navbar-center hidden flex-1 lg:flex">
          <nav className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <Link key={item.to} to={item.to} className="btn btn-ghost rounded-full">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="navbar-end flex-1 gap-1">
          <ThemeToggle />
          {accessToken === "" ? (
            <Link to="/signin" className="btn btn-primary rounded-full">
              Đăng nhập
            </Link>
          ) : (
            <>
              <Link to="/create-post" className="btn btn-primary hidden rounded-full sm:flex">
                <i className="fa-solid fa-plus"></i>
                Đăng bài
              </Link>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} type="button" className="btn btn-circle btn-ghost avatar">
                  <div className="w-9 rounded-full">
                    <img
                      src={avatar || "https://avatar.iran.liara.run/public"}
                      alt={displayName || "User avatar"}
                      loading="lazy"
                    />
                  </div>
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-20 mt-2 w-48 rounded-box border border-base-300 bg-base-100 p-2 shadow-md">
                  <li className="menu-title truncate">{displayName}</li>
                  <li><Link to="/create-post">Đăng bài viết</Link></li>
                  <li><Link to="/user/info">Thông tin</Link></li>
                  <li><Link to="/user/posts">Bài viết của tôi</Link></li>
                  <li><button type="button" onClick={signOutHandler}>Đăng xuất</button></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
