import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);
  const currentSchedule = schedule.find((item) => item._id === scheduleId);

  return (
    <section className="w-full h-full flex justify-center items-center p-4 ">
      <div className="card w-full max-w-2xl bg-[#faebd7] shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Chi tiết lịch trình</h2>
          {currentSchedule ? (
            <>
              <p className="text-lg font-bold">{currentSchedule.location}</p>
              <p className="text-sm text-gray-500">
                Từ: {new Date(currentSchedule.departureDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Đến: {new Date(currentSchedule.returnDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">Mô tả: {currentSchedule.description}</p>
            </>
          ) : (
            <p className="text-red-500">Không tìm thấy lịch trình.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ScheduleDetail;
