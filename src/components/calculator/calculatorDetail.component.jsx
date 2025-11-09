import Participants from "./participants.component";
import Payments from "./payments.component";
import { Link } from "react-router-dom";

const CalculatorDetail = () => {
  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <div className="w-full flex flex-row items-center pt-2">
          <Link className="justify-self-start" to="/calculator">
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <header className="text-center text-xl font-bold self-center justify-self-center w-full">
            Chi tiêu đà lạt 11/2025
          </header>
        </div>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        <section className="w-full grid lg:grid-cols-[max-content_1fr] gap-3">
          <Participants />
          <Payments />
        </section>
      </fieldset>
    </section>
  );
};

export default CalculatorDetail;
