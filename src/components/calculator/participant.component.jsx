import { useMemo } from "react";
import { GoPencil } from "react-icons/go";
import { useRef } from "react";
import EditCalculatorParticipantModal from "../Modal/editCalculatorParticipantModal.component";
import DeleteCalculatorParticipantModal from "../Modal/deleteCalculatorParticipantModal.component";
import { describeBalance } from "../../helper/expenseTotals";

const Participant = ({ name, balance, paid, currency, id, selected, onToggleSelected }) => {
  const editUserRef = useRef(null);
  const deleteUserRef = useRef(null);
  const finalBalance = useMemo(() => describeBalance(balance - paid), [balance, paid]);

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <li className={`list-row items-center ${selected ? "bg-primary/5" : ""}`}>
        <input
          type="checkbox"
          className="checkbox checkbox-primary checkbox-sm"
          checked={selected}
          onChange={onToggleSelected}
          aria-label={`Chọn ${name} để tính tổng`}
        />
        <div>
          <div>{name}</div>
          <div className="text-xs uppercase">
            Tiền đã đóng:{" "}
            <strong className="whitespace-nowrap text-success">{`${formatNumber(
              balance
            )} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            Tiền đã chi:{" "}
            <strong className="whitespace-nowrap text-error">{`${formatNumber(
              paid
            )} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            {finalBalance.label}:{" "}
            <strong
              className={"whitespace-nowrap " + (finalBalance.isDue ? "text-error" : "text-success")}
            >{`${formatNumber(finalBalance.amount)} ${currency}`}</strong>
          </div>
        </div>
        <div className="flex gap-1 justify-end">
          <button
            className="btn btn-square btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
            title="Chỉnh sửa thông tin người tham gia"
            onClick={() => {
              editUserRef.current.showModal();
            }}
          >
            <GoPencil />
          </button>
          <button
            className="btn btn-square btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
            title="Xóa người tham gia"
            onClick={() => {
              deleteUserRef.current.showModal();
            }}
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </li>
      <EditCalculatorParticipantModal ref={editUserRef} id={id} />
      <DeleteCalculatorParticipantModal ref={deleteUserRef} id={id} />
    </>
  );
};

export default Participant;
