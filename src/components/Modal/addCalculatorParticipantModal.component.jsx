import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { updatedExpense } from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";

const AddCalculatorParticipantModal = ({ ref }) => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { expenses } = useSelector((state) => state.expense);
  const currentCalculator = expenses.find((item) => item._id === calculatorId);

  const currencyOptions = ["VND", "USD", "EUR", "YEN", "WON"];
  const [participantData, setParticipantData] = useState({
    name: "",
    balance: 0,
    currency: "VND",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipantData((prev) => ({
      ...prev,
      [name]: name === "balance" ? Number(value) : value,
    }));
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
    dispatch(updatedExpense(calculatorId, tempData));
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
      <div className="modal-box flex flex-col w-auto">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Thêm người chia tiền!</h3>
        <div className="flex flex-col gap-1 pt-2">
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
                type="number"
                className="grow"
                placeholder="1000000"
                value={participantData.balance}
              />
            </label>
          </div>
          <div>
            <label className="input focus:outline-none focus-within:outline-none">
              Đơn vị tiền tệ:
              <input
                onChange={handleChange}
                name="currency"
                type="text"
                className="grow"
                placeholder="VND"
                list="currency"
                value={participantData.currency}
              />
              <datalist id="currency">
                <option value="VND"></option>
                <option value="USD"></option>
                <option value="EUR"></option>
                <option value="YEN"></option>
                <option value="WON"></option>
              </datalist>
            </label>
          </div>
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
