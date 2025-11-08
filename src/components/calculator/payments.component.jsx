import { LuCirclePlus } from "react-icons/lu";
import { IoExpand } from "react-icons/io5";
import { useState } from "react";
import Payment from "./payment.component";

const Payments = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const MAXIMUM_PAYMENTS_PER_PAGE = 4;
  const tempPayments = [
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100000",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100001",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100002",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100003",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100004",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100005",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100006",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100007",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100008",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100009",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100010",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100011",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100012",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
    {
      paymentType: "Ăn uống",
      paymentDes: "Ăn trưa ở Long Hải",
      paymentAmount: "100013",
      currency: "VND",
      paymentParticipant: "Nguyễn Phi Tuấn Ân, Nguyễn Kiều Minh Thư",
    },
  ];
  return (
    <section className="bg-gray-200 rounded-box p-2 lg:p-4 flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <button
          className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Thêm khoản chi"
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
        {tempPayments
          .slice(
            currentPage * MAXIMUM_PAYMENTS_PER_PAGE - MAXIMUM_PAYMENTS_PER_PAGE,
            currentPage * MAXIMUM_PAYMENTS_PER_PAGE
          )
          .map((payment, index) => (
            <Payment
              key={index}
              paymentType={payment.paymentType}
              paymentDes={payment.paymentDes}
              paymentAmount={payment.paymentAmount}
              currency={payment.currency}
              paymentParticipant={payment.paymentParticipant}
            />
          ))}
      </ul>
      <div className="join">
        {Array.from(
          { length: Math.ceil(tempPayments.length / MAXIMUM_PAYMENTS_PER_PAGE) },
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
    </section>
  );
};

export default Payments;
