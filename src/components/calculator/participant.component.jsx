import { useMemo } from "react";
import { GoPencil } from "react-icons/go";
import { useRef } from "react";
import EditCalculatorParticipantModal from "../Modal/editCalculatorParticipantModal.component";

const Participant = ({ name, balance, paid, currency, id }) => {
  const editUserRef = useRef(null);
  const finalBalance = useMemo(() => {
    return parseInt(balance) - parseInt(paid);
  }, [balance, paid]);

  return (
    <>
      <li className="list-row items-center">
        <div>
          <div>{name}</div>
          <div className="text-xs uppercase">
            Tiền đã đóng:{" "}
            <strong className="text-success-content">{`${balance} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            Tiền đã chi: <strong className="text-error-content">{`${paid} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            Số dư:{" "}
            <strong
              className={`text-${balance >= 0 ? "success" : "error"}-content`}
            >{`${finalBalance} ${currency}`}</strong>
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
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </li>
      <EditCalculatorParticipantModal ref={editUserRef} id={id} />
    </>
  );
};

export default Participant;
