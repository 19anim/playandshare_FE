import { getExpenseTotals } from "../../helper/expenseTotals";

const formatNumber = (num) =>
  Number(num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

// One row per stat on phones (label left, amount right), three cards side by side from sm up
const Stat = ({ label, value, valueClassName = "" }) => (
  <div className="flex items-baseline justify-between gap-3 px-4 py-2.5 sm:block sm:rounded-box sm:bg-base-200 sm:py-3">
    <p className="text-sm text-base-content/60 sm:text-xs">{label}</p>
    <p className={`font-bold sm:text-xl ${valueClassName}`}>{formatNumber(value)} VND</p>
  </div>
);

const ExpenseSummary = ({ expense }) => {
  const { totalDeposit, totalSpent, remaining } = getExpenseTotals(expense);

  return (
    <section
      className="grid grid-cols-1 divide-y divide-base-300 rounded-box bg-base-200 sm:grid-cols-3 sm:gap-3 sm:divide-y-0 sm:rounded-none sm:bg-transparent"
      aria-label="Tổng quan chi tiêu"
    >
      <Stat label="Tổng đã đóng" value={totalDeposit} />
      <Stat label="Tổng đã chi" value={totalSpent} valueClassName="text-error" />
      <Stat
        label={remaining >= 0 ? "Còn lại" : "Còn thiếu"}
        value={Math.abs(remaining)}
        valueClassName={remaining >= 0 ? "text-success" : "text-error"}
      />
    </section>
  );
};

export default ExpenseSummary;
