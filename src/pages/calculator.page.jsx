import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import AddCalculatorModal from "../components/Modal/addCalculatorModal.component";
import ConfirmationModal from "../components/Modal/confirmation.component";
import ExpenseCard from "../components/calculator/expenseCard.component";
import { getCurrencyRates } from "../store/currenyRate";
import { fetchExpenses, removeMultiExpenses } from "../store/expense";

const ExpenseSkeleton = () => (
  <div className="card border border-base-300 bg-base-100">
    <div className="card-body gap-4">
      <div className="skeleton h-5 w-1/2"></div>
      <div className="skeleton h-10 w-full"></div>
      <div className="skeleton h-8 w-24 self-end"></div>
    </div>
  </div>
);

const Calculator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { expenses, loading } = useSelector((state) => state.expense);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedCalculators, setSelectedCalculators] = useState([]);
  const [newCalculator, setNewCalculator] = useState({ title: "", participants: [], createdBy: null });
  const addNewCalculatorModalRef = useRef(null);
  const confirmationModalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(getCurrencyRates());
  }, [dispatch]);

  const handleAddNewCalculator = () => {
    setNewCalculator((current) => ({
      ...current,
      participants: [{ name: user.displayName, balance: 0, paid: 0 }],
    }));
    addNewCalculatorModalRef.current.showModal();
  };

  const handleSingleSelect = (event, id) => {
    setSelectedCalculators((current) => (
      event.target.checked ? [...current, id] : current.filter((calculatorId) => calculatorId !== id)
    ));
  };

  const cancelSelection = () => {
    setSelectedCalculators([]);
    setMultiSelect(false);
  };

  const handleDeleteSelectedCalculators = () => {
    if (selectedCalculators.length > 0) {
      dispatch(removeMultiExpenses({ ids: selectedCalculators }));
      cancelSelection();
    }
    confirmationModalRef.current.close();
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] px-3 py-5 md:px-6">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-primary">TRIP BUDGET</p>
          <h1 className="text-3xl font-bold">Chia tiền du lịch</h1>
          <p className="mt-1 text-sm text-base-content/60">Theo dõi các khoản chi chung mà không làm mất vui.</p>
        </div>
        {!multiSelect ? (
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary rounded-full" onClick={handleAddNewCalculator}>
              <i className="fa-solid fa-plus"></i>
              Thêm mục chi
            </button>
            <button type="button" className="btn btn-secondary rounded-full" onClick={() => setMultiSelect(true)}>
              <i className="fa-regular fa-trash-can"></i>
              Chọn để xóa
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button type="button" className="btn btn-error rounded-full" onClick={() => confirmationModalRef.current.showModal()}>
              Xóa đã chọn
            </button>
            <button type="button" className="btn btn-secondary rounded-full" onClick={cancelSelection}>
              Hủy
            </button>
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <>
            <ExpenseSkeleton />
            <ExpenseSkeleton />
            <ExpenseSkeleton />
          </>
        ) : (
          expenses.map((expense) => (
            <ExpenseCard
              key={expense._id}
              expense={expense}
              isSelecting={multiSelect}
              isSelected={selectedCalculators.includes(expense._id)}
              onSelect={(event) => handleSingleSelect(event, expense._id)}
            />
          ))
        )}
      </div>

      {!loading && expenses.length === 0 && (
        <div className="rounded-box bg-base-100 py-16 text-center text-base-content/60">
          Chưa có khoản chi nào. Tạo mục đầu tiên nhé.
        </div>
      )}

      <AddCalculatorModal ref={addNewCalculatorModalRef} calculatorData={newCalculator} setCalculatorData={setNewCalculator} />
      <ConfirmationModal
        ref={confirmationModalRef}
        title="Xóa chi tiêu"
        message="Bạn có chắc chắn muốn xóa các khoản chi đã chọn?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleDeleteSelectedCalculators}
      />
    </section>
  );
};

export default Calculator;
