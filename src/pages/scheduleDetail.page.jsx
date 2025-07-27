import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);
  // const currentSchedule = schedule.find((item) => item._id === scheduleId);
  // console.log(currentSchedule);
  const currentSchedule = {
    additionalInformation: [
      { _id: "1", title: "Phương tiện di chuyển", content: "Máy bay" },
      { _id: "2", title: "Nơi ở", content: "Khách sạn ABC" },
    ],
    tasks: [
      {
        _id: "task1",
        name: "Tham quan bảo tàng",
        fromDate: "2023-10-02",
        toDate: "2023-10-02",
        startTime: "09:00",
        endTime: "11:00",
        description: "Tham quan bảo tàng lịch sử quốc gia.",
      },
      {
        _id: "task2",
        name: "Ăn trưa tại nhà hàng XYZ",
        fromDate: "2023-10-02",
        toDate: "2023-10-02",
        startTime: "12:00",
        endTime: "13:30",
        description: "Ăn trưa tại nhà hàng nổi tiếng XYZ.",
      },
    ],
    location: "Hà Nội",
    departureDate: "2023-10-01",
    returnDate: "2023-10-10",
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 ">
      <div className="self-end flex gap-2 mb-3">
        <Link className="btn btn-primary">Edit</Link>
        <Link className="btn btn-error">Delete</Link>
      </div>
      <div className="card w-full max-w-2xl bg-[#faebd7] shadow-xl">
        <div className="card-body">
          <Link to="/schedule">
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Quay lại
          </Link>
          <h1 className="text-2xl font-bold">Lịch trình chi tiết</h1>
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
              {currentSchedule.additionalInformation.map((infor) => (
                <p key={infor._id} className="text-sm text-gray-500">
                  {infor.title}: {infor.content}
                </p>
              ))}
              <p className="text-sm text-gray-500">Lịch trình:</p>
              {currentSchedule.tasks.map((task) => {
                return (
                  <div className="collapse bg-[#e5d5bf] border-base-300 border">
                    <input type="checkbox" />
                    <div className="collapse-title font-semibold">{task.name}</div>
                    <div className="collapse-content text-sm">
                      <p>
                        Từ: {new Date(task.fromDate).toLocaleDateString()} - Đến:{" "}
                        {new Date(task.toDate).toLocaleDateString()}
                      </p>
                      <p>
                        Giờ: {task.startTime} - {task.endTime}
                      </p>
                      <p>{task.description}</p>
                    </div>
                  </div>
                );
              })}
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
