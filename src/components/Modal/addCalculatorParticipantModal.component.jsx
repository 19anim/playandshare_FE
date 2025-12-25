import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { updatedExpense } from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";

const AddCalculatorParticipantModal = ({ ref }) => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { expenses } = useSelector((state) => state.expense);
  const { rates } = useSelector((state) => state.currencyRate);
  const currentCalculator = expenses.find((item) => item._id === calculatorId);

  const currencyOptions = ["VND", "USD", "EUR", "THB", "JPY", "KRW", "GBP"];
  const [participantData, setParticipantData] = useState({
    name: "",
    balance: 0,
    balanceInVND: 0,
    currency: "VND",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const formatNumber = (num) => {
    return parseFloat(num || 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };
  const exchangeToVND = useMemo(() => {
    let result = 0;
    if (participantData.currency === "VND") {
      setParticipantData((prev) => ({
        ...prev,
        balanceInVND: participantData.balance,
      }));
      return result;
    }

    const selectedRate = rates.filter((rate) => rate.currency === participantData.currency);
    result = selectedRate[0].compareToVND * participantData.balance;
    setParticipantData((prev) => ({
      ...prev,
      balanceInVND: result,
    }));

    return result;
  }, [participantData.currency, participantData.balance]);

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

  const handleAddParticipant = () => {
    console.log(participantData);
    if (participantData.name.trim() === "") {
      setErrorMessage("Tên người tham gia không được để trống");
      return;
    } else if (isNaN(participantData.balance) || participantData.balance < 0) {
      setErrorMessage("Số tiền đóng vào không hợp lệ");
      return;
    } else if (!currencyOptions.includes(participantData.currency)) {
      setErrorMessage("Đơn vị tiền tệ không hợp lệ");
      return;
    }

    setErrorMessage("");
    const tempData = JSON.parse(JSON.stringify(currentCalculator));
    tempData.participants.push(participantData);
    dispatch(
      updatedExpense(calculatorId, {
        updatedData: tempData,
        Type: "addParticipant",
      })
    );
    setParticipantData({
      name: "",
      balance: 0,
      currency: "VND",
    });
    ref.current.close();
  };

  const handleClose = () => {
    setParticipantData({
      name: "",
      balance: 0,
      currency: "VND",
    });
    setErrorMessage("");
    ref.current.close();
  };

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box flex flex-col w-auto overflow-visible">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Thêm người chia tiền!</h3>
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
                  className="text-center font-semibold hover:bg-primary hover:text-white rounded-md px-4 py-2 cursor-pointer"
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
            onClick={handleAddParticipant}
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

export default AddCalculatorParticipantModal;
