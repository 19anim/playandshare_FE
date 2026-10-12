import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { updatedExpense } from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";

const isNameTaken = (participants, name, exceptId) =>
  participants.some(
    (part) => part._id !== exceptId && part.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

const EditCalculatorParticipantModal = ({ ref, id }) => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { expenses } = useSelector((state) => state.expense);
  const { rates } = useSelector((state) => state.currencyRate);
  const currentCalculator = expenses.find((item) => item._id === calculatorId);
  const currentParticipant = currentCalculator?.participants?.find((part) => part._id === id);

  const currencyOptions = ["VND", "USD", "EUR", "THB", "JPY", "KRW", "GBP"];
  const [participantData, setParticipantData] = useState(currentParticipant);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setParticipantData(currentParticipant);
  }, [currentParticipant]);

  const formatNumber = (num) => {
    return parseFloat(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };
  const exchangeToVND = useMemo(() => {
    if (participantData.currency === "VND") return Number(participantData.balance) || 0;

    const selectedRate = rates.find((rate) => rate.currency === participantData.currency);
    return selectedRate ? selectedRate.compareToVND * participantData.balance : 0;
  }, [participantData.currency, participantData.balance, rates]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "balance") {
      const numericValue = value.replace(/[^0-9.]/g, "");
      setParticipantData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setParticipantData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditParticipant = () => {
    if (participantData.name.trim() === "") {
      setErrorMessage("Tên người tham gia không được để trống");
      return;
    } else if (isNameTaken(currentCalculator.participants, participantData.name, id)) {
      setErrorMessage("Tên này đã có trong danh sách");
      return;
    } else if (isNaN(participantData.balance) || participantData.balance < 0) {
      setErrorMessage("Số tiền đóng vào không hợp lệ");
      return;
    } else if (!currencyOptions.includes(participantData.currency)) {
      setErrorMessage("Đơn vị tiền tệ không hợp lệ");
      return;
    }

    setErrorMessage("");
    const selectedRate =
      participantData.currency === "VND"
        ? { compareToVND: 1 }
        : rates.find((rate) => rate.currency === participantData.currency);

    if (!selectedRate) {
      setErrorMessage("Không tìm thấy tỷ giá cho đơn vị tiền tệ đã chọn");
      return;
    }

    const paidInVND = Number(participantData.paidInVND) || 0;
    const updatedParticipant = {
      ...participantData,
      balanceInVND: exchangeToVND,
      paidInVND,
      paid: paidInVND / selectedRate.compareToVND,
    };
    const tempData = JSON.parse(JSON.stringify(currentCalculator));
    const participantIndex = tempData.participants.findIndex((part) => part._id === id);
    tempData.participants[participantIndex] = updatedParticipant;
    dispatch(
      updatedExpense(calculatorId, {
        updatedData: tempData,
        rates,
        Type: "editParticipant",
      })
    );
    ref.current.close();
  };

  const handleClose = () => {
    setParticipantData(currentParticipant);
    setErrorMessage("");
    ref.current.close();
  };

  return (
    <dialog ref={ref} className="modal duration-0">
      <div className="modal-box flex flex-col w-auto overflow-visible">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Chỉnh sửa người chia tiền!</h3>
        <div className="flex flex-col gap-1 pt-2 overflow-visible">
          <div>
            <label className="input focus:outline-none focus-within:outline-none">
              Tên người tham gia:
              <input
                onChange={handleChange}
                name="name"
                type="text"
                className="grow"
                placeholder="Nguyễn Văn A"
                value={participantData.name}
              />
            </label>
          </div>
          <div>
            <label className="input focus:outline-none focus-within:outline-none">
              Số tiền đóng vào:
              <input
                onChange={handleChange}
                name="balance"
                type="text"
                inputMode="decimal"
                className="grow"
                placeholder="1000000"
                value={formatNumber(participantData.balance)}
              />
            </label>
          </div>{" "}
          <div className="dropdown dropdown-end w-full overflow-visible">
            <div tabIndex="0" role="button" className="btn rounded-field w-full">
              Đơn vị tiền tệ: {participantData.currency}{" "}
              <i className="fa-solid fa-caret-down ml-2"></i>
            </div>
            <ul
              tabIndex="-1"
              className="menu dropdown-content bg-gradient-to-b from-base-100 to-base-200 rounded-lg z-[9999] mt-2 w-32 p-3 shadow-lg border border-base-300 overflow-y-auto"
            >
              {currencyOptions.map((currency) => (
                <li
                  className="text-center font-semibold hover:bg-primary hover:text-white rounded-md px-4 py-2"
                  key={currency}
                  onClick={() => {
                    document.activeElement.blur();
                    setParticipantData((prev) => ({ ...prev, currency: currency }));
                  }}
                >
                  {currency}
                </li>
              ))}
            </ul>
          </div>
          {participantData.currency !== "VND" && (
            <input
              type="text"
              placeholder={`Số tiền quy đổi sang VND: ${formatNumber(exchangeToVND)}`}
              className="input"
              disabled
            />
          )}
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <div className="flex flex-row gap-2 self-end">
          <button
            onClick={handleEditParticipant}
            className="btn btn-success mt-4 flex gap-2 hover:scale-105 transition-all duration-300"
          >
            <IoMdCheckmark className="textarea-md" />
          </button>
          <button
            onClick={handleClose}
            className="btn btn-error mt-4 flex gap-2 hover:scale-105 transition-all duration-300"
          >
            <IoMdClose className="textarea-md" />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditCalculatorParticipantModal;
