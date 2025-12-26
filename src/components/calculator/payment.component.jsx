import { MdOutlinePageview } from "react-icons/md";

const Payment = ({
  paymentType,
  paymentDes,
  paymentAmount,
  currency,
  paymentParticipant,
  handleEditPayment,
  handleDeletePayment,
}) => {
  const formatNumber = (num) => {
    return parseFloat(num).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <li className="list-row">
      <div className="list-col-grow">
        <div>{paymentType}</div>
        <div className="font-semibold opacity-60">{paymentDes}</div>
        <div className="dark:text-error text-error-content font-semibold">
          {formatNumber(paymentAmount)} {currency}
        </div>
        <div className="max-w-[200px] sm:max-w-[300px] truncate" title={paymentParticipant}>
          {paymentParticipant}
        </div>
      </div>
      <button
        className="btn btn-square text-xl btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
        title="Xem chi tiết khoản chi"
        onClick={handleEditPayment}
      >
        <MdOutlinePageview />
      </button>
      <button
        className="btn btn-square btn-ghost hover:scale-110 hover:animate-wiggle transition-all duration-300"
        title="Xóa khoản chi"
        onClick={handleDeletePayment}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </li>
  );
};

export default Payment;
