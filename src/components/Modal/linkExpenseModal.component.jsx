import { useState } from "react";
import { useDispatch } from "react-redux";
import { linkExpenseToSchedule } from "../../store/expense";

// Lists the user's calculators that have no trip yet
const LinkExpenseModal = ({ ref, scheduleId, expenses }) => {
  const dispatch = useDispatch();
  const [busyId, setBusyId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLink = async (expenseId) => {
    setBusyId(expenseId);
    setErrorMessage("");
    const result = await dispatch(linkExpenseToSchedule(expenseId, scheduleId));
    setBusyId(null);
    if (!result) {
      setErrorMessage("Không liên kết được, vui lòng thử lại.");
      return;
    }
    // The linked calculator drops out of the list; close once nothing is left
    if (expenses.length <= 1) ref.current.close();
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Đóng">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Liên kết chi tiêu có sẵn</h3>
        {expenses.length === 0 ? (
          <p className="py-4 text-base-content/60">Không còn chi tiêu nào chưa thuộc chuyến đi.</p>
        ) : (
          <ul className="list mt-3 rounded-box border border-base-300">
            {expenses.map((expense) => (
              <li key={expense._id} className="list-row items-center">
                <div className="list-col-grow">
                  <div className="font-semibold">{expense.title}</div>
                  <div className="text-xs text-base-content/60">
                    {expense.participants.length} người tham gia
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm rounded-full"
                  disabled={busyId !== null}
                  onClick={() => handleLink(expense._id)}
                >
                  {busyId === expense._id ? "Đang liên kết..." : "Liên kết"}
                </button>
              </li>
            ))}
          </ul>
        )}
        {errorMessage && <p className="mt-3 text-error">{errorMessage}</p>}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default LinkExpenseModal;
