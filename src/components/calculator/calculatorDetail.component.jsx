import Participants from "./participants.component";
import Payments from "./payments.component";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { duplicateExpense, fetchExpenses, removeExpense } from "../../store/expense";
import { getCurrencyRates } from "../../store/currenyRate";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../Modal/confirmation.component";
import DuplicateModal from "../Modal/duplicateModal.component";
import ExpenseSummary from "./expenseSummary.component";
import ExpenseExportActions from "./expenseExportActions.component";
import ExpenseTripChip from "./expenseTripChip.component";
import { fetchSchedule } from "../../store/schedule";

const CalculatorDetail = () => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { expenses, fetched, loading, error } = useSelector((state) => state.expense);
  const { rates } = useSelector((state) => state.currencyRate);
  const schedulesFetched = useSelector((state) => state.schedule.fetched);
  const confirmationModalRef = useRef(null);
  const duplicateModalRef = useRef(null);

  // Derived (not mirrored in state) so the redirect below never sees a stale value
  const currentCalculator = expenses.find((item) => item._id === calculatorId);
  // A calculator may hold only deposits so far; copying them alone is still useful
  const hasPayments = (currentCalculator?.payments.length || 0) > 0;
  const hasDeposits = (currentCalculator?.participants || []).some((participant) => (Number(participant.balance) || 0) !== 0);
  const duplicateCheckboxLabel = [hasPayments && "các khoản chi", hasDeposits && "tiền đã đóng"]
    .filter(Boolean)
    .join(" và ");

  const handleDeleteCalculator = () => {
    dispatch(removeExpense(calculatorId));
  };

  const navigate = useNavigate();

  // Opening this page directly (refresh / shared link) means the list hasn't been loaded yet
  useEffect(() => {
    if (!fetched) dispatch(fetchExpenses());
    if (rates.length === 0) dispatch(getCurrencyRates());
    if (!schedulesFetched) dispatch(fetchSchedule());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (fetched && !loading && !currentCalculator) {
      navigate("/calculator", { replace: true });
    }
  }, [fetched, loading, currentCalculator, navigate]);

  return (
    <section className="mx-auto w-full max-w-[1200px] px-3 py-5 md:px-6">
      <div className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
        <div className="flex w-full flex-row items-center gap-1 sm:gap-3">
          <Link className="btn btn-circle btn-ghost" to="/calculator">
            <i className="fa-solid fa-arrow-left "></i>
          </Link>
          <header className="min-w-0 flex-1 break-words text-xl font-bold">
            {currentCalculator ? currentCalculator.title : "Đang tải..."}
          </header>
          <button
            onClick={() => duplicateModalRef.current.showModal()}
            className="btn btn-circle btn-ghost"
            disabled={!currentCalculator}
            title="Nhân bản"
            aria-label="Nhân bản chi tiêu"
          >
            <i className="fa-regular fa-copy"></i>
          </button>
          {/* Keyed by id (here and on Participants/Payments): opening a copy must not keep the previous calculator's page, selection or prepared PDF */}
          <ExpenseExportActions key={calculatorId} expense={currentCalculator} />
          <button onClick={() => confirmationModalRef.current.showModal()} className="btn btn-circle btn-ghost text-error">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
        <div className="divider my-0"></div>
        {currentCalculator && (
          <div className="mb-3 flex flex-col gap-3">
            <ExpenseTripChip expense={currentCalculator} />
            <ExpenseSummary expense={currentCalculator} />
          </div>
        )}
        <section className="w-full grid grid-cols-1 lg:grid-cols-[max-content_1fr] gap-3">
          {currentCalculator ? (
            <>
              <Participants key={calculatorId} data={currentCalculator.participants} />
              <Payments key={calculatorId} data={currentCalculator} />
            </>
          ) : (
            !fetched && error ? (
              <p className="text-error">Không tải được dữ liệu, vui lòng thử lại.</p>
            ) : (
              <span className="loading loading-bars loading-lg"></span>
            )
          )}
        </section>
      </div>
      <DuplicateModal
        ref={duplicateModalRef}
        title="Nhân bản chi tiêu"
        message="Tạo một bản sao với cùng người tham gia."
        checkboxLabel={`Sao chép cả ${duplicateCheckboxLabel}`}
        showCheckbox={hasPayments || hasDeposits}
        onConfirm={(withPayments) => dispatch(duplicateExpense(calculatorId, { withPayments, rates }))}
        onSuccess={(copy) => navigate(`/calculator/${copy._id}`)}
      />
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
