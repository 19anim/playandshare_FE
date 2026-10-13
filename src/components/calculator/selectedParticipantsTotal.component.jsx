import { describeBalance, getExpenseTotals } from "../../helper/expenseTotals";

const formatNumber = (num) =>
  Number(num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

// Combined numbers for the ticked participants, e.g. people paying back the host from one wallet
const SelectedParticipantsTotal = ({ selected, total, onSelectAll, onClear }) => {
  if (selected.length === 0) {
    return (
      <p className="text-xs text-base-content/60">
        Tick nhiều người dùng chung một nguồn tiền để xem tổng của họ.
      </p>
    );
  }

  const { totalDeposit, totalSpent, remaining } = getExpenseTotals({ participants: selected });
  const balance = describeBalance(remaining);

  return (
    <div className="rounded-box border border-primary/30 bg-base-100 p-3" aria-live="polite">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">Đã chọn {selected.length} người</p>
        <div className="flex gap-1">
          {selected.length < total && (
            <button type="button" className="btn btn-ghost btn-xs" onClick={onSelectAll}>
              Chọn tất cả
            </button>
          )}
          <button type="button" className="btn btn-ghost btn-xs" onClick={onClear}>
            Bỏ chọn
          </button>
        </div>
      </div>
      <p className="truncate text-xs text-base-content/60" title={selected.map((p) => p.name).join(", ")}>
        {selected.map((p) => p.name).join(", ")}
      </p>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 text-sm">
        <dt className="text-base-content/60">Đã đóng</dt>
        <dd className="whitespace-nowrap text-right font-semibold text-success">{formatNumber(totalDeposit)} VND</dd>
        <dt className="text-base-content/60">Đã chi</dt>
        <dd className="whitespace-nowrap text-right font-semibold text-error">{formatNumber(totalSpent)} VND</dd>
        <dt className="font-semibold">{balance.label}</dt>
        <dd
          className={`whitespace-nowrap text-right text-base font-bold ${
            balance.isDue ? "text-error" : "text-success"
          }`}
        >
          {formatNumber(balance.amount)} VND
        </dd>
      </dl>
    </div>
  );
};

export default SelectedParticipantsTotal;
