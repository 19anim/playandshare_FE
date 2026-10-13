import { formatCount, stepDown, stepUp } from "../../helper/portions";

const formatNumber = (num) =>
  parseFloat(num || 0).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

const remainingText = (participant) =>
  participant.currency !== "VND"
    ? `${formatNumber(parseFloat((participant.balance - participant.paid).toFixed(2)))} ${
        participant.currency
      } ~ ${formatNumber(participant.balanceInVND)} VND`
    : `${formatNumber(participant.balance - participant.paidInVND)} ${participant.currency}`;

// Who shares a payment and how many portions ("phần") each takes (default 1)
const PaymentParticipantsPicker = ({ participants, selected, portions, amountInVND, onChange }) => {
  const countOf = (name) => portions[name] ?? 1;
  const total = selected.reduce((sum, name) => sum + countOf(name), 0);
  const perPortion = total > 0 ? (Number(amountInVND) || 0) / total : 0;
  const showShares = perPortion > 0;

  const toggle = (name, checked) =>
    onChange({
      participants: checked ? [...selected, name] : selected.filter((item) => item !== name),
      portions,
    });

  const setCount = (name, count) => onChange({ participants: selected, portions: { ...portions, [name]: count } });

  const selectAll = (checked) =>
    onChange({ participants: checked ? participants.map((p) => p.name) : [], portions });

  return (
    <div className="border border-base-300 p-2 rounded-xl">
      <div className="flex items-baseline justify-between gap-2 pb-1">
        <h2 className="font-semibold textarea-md">Người tham gia</h2>
        {total > 0 && <span className="text-xs text-base-content/60">Tổng {formatCount(total)} phần</span>}
      </div>
      <label className="label pb-1">
        <input
          type="checkbox"
          checked={participants.length > 0 && selected.length === participants.length}
          onChange={(e) => selectAll(e.target.checked)}
          className="checkbox checkbox-lg"
        />
        Chọn tất cả người tham gia
      </label>
      <p className="pb-2 text-xs text-base-content/60">
        Ai dùng nhiều hơn thì bấm + để tăng số phần (mặc định 1 phần).
      </p>
      <ul className="flex max-h-60 flex-col gap-1 overflow-y-auto">
        {participants.map((participant) => {
          const isSelected = selected.includes(participant.name);
          const count = countOf(participant.name);
          return (
            <li key={participant.name} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-lg"
                checked={isSelected}
                onChange={(e) => toggle(participant.name, e.target.checked)}
                aria-label={`Chia cho ${participant.name}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate">{participant.name}</p>
                <p className="text-xs text-base-content/60">
                  {isSelected && showShares
                    ? `Trả ${formatNumber(perPortion * count)} VND`
                    : remainingText(participant)}
                </p>
              </div>
              {isSelected && (
                <div className="join shrink-0" role="group" aria-label={`Số phần của ${participant.name}`}>
                  <button
                    type="button"
                    className="btn btn-sm join-item"
                    onClick={() => setCount(participant.name, stepDown(count))}
                    disabled={count <= 0.5}
                    aria-label={`Bớt phần của ${participant.name}`}
                  >
                    −
                  </button>
                  <span className="join-item flex min-w-10 items-center justify-center border border-base-300 px-1 text-sm font-semibold">
                    {formatCount(count)}
                  </span>
                  <button
                    type="button"
                    className="btn btn-sm join-item"
                    onClick={() => setCount(participant.name, stepUp(count))}
                    aria-label={`Thêm phần cho ${participant.name}`}
                  >
                    +
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PaymentParticipantsPicker;
