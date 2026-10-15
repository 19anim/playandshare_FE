import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ScheduleTasks from "../components/schedule/scheduleTasks.component";
import TripExpenses from "../components/schedule/tripExpenses.component";
import AddCalculatorModal from "../components/Modal/addCalculatorModal.component";
import ConfirmationModal from "../components/Modal/confirmation.component";
import { deleteSchedule, fetchSchedule } from "../store/schedule";
import { fetchExpenses } from "../store/expense";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { schedule, fetched, loading, error } = useSelector((state) => state.schedule);
  const { expenses, fetched: expensesFetched } = useSelector((state) => state.expense);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const deleteModalRef = useRef(null);
  const addExpenseModalRef = useRef(null);
  const isDeletingRef = useRef(false);
  const [newCalculator, setNewCalculator] = useState({ title: "", participants: [], createdBy: null });
  const [deleteExpensesToo, setDeleteExpensesToo] = useState(false);

  // Derived (not mirrored in state) so the redirect below never sees a stale value
  const currentSchedule = schedule.find((item) => item._id === scheduleId);
  const linkedExpenses = expenses.filter((expense) => expense.schedule === scheduleId);
  const availableExpenses = expenses.filter((expense) => !expense.schedule);

  const handleDelete = () => {
    isDeletingRef.current = true;
    dispatch(deleteSchedule(scheduleId, { deleteExpenses: deleteExpensesToo }));
  };

  const handleCreateExpense = () => {
    setNewCalculator({
      title: "",
      participants: [{ name: user.displayName, balance: 0, paid: 0 }],
      createdBy: null,
      schedule: scheduleId,
    });
    addExpenseModalRef.current.showModal();
  };

  useEffect(() => {
    if (error && isDeletingRef.current) {
      isDeletingRef.current = false;
      deleteModalRef.current.close();
      alert("Xóa lịch trình thất bại. Vui lòng thử lại.");
    }
  }, [error]);

  // Opening this page directly (refresh / shared link) means the lists haven't been loaded yet
  useEffect(() => {
    if (!fetched) dispatch(fetchSchedule());
    if (!expensesFetched) dispatch(fetchExpenses());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (fetched && !loading && !error && !currentSchedule) {
      navigate("/schedule", { replace: true });
    }
  }, [fetched, loading, error, currentSchedule, navigate]);

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col px-3 py-5 md:px-6">
      <div className="mb-3 flex flex-wrap gap-2 self-end">
        <Link to={`/schedule/edit/${scheduleId}`} className="btn btn-primary rounded-full">
          Edit
        </Link>
        <button className="btn btn-error rounded-full" onClick={() => deleteModalRef.current.showModal()}>
          Delete
        </button>
      </div>
      <div className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
        <Link
          to="/schedule"
          className="flex items-center gap-2 text-base-600 dark:text-base-400 mb-4 hover:text-base-800 dark:hover:text-base-200 transition-colors"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Quay lại
        </Link>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="rounded-box bg-base-200 p-5 md:p-6">
            <h2 className="text-2xl font-bold mb-6 text-base-900 dark:text-base-50">
              Thông tin chung
            </h2>
            {currentSchedule ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-base-900 dark:text-base-50">
                    Địa điểm
                  </h3>
                  <p className="text-base-700">{currentSchedule.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-base-900 dark:text-base-50">Thời gian</h3>
                  <p className="text-base-700">
                    Từ: {new Date(currentSchedule.departureDate).toLocaleDateString()}
                  </p>
                  <p className="text-base-700">
                    Đến: {new Date(currentSchedule.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-4 text-base-900 dark:text-base-50">
                    Thông tin thêm
                  </h3>
                  {currentSchedule.additionalInformation.map((infor) => (
                    <div
                      key={infor._id}
                      className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-base-300 dark:border-base-700 last:border-b-0"
                    >
                      <div className="text-base-600 font-medium flex items-center gap-2">
                        <i className="fa-solid fa-circle-info text-base-500 dark:text-base-400"></i>
                        {infor.title}
                      </div>
                      <div className="text-base-700">{infor.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              fetched || error ? (
                <p className="text-red-500">Không tìm thấy lịch trình.</p>
              ) : (
                <span className="loading loading-bars loading-lg"></span>
              )
            )}
          </div>

          {currentSchedule && <ScheduleTasks tasks={currentSchedule.tasks} isEditMode={false} />}
        </div>
        {currentSchedule && (
          <TripExpenses
            scheduleId={scheduleId}
            linkedExpenses={linkedExpenses}
            availableExpenses={availableExpenses}
            onCreate={handleCreateExpense}
          />
        )}
      </div>
      <AddCalculatorModal ref={addExpenseModalRef} calculatorData={newCalculator} setCalculatorData={setNewCalculator} />
      <ConfirmationModal
        ref={deleteModalRef}
        isDeleting={loading}
        title="Xóa lịch trình"
        message="Bạn đồng ý xóa lịch trình này?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleDelete}
      >
        {linkedExpenses.length > 0 && (
          <label className="label mb-4 cursor-pointer gap-2 text-base-content">
            <input
              type="checkbox"
              className="checkbox checkbox-error checkbox-sm"
              checked={deleteExpensesToo}
              onChange={(event) => setDeleteExpensesToo(event.target.checked)}
            />
            Xóa luôn {linkedExpenses.length} chi tiêu liên kết
          </label>
        )}
      </ConfirmationModal>
    </section>
  );
};

export default ScheduleDetail;
