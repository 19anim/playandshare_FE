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
    <section className="mx-auto w-full max-w-[1200px] px-3 py-5 md:px-6">
      <div className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
        <div className="flex w-full flex-row items-center gap-3">
          <Link className="btn btn-circle btn-ghost" to="/calculator">
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <header className="w-full text-xl font-bold">
            {currentCalculator ? currentCalculator.title : "Đang tải..."}
          </header>
          <button onClick={() => confirmationModalRef.current.showModal()} className="btn btn-circle btn-ghost text-error">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div className="divider my-0"></div>
        <section className="w-full grid lg:grid-cols-[max-content_1fr] gap-3">
          {currentCalculator ? (
            <>
              <Participants data={currentCalculator.participants} />
              <Payments data={currentCalculator} />
            </>
          ) : (
            <span className="loading loading-bars loading-lg"></span>
          )}
        </section>
      </div>
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
