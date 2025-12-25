import { useDispatch, useSelector } from "react-redux";
import { deletePaymentInExpense } from "../../store/expense";
import { useParams } from "react-router-dom";

const DeletePaymentModal = ({ ref, paymentId }) => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.expense);
  const { calculatorId } = useParams();
  const { rates } = useSelector((state) => state.currencyRate);
  const handleDeletePayment = () => {
    dispatch(deletePaymentInExpense(calculatorId, paymentId, { rates: rates }));
    ref.current?.close();
  };
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Xóa chi tiêu</h3>
        <p className="py-4">Bạn có muốn xóa chi tiêu này không?</p>
        {error && <p className="text-error-content">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button className="btn btn-error" onClick={handleDeletePayment}>
            {loading ? "Đang xóa..." : "Xóa"}
          </button>
          <form method="dialog">
            <button className="btn">Thôi không xóa</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeletePaymentModal;
