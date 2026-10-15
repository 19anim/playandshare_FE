import { Link } from "react-router-dom";
import { describeBalance, getExpenseTotals } from "../../helper/expenseTotals";

const formatNumber = (num) =>
  Number(num || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });

const ExpenseCard = ({ expense, tripName, isSelecting, isSelected, onSelect, onUnlink, isUnlinking }) => {
  // Same numbers as the summary on the detail page
  const { totalSpent, remaining } = getExpenseTotals(expense);
  const balance = describeBalance(remaining);

  return (
    <article className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="card-title text-lg">{expense.title}</h2>
            <p className="text-sm text-base-content/60">
              {expense.participants.length} người tham gia
            </p>
            {tripName && (
              <p className="mt-1 flex items-center gap-1 text-xs text-base-content/60">
                <i className="fa-solid fa-route"></i>
                {tripName}
              </p>
            )}
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
          <div className="flex gap-5">
            <div>
              <p className="text-xs text-base-content/60">Đã chi</p>
              <p className="whitespace-nowrap font-bold text-error">{formatNumber(totalSpent)} VNĐ</p>
            </div>
            <div>
              <p className="text-xs text-base-content/60">{balance.label}</p>
              <p className={`whitespace-nowrap font-bold ${balance.isDue ? "text-error" : "text-success"}`}>
                {formatNumber(balance.amount)} VNĐ
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {onUnlink && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={onUnlink}
                disabled={isUnlinking}
                title="Gỡ khỏi chuyến đi"
                aria-label={`Gỡ ${expense.title} khỏi chuyến đi`}
              >
                <i className="fa-solid fa-link-slash"></i>
              </button>
            )}
            {/* Absolute: the card is also shown on the trip detail page */}
            <Link className="btn btn-secondary btn-sm" to={`/calculator/${expense._id}`}>
              Chi tiết
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ExpenseCard;
