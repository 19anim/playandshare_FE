import Participants from "../components/calculator/participants.component";
import Payments from "../components/calculator/payments.component";

const Calculator = () => {
  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <header className="text-center text-xl font-bold pt-2">Chia tiền du lịch</header>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        <section className="w-full grid lg:grid-cols-[max-content_1fr] gap-3">
          <Participants />
          <Payments />
        </section>
      </fieldset>
    </section>
  );
};

export default Calculator;
