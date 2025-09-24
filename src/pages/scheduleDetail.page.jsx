import { useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import ScheduleTasks from "../components/schedule/scheduleTasks.component";
import { useState, useEffect, useRef } from "react";
import ConfirmationModal from "../components/Modal/confirmation.component";
import { useDispatch } from "react-redux";
import { deleteSchedule } from "../store/schedule";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();
  const { schedule, loading, error } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();
  const deleteModalRef = useRef(null);

  const [currentSchedule, setCurrentSchedule] = useState(
    schedule.filter((item) => item._id === scheduleId)[0]
  );

  const handleDelete = () => {
    dispatch(deleteSchedule(scheduleId));
  };

  useEffect(() => {
    setCurrentSchedule(schedule.filter((item) => item._id === scheduleId)[0]);
  }, [schedule, scheduleId]);

  useEffect(() => {
    if (error) {
      deleteModalRef.current.close();
      alert("Xóa lịch trình thất bại. Vui lòng thử lại.");
    }
  }, [error]);

  useEffect(() => {
    if (!loading && !error && !currentSchedule) {
      navigate("/schedule", { replace: true });
    }
  }, [loading, error, currentSchedule]);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="self-end flex gap-2 mb-3">
        <Link to={`/schedule/edit/${scheduleId}`} className="btn btn-primary">
          Edit
        </Link>
        <button
          className="btn btn-error"
          onClick={() => {
            deleteModalRef.current.showModal();
          }}
        >
          Delete
        </button>
      </div>
      <div className="card max-w-7xl w-full bg-[#faebd7] shadow-xl p-6">
        <Link
          to="/schedule"
          className="flex items-center gap-2 text-gray-600 mb-4 hover:text-gray-800"
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i> Quay lại
        </Link>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="bg-[#fff5e6] rounded-lg p-6 shadow-sm">
            <h1 className="text-2xl font-bold mb-6">Thông tin chung</h1>
            {currentSchedule ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Địa điểm</h3>
                  <p className="text-gray-700">{currentSchedule.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Thời gian</h3>
                  <p className="text-gray-700">
                    Từ: {new Date(currentSchedule.departureDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700">
                    Đến: {new Date(currentSchedule.returnDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-4">Thông tin thêm</h3>
                  {currentSchedule.additionalInformation.map((infor) => (
                    <div
                      key={infor._id}
                      className="grid grid-cols-2 gap-2 mb-3 pb-3 border-b border-[#d4c4ae] last:border-b-0"
                    >
                      <div className="text-gray-600 font-medium flex items-center gap-2">
                        <i className="fa-solid fa-circle-info text-gray-500"></i>
                        {infor.title}
                      </div>
                      <div className="text-gray-700">{infor.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-red-500">Không tìm thấy lịch trình.</p>
            )}
          </div>

          {currentSchedule && <ScheduleTasks tasks={currentSchedule.tasks} />}
        </div>
      </div>
      <ConfirmationModal
        ref={deleteModalRef}
        isDeleting={loading}
        title="Xóa lịch trình"
        message="Bạn đồng ý xóa lịch trình này?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleDelete}
      />
    </section>
  );
};

export default ScheduleDetail;
