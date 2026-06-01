import { Link } from "react-router-dom";

const ExpenseCard = ({ expense, isSelecting, isSelected, onSelect }) => {
  const formattedBalance = Number(expense.balance || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

  return (
    <article className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="card-title text-lg">{expense.title}</h2>
            <p className="text-sm text-base-content/60">
              {expense.participants.length} người tham gia
            </p>
          </div>
          {isSelecting && (
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={isSelected}
              onChange={onSelect}
              aria-label={`Chọn khoản chi ${expense.title}`}
            />
          )}
        </div>

        <div>
          <p className="mb-1 text-xs text-base-content/60">Thành viên</p>
          <p className="truncate text-sm" title={expense.participants.map((item) => item.name).join(", ")}>
            {expense.participants.map((item) => item.name).join(", ")}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-base-content/60">Số dư</p>
            <p className={`font-bold ${expense.balance >= 0 ? "text-success" : "text-error"}`}>
              {formattedBalance} VNĐ
            </p>
          </div>
          <Link className="btn btn-secondary btn-sm" to={expense._id}>
            Chi tiết
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ExpenseCard;
