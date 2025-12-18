import { useState } from "react";

const AddPaymentModal = ({ ref, participants }) => {
  const currencyOptions = ["VND", "USD", "EUR", "THB", "JPY", "KRW", "GBP"];

  const [paymentData, setPaymentData] = useState({
    name: "",
    description: "",
    amount: "",
    currency: "VND",
    participants: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "amount") {
      // Only allow numbers and decimal point
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
                Số tiền chi:
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
        </div>
        <div className="modal-action">
          <button
            onClick={() => {
              console.log(paymentData);
            }}
            className="btn bg-success"
          >
            Tạo chi tiêu
          </button>
          <form method="dialog">
            <button className="btn bg-error">Hủy bỏ</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default AddPaymentModal;
