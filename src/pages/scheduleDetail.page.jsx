import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import ScheduleTasks from "../components/schedule/scheduleTasks.component";
import { useState, useEffect } from "react";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);

  const [currentSchedule, setCurrentSchedule] = useState(
    schedule.filter((item) => item._id === scheduleId)[0]
  );

  useEffect(() => {
    setCurrentSchedule(schedule.filter((item) => item._id === scheduleId)[0]);
  }, [schedule, scheduleId]);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4">
      <div className="self-end flex gap-2 mb-3">
        <Link to={`/schedule/edit/${scheduleId}`} className="btn btn-primary">
          Edit
        </Link>
        <Link className="btn btn-error">Delete</Link>
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
    </section>
  );
};

export default ScheduleDetail;
