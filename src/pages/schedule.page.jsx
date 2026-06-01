import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "../components/Modal/confirmation.component";
import ErrorModal from "../components/Modal/error.component";
import SuccessModal from "../components/Modal/success.component";
import NewSchedule from "../components/schedule/newSchedule.component";
import ScheduleCard from "../components/schedule/scheduleCard.component";
import { deleteMultipleSchedules, fetchSchedule } from "../store/schedule";

const ScheduleSkeleton = () => (
  <div className="card border border-base-300 bg-base-100">
    <div className="card-body gap-4">
      <div className="skeleton h-5 w-1/2"></div>
      <div className="skeleton h-16 w-full"></div>
      <div className="skeleton h-8 w-24 self-end"></div>
    </div>
  </div>
);

const Schedule = () => {
  const dispatch = useDispatch();
  const { schedule, loading, error } = useSelector((state) => state.schedule);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const deleteModalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);

  useEffect(() => {
    if (hasDeleted && loading === false) {
      if (error) errorModalRef.current.showModal();
      else successModalRef.current.showModal();
    }
  }, [error, hasDeleted, loading]);

  const handleScheduleSelection = (event) => {
    const { checked, value } = event.target;
    setSelectedSchedules((current) => (
      checked ? [...current, value] : current.filter((id) => id !== value)
    ));
  };

  const handleMultiDelete = () => {
    if (selectedSchedules.length === 0) {
      deleteModalRef.current.close();
      errorModalRef.current.showModal("Vui lòng chọn ít nhất một timeline để xóa.");
      return;
    }

    setHasDeleted(true);
    dispatch(deleteMultipleSchedules(selectedSchedules));
    setSelectedSchedules([]);
    setIsMultiDeleteMode(false);
    deleteModalRef.current.close();
  };

  const cancelSelection = () => {
    setSelectedSchedules([]);
    setIsMultiDeleteMode(false);
  };

  return (
    <section className="mx-auto w-full max-w-[1200px] px-3 py-5 md:px-6">
      <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-bold text-primary">TRIP PLANNER</p>
          <h1 className="text-3xl font-bold">Timeline du lịch</h1>
          <p className="mt-1 text-sm text-base-content/60">Lưu lịch trình để chuyến đi nhẹ đầu hơn.</p>
        </div>
        {!isMultiDeleteMode ? (
          <button type="button" className="btn btn-secondary rounded-full" onClick={() => setIsMultiDeleteMode(true)}>
            <i className="fa-regular fa-trash-can"></i>
            Chọn timeline để xóa
          </button>
        ) : (
          <div className="flex gap-2">
            <button type="button" className="btn btn-error rounded-full" onClick={() => deleteModalRef.current.showModal()}>
              Xóa đã chọn
            </button>
            <button type="button" className="btn btn-secondary rounded-full" onClick={cancelSelection}>
              Hủy
            </button>
          </div>
        )}
      </div>

      <div className="mb-5">
        <NewSchedule />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <>
            <ScheduleSkeleton />
            <ScheduleSkeleton />
            <ScheduleSkeleton />
          </>
        ) : (
          schedule.map((item) => (
            <ScheduleCard
              key={item._id}
              schedule={item}
              isSelecting={isMultiDeleteMode}
              isSelected={selectedSchedules.includes(item._id)}
              onSelect={handleScheduleSelection}
            />
          ))
        )}
      </div>

      {!loading && schedule.length === 0 && (
        <div className="rounded-box bg-base-100 py-16 text-center text-base-content/60">
          Bạn chưa có timeline nào. Tạo một chuyến đi mới nhé.
        </div>
      )}

      <SuccessModal ref={successModalRef} modalMessage="Xóa timeline thành công" closeModalFunction={true} additionalFunction={setHasDeleted} />
      <ErrorModal ref={errorModalRef} modalMessage={error || "Vui lòng chọn ít nhất một timeline để xóa."} modalErrorHandlerText="Trở lại" />
      <ConfirmationModal
        ref={deleteModalRef}
        isDeleting={loading}
        title="Xóa timeline"
        message="Bạn đồng ý xóa các timeline đã chọn?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleMultiDelete}
      />
    </section>
  );
};

export default Schedule;
