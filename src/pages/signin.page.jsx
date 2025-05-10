import { Link } from "react-router-dom";
import store from "../store/store";
import { signin } from "../store/user";
import SignInImage from "../assets/authentication/signin.svg";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignIn = () => {
  const { loading, accessToken, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken !== "") {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const [signinData, setSigninData] = useState({
    username: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    store.dispatch(signin(signinData));
  };
  return (
    <section className="w-full h-full p-4 flex justify-center items-center">
      <div className="w-full h-full max-w-[440px] md:max-w-[880px] gap-10 flex justify-center items-center bg-base-300 border border-base-300 p-4 rounded-box">
        <section className="h-full grid grid-rows-[auto_auto_auto_1fr_auto] gap-6 py-20 md:pl-10">
          <header className="uppercase font-bold">Play and share</header>
          <p className="text-3xl font-bold">
            Holla,<br></br> Chào mừng bạn trở lại
          </p>
          <p className="text-gray-400">Cùng chia sẻ địa điểm du lịch nào</p>
          <fieldset className="fieldset self-center w-xs md:w-sm">
            <form onSubmit={onSubmitHandler} className="fieldset self-center w-xs md:w-sm">
              <legend className="fieldset-legend text-2xl">Đăng nhập</legend>

              <label className="fieldset-label">Tên đăng nhập</label>
              <input
                className="input w-full"
                onChange={onChangeHandler}
                value={signinData.username}
                type="text"
                placeholder="abcxyz"
                name="username"
              />

              <label className="fieldset-label">Mật khẩu</label>
              <input
                className="input w-full"
                onChange={onChangeHandler}
                value={signinData.password}
                type="password"
                placeholder="***"
                name="password"
              />
              <button
                type="submit"
                disabled={loading ? true : false}
                className="btn btn-neutral mt-4"
              >
                Let's go
              </button>
            </form>
          </fieldset>
          <p className="text-red-500">{error !== null ? error : null}</p>
          <p>
            Bạn chưa có tài khoản ?{" "}
            <Link className="text-blue-600" to="/signup">
              Tạo một cái nhen
            </Link>
          </p>
        </section>
        <figure
          className="w-full h-full bg-contain bg-no-repeat bg-center hidden md:block"
          style={{ backgroundImage: `url("${SignInImage}")` }}
        ></figure>
      </div>
    </section>
  );
};

export default SignIn;
