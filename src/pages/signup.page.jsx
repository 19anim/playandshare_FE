import { Link } from "react-router-dom";
import SignUpImage from "../assets/authentication/signup.svg";
import { useDispatch } from "react-redux";
import { signup } from "../store/user";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { accessToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken !== "") {
      navigate("/");
    }
  }, [accessToken, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(signup(signUpData));
  };
  return (
    <section className="w-full h-full p-4 flex justify-center items-center">
      <div className="w-full h-full max-w-[440px] md:max-w-[880px] gap-10 flex justify-center items-center bg-base-300 border border-base-300 p-4 rounded-box">
        <section className="h-full grid grid-rows-[auto_auto_auto_1fr_auto] gap-6 py-20 md:pl-10">
          <header className="uppercase font-bold">Play and share</header>
          <p className="text-3xl font-bold">
            Holla,<br></br> Chào mừng bạn đến với Play and share
          </p>
          <p className="text-gray-400">Cùng chia sẻ địa điểm du lịch nào</p>
          <form onSubmit={onSubmitHandler} className="fieldset self-center w-xs md:w-sm">
            <fieldset className="fieldset self-center w-xs md:w-sm">
              <legend className="fieldset-legend text-2xl">Đăng ký</legend>

              <label className="fieldset-label">Tên đăng nhập</label>
              <input
                name="username"
                onChange={onChangeHandler}
                type="text"
                className="input w-full"
                placeholder="abcxyz"
              />

              <label className="fieldset-label">Email</label>
              <input
                name="email"
                onChange={onChangeHandler}
                type="email"
                className="input w-full"
                placeholder="abcxyz@mail.com"
              />

              <label className="fieldset-label">Mật khẩu</label>
              <input
                name="password"
                onChange={onChangeHandler}
                type="password"
                className="input w-full"
                placeholder="***"
              />
              <button className="btn btn-neutral mt-4">Let's go</button>
            </fieldset>
          </form>
          <p>
            Bạn đã có tài khoản ?{" "}
            <Link className="text-blue-600" to="/signin">
              Đăng nhập tại đây nhe
            </Link>
          </p>
        </section>
        <figure
          className="w-full h-full bg-cover bg-center hidden md:block rounded-2xl"
          style={{ backgroundImage: `url("${SignUpImage}")` }}
        ></figure>
      </div>
    </section>
  );
};

export default SignUp;
