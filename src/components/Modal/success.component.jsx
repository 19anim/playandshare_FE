import SuccessSign from "../../assets/modal/success_sign.png";
import { Link } from "react-router-dom";

const SuccessModal = ({ ref, modalMessage, modalNavigationLink, modalNavigationText }) => {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <div className="flex flex-col items-center gap-5">
          <img className="max-w-24" src={SuccessSign} alt="" />
          <h3 className="font-bold text-lg">{modalMessage}</h3>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">
              <Link to={modalNavigationLink}>{modalNavigationText}</Link>
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default SuccessModal;
