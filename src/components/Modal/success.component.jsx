import SuccessSign from "../../assets/modal/success_sign.png";
import { Link } from "react-router-dom";

const SuccessModal = ({
  ref,
  modalMessage,
  modalNavigationLink,
  modalNavigationText,
  closeModalFunction = false,
  additionalFunction = null,
}) => {
  const modalCloseHandler = () => {
    additionalFunction && additionalFunction(false);
    ref.current.close();
  };
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <div className="flex flex-col items-center gap-5">
          <img className="max-w-24" src={SuccessSign} alt="" />
          <h3 className="font-bold text-lg">{modalMessage}</h3>
        </div>
        <div className="modal-action">
          {closeModalFunction ? (
            <button onClick={modalCloseHandler} className="btn btn-primary">
              Đóng
            </button>
          ) : (
            <Link to={modalNavigationLink} className="btn btn-primary">
              {modalNavigationText}
            </Link>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default SuccessModal;
