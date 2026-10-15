import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { linkExpenseToSchedule } from "../../store/expense";

// Shows which trip a calculator belongs to and lets the owner change or remove it
const ExpenseTripChip = ({ expense }) => {
  const dispatch = useDispatch();
  const { schedule: schedules, fetched } = useSelector((state) => state.schedule);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const trip = schedules.find((item) => item._id === expense.schedule);

  const handleChange = async (event) => {
    setSaving(true);
    setErrorMessage("");
    const result = await dispatch(linkExpenseToSchedule(expense._id, event.target.value || null));
    setSaving(false);
    if (!result) setErrorMessage("Không đổi được chuyến đi, vui lòng thử lại.");
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      {trip ? (
        <Link to={`/schedule/${trip._id}`} className="badge badge-soft badge-secondary gap-1 rounded-full">
          <i className="fa-solid fa-route"></i>
          {trip.location}
        </Link>
      ) : (
        // Until the trip list arrives, a linked calculator's trip is unknown, not missing
        <span className="text-base-content/60">
          {!fetched && expense.schedule ? "Đang tải chuyến đi..." : "Không thuộc chuyến đi nào"}
        </span>
      )}
      <select
        className="select select-xs w-auto rounded-full"
        value={expense.schedule || ""}
        onChange={handleChange}
        disabled={saving || !fetched}
        aria-label="Đổi chuyến đi"
      >
        <option value="">Không thuộc chuyến đi nào</option>
        {schedules.map((item) => (
          <option key={item._id} value={item._id}>
            {item.location}
          </option>
        ))}
      </select>
      {errorMessage && <span className="text-error">{errorMessage}</span>}
    </div>
  );
};

export default ExpenseTripChip;
