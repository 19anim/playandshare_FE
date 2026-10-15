import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import ExpenseCard from "../calculator/expenseCard.component";
import LinkExpenseModal from "../Modal/linkExpenseModal.component";
import { linkExpenseToSchedule } from "../../store/expense";

// "Chi tiêu của chuyến đi" section on the trip detail page
const TripExpenses = ({ scheduleId, linkedExpenses, availableExpenses, onCreate }) => {
  const dispatch = useDispatch();
  const linkModalRef = useRef(null);
  const [unlinkingId, setUnlinkingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUnlink = async (expenseId) => {
    setUnlinkingId(expenseId);
    setErrorMessage("");
    const result = await dispatch(linkExpenseToSchedule(expenseId, null));
    setUnlinkingId(null);
    if (!result) setErrorMessage("Không gỡ được chi tiêu, vui lòng thử lại.");
  };

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-2xl font-bold">Chi tiêu của chuyến đi</h2>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary btn-sm rounded-full" onClick={onCreate}>
            <i className="fa-solid fa-plus"></i>
            Tạo chi tiêu
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm rounded-full"
            onClick={() => linkModalRef.current.showModal()}
            disabled={availableExpenses.length === 0}
          >
            <i className="fa-solid fa-link"></i>
            Liên kết chi tiêu có sẵn
          </button>
        </div>
      </div>
      {errorMessage && <p className="mb-2 text-error">{errorMessage}</p>}
      {linkedExpenses.length === 0 ? (
        <p className="rounded-box bg-base-200 py-8 text-center text-base-content/60">
          Chuyến đi chưa có chi tiêu nào.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {linkedExpenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              onUnlink={() => handleUnlink(expense._id)}
              isUnlinking={unlinkingId === expense._id}
            />
          ))}
        </div>
      )}
      <LinkExpenseModal ref={linkModalRef} scheduleId={scheduleId} expenses={availableExpenses} />
    </section>
  );
};

export default TripExpenses;
