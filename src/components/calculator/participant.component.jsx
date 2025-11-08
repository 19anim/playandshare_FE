import { useMemo } from "react";
import { GoPencil } from "react-icons/go";

const Participant = ({ name, moneyPaid, moneySpent, currency }) => {
  const balance = useMemo(() => {
    return parseInt(moneyPaid) - parseInt(moneySpent);
  }, [moneyPaid, moneySpent]);

  return (
    <li className="list-row items-center">
      <div>
        <div>{name}</div>
        <div className="text-xs uppercase">
          Tiền đã đóng:{" "}
          <strong className="text-success-content">{`${moneyPaid} ${currency}`}</strong>
        </div>
        <div className="text-xs uppercase">
          Tiền đã chi: <strong className="text-error-content">{`${moneySpent} ${currency}`}</strong>
        </div>
        <div className="text-xs uppercase">
          Số dư:{" "}
          <strong className={`text-${balance >= 0 ? "success" : "error"}-content`}>{`${
            parseInt(moneyPaid) - parseInt(moneySpent)
          } ${currency}`}</strong>
        </div>
      </div>
      <div className="flex gap-1 justify-end">
        <button
          className="btn btn-square btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Chỉnh sửa thông tin người tham gia"
        >
          <GoPencil />
        </button>
        <button
          className="btn btn-square btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Xóa người tham gia"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
};

export default Participant;
