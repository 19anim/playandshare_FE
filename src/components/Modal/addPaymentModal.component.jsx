import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPaymentToExpense } from "../../store/expense";
import { useParams } from "react-router-dom";

const AddPaymentModal = ({ ref, participants }) => {
  const currencyOptions = ["VND", "USD", "EUR", "THB", "JPY", "KRW", "GBP"];
  const expenseID = useParams().calculatorId;
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState({
    name: "",
    description: "",
    amount: "",
    currency: "VND",
    participants: [],
  });
  const [updatedParticipants, setUpdatedParticipants] = useState(participants);
  const [error, setError] = useState("");
  const { rates } = useSelector((state) => state.currencyRate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setPaymentData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setPaymentData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentData.name.trim() === "") {
      setError("Tên khoản chi không được để trống");
      return;
    }

    if (paymentData.amount.trim() === "") {
      setError("Số tiền không được để trống");
      return;
    }

    if (paymentData.participants.length === 0) {
      setError("Vui lòng chọn ít nhất một người tham gia");
      return;
    }

    setError("");

    const equalShare = exchangeToVND / paymentData.participants.length;

    const updatedParts = updatedParticipants.map((part) => {
      if (paymentData.participants.includes(part.name)) {
        return {
          ...part,
          paid:
            part.currency === "VND"
              ? part.paid + equalShare
              : part.paid +
                equalShare / rates.find((rate) => rate.currency === part.currency).compareToVND,
          paidInVND: part.paidInVND + equalShare,
        };
      }
      return part;
    });

    setUpdatedParticipants(updatedParts);
    dispatch(
      addPaymentToExpense(expenseID, {
        payment: paymentData,
        updatedParticipants: updatedParts,
      })
    );
    ref.current.close();
  };

  const handleCancel = () => {
    setPaymentData({
      name: "",
      description: "",
      amount: "",
      currency: "VND",
      participants: [],
    });
    setError("");
  };

  const handleCheckboxChange = (e, participant) => {
    if (e.target.checked) {
      setPaymentData((prev) => ({
        ...prev,
        participants: [...prev.participants, participant.name],
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        participants: prev.participants.filter((name) => name !== participant.name),
      }));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allParticipantNames = participants.map((participant) => participant.name);
      setPaymentData((prev) => ({
        ...prev,
        participants: allParticipantNames,
      }));
    } else {
      setPaymentData((prev) => ({
        ...prev,
        participants: [],
      }));
    }
  };

  const exchangeToVND = useMemo(() => {
    let result = 0;
    if (paymentData.currency === "VND") {
      return paymentData.amount;
    }
    const selectedRate = rates.filter((rate) => rate.currency === paymentData.currency);
    result = selectedRate[0].compareToVND * paymentData.amount;
    return result;
  }, [paymentData.currency, paymentData.amount]);

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box flex flex-col w-[350px] md:w-[32rem] overflow-visible">
        <h3 className="font-bold text-lg">Thêm mục chi tiêu</h3>
        <div className="flex flex-col gap-1 pt-2 overflow-visible">
          <div>
            <label className="input w-full focus:outline-none focus-within:outline-none">
              Tên khoản chi:
              <input name="name" type="text" onChange={handleChange} value={paymentData.name} />
            </label>
          </div>
          <textarea
            className="textarea w-full focus:outline-none focus-within:outline-none"
            name="description"
            placeholder="Mô tả khoản chi:"
            onChange={handleChange}
            value={paymentData.description}
          ></textarea>
          <div className="flex flex-row gap-2">
            <div className="grow">
              <label className="input w-full focus:outline-none focus-within:outline-none">
                Số tiền:
                <input
                  name="amount"
                  type="text"
                  inputMode="decimal"
                  onChange={handleChange}
                  value={paymentData.amount}
                />
              </label>
            </div>
            <div className="min-w-[128px] dropdown dropdown-end overflow-visible">
              <div tabIndex="0" role="button" className="btn rounded-field w-full">
                {paymentData.currency}
                <i className="fa-solid fa-caret-down ml-2"></i>
              </div>
              <ul
                tabIndex="-1"
                className="menu dropdown-content bg-gradient-to-b from-base-100 to-base-200 rounded-lg z-[9999] mt-2 w-32 p-3 shadow-lg border border-base-300 overflow-y-auto"
              >
                {currencyOptions.map((currency) => (
                  <li
                    className="text-center cursor-pointer font-semibold hover:bg-primary hover:text-white rounded-md px-4 py-2"
                    key={currency}
                    onClick={() => {
                      document.activeElement.blur();
                      return setPaymentData((prev) => ({ ...prev, currency: currency }));
                    }}
                  >
                    {currency}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            {paymentData.currency !== "VND" && (
              <input
                type="text"
                placeholder={`Số tiền quy đổi sang VND: ${exchangeToVND}`}
                className="input w-full"
                disabled
              />
            )}
          </div>
          <div className="border border-base-300 p-2 rounded-xl">
            <h2 className="font-semibold textarea-md pb-1">Người tham gia</h2>
            <div>
              <label className="label">
                <input
                  type="checkbox"
                  checked={paymentData.participants.length === participants.length}
                  onChange={handleSelectAll}
                  className="checkbox checkbox-lg"
                />
                Chọn tất cả người tham gia
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 max-h-30 overflow-scroll md:max-h-60">
              {participants.map((participant) => (
                <div key={participant.name} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-lg"
                    checked={paymentData.participants.includes(participant.name)}
                    onChange={(e) => handleCheckboxChange(e, participant)}
                  />
                  <div>
                    <p>{participant.name}</p>
                    {participant.currency !== "VND" ? (
                      <p>
                        {participant.balance} {participant.currency} ~ {participant.balanceInVND}{" "}
                        VND
                      </p>
                    ) : (
                      <p>
                        {participant.balance} {participant.currency}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className="modal-action">
          <button onClick={handleSubmit} className="btn bg-success">
            Tạo chi tiêu
          </button>
          <form method="dialog">
            <button onClick={handleCancel} className="btn bg-error">
              Hủy bỏ
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddPaymentModal;
