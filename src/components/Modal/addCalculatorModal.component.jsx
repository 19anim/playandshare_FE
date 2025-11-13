import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";

const AddCalculatorModal = ({ ref, calculatorData, setCalculatorData, setCalculators }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleAdd = () => {
    if (calculatorData.title.trim() === "") {
      console.log("DONE");
      setErrorMessage("Tên chi tiêu không được để trống");
    } else if (
      calculatorData.participants.length === 0 ||
      (calculatorData.participants.length === 1 && calculatorData.participants[0].trim() === "")
    ) {
      setErrorMessage("Vui lòng thêm ít nhất một người tham gia");
    } else {
      setErrorMessage("");
      setCalculators((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          title: calculatorData.title,
          participants: calculatorData.participants.join(", "),
          balance: "0 VND",
        },
      ]);
      ref.current.close();
    }
  };
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box flex flex-col w-[320px] md:w-[500px]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">Thêm chi tiêu</h3>
        <div className="flex flex-col gap-1 pt-2">
          <div>
            <label
              onChange={(event) => {
                setErrorMessage("");
                setCalculatorData((prev) => ({ ...prev, title: event.target.value }));
              }}
              value={calculatorData.title}
              className="input focus:outline-none focus-within:outline-none w-full"
            >
              Tên chi tiêu:
              <input type="text" className="grow" placeholder="Du lịch Đà Lạt 11/2025" />
            </label>
          </div>
          <fieldset className="fieldset ">
            <legend className="fieldset-legend">Danh sách người tham gia</legend>
            <textarea
              className="textarea h-24 w-full focus:outline-none focus-within:outline-none"
              value={calculatorData.participants.join("\n")}
              onChange={(e) => {
                const participantsArray = e.target.value.split("\n");
                setCalculatorData((prev) => ({
                  ...prev,
                  participants: participantsArray,
                }));
              }}
            ></textarea>
            <div className="label">Xuống hàng để thêm người tham gia</div>
          </fieldset>
        </div>
        {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
        <div className="flex flex-row gap-2 self-end">
          <button
            onClick={handleAdd}
            className="btn btn-success mt-4 flex gap-2 hover:scale-105 transition-all duration-300"
          >
            <IoMdCheckmark className="textarea-md" />
          </button>
          <button
            onClick={() => ref.current.close()}
            className="btn btn-error mt-4 flex gap-2 hover:scale-105 transition-all duration-300"
          >
            <IoMdClose className="textarea-md" />
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddCalculatorModal;
