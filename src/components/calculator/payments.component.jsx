import { LuCirclePlus } from "react-icons/lu";
import { IoExpand } from "react-icons/io5";
import { useRef, useState } from "react";
import Payment from "./payment.component";
import AddPaymentModal from "../Modal/addPaymentModal.component";

const Payments = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const MAXIMUM_PAYMENTS_PER_PAGE = 4;
  const addPaymentRef = useRef(null);
  const { payments, participants } = data;

  return (
    <section className="bg-gray-200 rounded-box p-2 lg:p-4 flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <button
          className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Thêm khoản chi"
          onClick={() => addPaymentRef.current.showModal()}
        >
          <LuCirclePlus />
        </button>
        <button
          className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Xem tất cả người tham gia"
        >
          <IoExpand />
        </button>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Thông tin chi tiết</li>
        {payments.length === 0 ? (
          <li className="p-4 text-center text-gray-500">Chưa có khoản chi nào</li>
        ) : (
          payments
            .slice(
              currentPage * MAXIMUM_PAYMENTS_PER_PAGE - MAXIMUM_PAYMENTS_PER_PAGE,
              currentPage * MAXIMUM_PAYMENTS_PER_PAGE
            )
            .map((payment, index) => (
              <Payment
                key={index}
                paymentType={payment.title}
                paymentDes={payment.description}
                paymentAmount={payment.amount}
                currency={payment.currency}
                paymentParticipant={payment.participants.join(", ")}
              />
            ))
        )}
      </ul>
      <div className="join">
        {Array.from(
          { length: Math.ceil(payments.length / MAXIMUM_PAYMENTS_PER_PAGE) },
          (_, i) => i + 1
        ).map((pageNum) => (
          <button
            key={pageNum}
            className={`join-item btn ${currentPage === pageNum ? "btn-active" : ""}`}
            onClick={() => setCurrentPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
      </div>
      <AddPaymentModal ref={addPaymentRef} participants={participants} />
    </section>
  );
};

export default Payments;
