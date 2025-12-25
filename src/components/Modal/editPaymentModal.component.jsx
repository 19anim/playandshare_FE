// LOGIC FOR EDIT PAYMENT MODAL IS WRONG, NEED TO STORE THE OLD PAYMENT DATA BEFORE EDITING TO CALCULATE THE DIFFERENCE AND UPDATE PARTICIPANTS' PAID AMOUNTS ACCORDINGLY
import { useState, useMemo, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePaymentInExpense } from "../../store/expense";
import { useParams } from "react-router-dom";

const EditPaymentModal = ({ ref, participants, payment }) => {
  const currencyOptions = ["VND", "USD", "EUR", "THB", "JPY", "KRW", "GBP"];
  const expenseID = useParams().calculatorId;
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState({
    title: "",
    description: "",
    amount: "",
    currency: "VND",
    participants: [],
  });
  const [originalPaymentData, setOriginalPaymentData] = useState(null);
  const [updatedParticipants, setUpdatedParticipants] = useState(participants);
  const [error, setError] = useState("");
  const { rates } = useSelector((state) => state.currencyRate);

  useEffect(() => {
    setUpdatedParticipants(participants);
  }, [participants]);

  useEffect(() => {
    if (payment) {
      const paymentDataObj = {
        title: payment.title,
        description: payment.description,
        amount: String(payment.amount),
        currency: payment.currency,
        participants: payment.participants,
      };
      setPaymentData(paymentDataObj);
      setOriginalPaymentData({ ...paymentDataObj });
    }
  }, [payment]);

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
    if (paymentData.title.trim() === "") {
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

    const oldExchangeToVND =
      originalPaymentData.currency === "VND"
        ? parseFloat(originalPaymentData.amount)
        : (rates.find((rate) => rate.currency === originalPaymentData.currency)?.compareToVND ||
            1) * parseFloat(originalPaymentData.amount);

    const newExchangeToVND = exchangeToVND;

    // Calculate the difference in VND
    const amountDifference = newExchangeToVND - oldExchangeToVND;

    // Get the old participants
    const oldParticipants = originalPaymentData.participants;

    // Calculate shares
    const oldSharePerPerson = oldExchangeToVND / oldParticipants.length;
    const newSharePerPerson = newExchangeToVND / paymentData.participants.length;

    const updatedParts = updatedParticipants.map((part) => {
      const wasInOldPayment = oldParticipants.includes(part.name);
      const isInNewPayment = paymentData.participants.includes(part.name);

      if (wasInOldPayment && !isInNewPayment) {
        // Participant was removed from payment - deduct their share
        return {
          ...part,
          paid:
            part.currency === "VND"
              ? part.paid - oldSharePerPerson
              : part.paid -
                (oldSharePerPerson /
                  rates.find((rate) => rate.currency === part.currency)?.compareToVND || 1),
          paidInVND: part.paidInVND - oldSharePerPerson,
        };
      } else if (!wasInOldPayment && isInNewPayment) {
        // Participant was added to payment - add their new share
        return {
          ...part,
          paid:
            part.currency === "VND"
              ? part.paid + newSharePerPerson
              : part.paid +
                (newSharePerPerson /
                  rates.find((rate) => rate.currency === part.currency)?.compareToVND || 1),
          paidInVND: part.paidInVND + newSharePerPerson,
        };
      } else if (wasInOldPayment && isInNewPayment) {
        // Participant was in both - update with the difference
        return {
          ...part,
          paid:
            part.currency === "VND"
              ? part.paid - oldSharePerPerson + newSharePerPerson
              : part.paid -
                (oldSharePerPerson /
                  rates.find((rate) => rate.currency === part.currency)?.compareToVND || 1) +
                (newSharePerPerson /
                  rates.find((rate) => rate.currency === part.currency)?.compareToVND || 1),
          paidInVND: part.paidInVND - oldSharePerPerson + newSharePerPerson,
        };
      }

      return part;
    });

    setUpdatedParticipants(updatedParts);
    dispatch(
      updatePaymentInExpense(expenseID, payment._id, {
        payment: paymentData,
        updatedParticipants: updatedParts,
      })
    );
    setPaymentData({
      title: "",
      description: "",
      amount: "",
      currency: "VND",
      participants: [],
    });
    setError("");
    ref.current.close();
  };

  const handleCancel = () => {
    // setPaymentData({
    //   title: "",
    //   description: "",
    //   amount: "",
    //   currency: "VND",
    //   participants: [],
    // });
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

  const formatNumber = (num) => {
    return parseFloat(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
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
        <h3 className="font-bold text-lg">Chỉnh sửa mục chi tiêu</h3>
        <div className="flex flex-col gap-1 pt-2 overflow-visible">
          <div>
            <label className="input w-full focus:outline-none focus-within:outline-none">
              Tên khoản chi:
              <input name="title" type="text" onChange={handleChange} value={paymentData.title} />
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
                  value={formatNumber(paymentData.amount)}
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
                placeholder={`Số tiền quy đổi sang VND: ${formatNumber(exchangeToVND)}`}
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
                        {formatNumber(
                          parseFloat((participant.balance - participant.paid).toFixed(2))
                        )}{" "}
                        {participant.currency} ~ {formatNumber(participant.balanceInVND)} VND
                      </p>
                    ) : (
                      <p>
                        {formatNumber(participant.balance - participant.paidInVND)}{" "}
                        {participant.currency}
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
            Cập nhật chi tiêu
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

export default EditPaymentModal;
