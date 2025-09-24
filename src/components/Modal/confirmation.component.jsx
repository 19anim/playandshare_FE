const ConfirmationModal = ({
  ref,
  isDeleting,
  title,
  message,
  agreeMessage,
  disagreeMessage,
  onAgree,
}) => {
  const disagreeHandler = () => {
    ref.current.close();
  };
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-error"
            disabled={isDeleting ? "disabled" : false}
            onClick={onAgree}
          >
            {isDeleting ? "Đang xóa..." : agreeMessage}
          </button>
          <button className="btn" onClick={disagreeHandler}>
            {disagreeMessage}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationModal;
