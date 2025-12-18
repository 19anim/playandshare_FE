import Participants from "./participants.component";
import Payments from "./payments.component";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeExpense } from "../../store/expense";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Modal/confirmation.component";

const CalculatorDetail = () => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { expenses } = useSelector((state) => state.expense);
  const confirmationModalRef = useRef(null);

  const [currentCalculator, setCurrentCalculator] = useState(
    expenses.find((item) => item._id === calculatorId)
  );

  useEffect(() => {
    setCurrentCalculator(expenses.find((item) => item._id === calculatorId));
  }, [expenses, calculatorId]);

  const handleDeleteCalculator = () => {
    dispatch(removeExpense(calculatorId));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentCalculator) {
      navigate("/calculator", { replace: true });
    }
  }, [currentCalculator, navigate]);

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <div className="w-full flex flex-row items-center pt-2">
          <Link className="justify-self-start" to="/calculator">
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <header className="text-center text-xl font-bold self-center justify-self-center w-full">
            {currentCalculator ? currentCalculator.title : "Đang tải..."}
          </header>
          <button onClick={() => confirmationModalRef.current.showModal()} className="btn">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        <section className="w-full grid lg:grid-cols-[max-content_1fr] gap-3">
          {currentCalculator ? (
            <>
              <Participants data={currentCalculator.participants} expense />
              <Payments data={currentCalculator} />
            </>
          ) : (
            <span className="loading loading-bars loading-lg"></span>
          )}
        </section>
      </fieldset>
      <ConfirmationModal
        ref={confirmationModalRef}
        title="Xóa chi tiêu"
        message="Bạn có chắc chắn muốn xóa chi tiêu này?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleDeleteCalculator}
      />
    </section>
  );
};

export default CalculatorDetail;
