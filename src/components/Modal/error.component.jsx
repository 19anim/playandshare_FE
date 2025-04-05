import ErrorSign from "../../assets/modal/error_sign.png";

const ErrorModal = ({ ref, modalMessage, modalErrorHandlerText }) => {
  const errorHandler = () => {
    ref.current.close();
  };
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <div className="flex flex-col items-center gap-5">
          <img className="max-w-24" src={ErrorSign} alt="" />
          <h3 className="font-bold text-lg">{modalMessage}</h3>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button onClick={errorHandler} className="btn">
              {modalErrorHandlerText}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ErrorModal;
