import { Link } from "react-router-dom";
import SignUpImage from "../assets/authentication/signup.svg";

const SignUp = () => {
  return (
    <section className="w-full h-full p-4 flex justify-center items-center">
      <div className="w-full h-full max-w-[440px] md:max-w-[880px] gap-10 flex justify-center items-center bg-base-300 border border-base-300 p-4 rounded-box">
        <section className="h-full grid grid-rows-[auto_auto_auto_1fr_auto] gap-6 py-20 md:pl-10">
          <header className="uppercase font-bold">Play and share</header>
          <p className="text-3xl font-bold">
            Holla,<br></br> Chào mừng bạn đến với Play and share
          </p>
          <p className="text-gray-400">Cùng chia sẻ địa điểm du lịch nào</p>
          <fieldset className="fieldset self-center w-xs md:w-sm">
            <legend className="fieldset-legend text-2xl">Đăng ký</legend>

            <label className="fieldset-label">Tên đăng nhập</label>
            <input type="email" className="input w-full" placeholder="abcxyz" />

            <label className="fieldset-label">Email</label>
            <input type="email" className="input w-full" placeholder="abcxyz@mail.com" />

            <label className="fieldset-label">Mật khẩu</label>
            <input type="password" className="input w-full" placeholder="***" />
            <button className="btn btn-neutral mt-4">Let's go</button>
          </fieldset>
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
