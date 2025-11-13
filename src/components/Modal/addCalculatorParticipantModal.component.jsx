import { IoMdCheckmark } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const AddCalculatorParticipantModal = ({ ref }) => {
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
              <input type="text" className="grow" placeholder="Nguyễn Văn A" />
            </label>
          </div>
          <div>
            <label className="input focus:outline-none focus-within:outline-none">
              Số tiền đóng vào:
              <input type="number" className="grow" placeholder="1000000" />
            </label>
          </div>
          <div>
            <label className="input focus:outline-none focus-within:outline-none">
              Đơn vị tiền tệ:
              <input type="text" className="grow" placeholder="VND" list="currency" />
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
        <div className="flex flex-row gap-2 self-end">
          <button className="btn btn-success mt-4 flex gap-2 hover:scale-105 transition-all duration-300">
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

export default AddCalculatorParticipantModal;
