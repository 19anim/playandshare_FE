import { useMemo } from "react";
import { GoPencil } from "react-icons/go";
import { useRef } from "react";
import EditCalculatorParticipantModal from "../Modal/editCalculatorParticipantModal.component";
import DeleteCalculatorParticipantModal from "../Modal/deleteCalculatorParticipantModal.component";

const Participant = ({ name, balance, paid, currency, id }) => {
  const editUserRef = useRef(null);
  const deleteUserRef = useRef(null);
  const finalBalance = useMemo(() => {
    return parseFloat((balance - paid).toFixed(2));
  }, [balance, paid]);

  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <li className="list-row items-center">
        <div>
          <div>{name}</div>
          <div className="text-xs uppercase">
            Tiền đã đóng:{" "}
            <strong className="dark:text-success text-success-content">{`${formatNumber(
              balance
            )} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            Tiền đã chi:{" "}
            <strong className="dark:text-error text-error-content">{`${formatNumber(
              paid
            )} ${currency}`}</strong>
          </div>
          <div className="text-xs uppercase">
            Số dư:{" "}
            <strong
              className={
                finalBalance >= 0
                  ? "dark:text-success text-success-content"
                  : "dark:text-error text-error-content"
              }
            >{`${formatNumber(finalBalance)} ${currency}`}</strong>
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
