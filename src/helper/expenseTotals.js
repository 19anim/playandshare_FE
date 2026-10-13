// Totals for one calculator (expense), in VND so participants with different
// currencies can be added up. Mirrors the server's expense.balance formula.
export const getExpenseTotals = (expense) => {
  const participants = expense?.participants || [];
  const totalDeposit = participants.reduce((sum, p) => sum + (p.balanceInVND || 0), 0);
  const totalSpent = participants.reduce((sum, p) => sum + (p.paidInVND || 0), 0);
  return { totalDeposit, totalSpent, remaining: totalDeposit - totalSpent };
};

// A negative balance is money still owed: show it as "Còn thiếu" with a positive amount
export const describeBalance = (amount) => {
  const rounded = Math.round((Number(amount) || 0) * 100) / 100;
  const isDue = rounded < 0;
  return { label: isDue ? "Còn thiếu" : "Số dư", amount: Math.abs(rounded), isDue };
};
