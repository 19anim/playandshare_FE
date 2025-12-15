import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { updatedExpense } from "../../store/expense";
import { useSelector, useDispatch } from "react-redux";

const DeleteCalculatorParticipantModal = ({ ref, id }) => {
  const dispatch = useDispatch();
  const { calculatorId } = useParams();
  const { error, loading, expenses } = useSelector((state) => state.expense);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentCalculator = expenses.find((item) => item._id === calculatorId);

  const handleDeleteParticipant = () => {
    setIsDeleting(true);
    const tempData = JSON.parse(JSON.stringify(currentCalculator));
    tempData.participants = tempData.participants.filter((part) => part._id !== id);
    dispatch(updatedExpense(calculatorId, tempData));
  };

  useEffect(() => {
    if (!loading && isDeleting && !error) {
      ref.current?.close();
      setIsDeleting(false);
    }
  }, [loading, isDeleting, error, ref]);

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Xóa nạn nhân này?</h3>
        <p className="py-4">Xóa người này là mất 1 người chia tiền ó nha 🙄</p>
        {error && <p className="text-error-content">{error}</p>}
        <div className="flex gap-2 justify-end">
          <button
            className="btn btn-error"
            disabled={loading ? "disabled" : false}
            onClick={handleDeleteParticipant}
          >
            {isDeleting ? "Đang xóa..." : "Kệ luôn"}
          </button>
          <form method="dialog">
            <button className="btn">Thôi không xóa</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteCalculatorParticipantModal;
