import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const ScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);
  const currentSchedule = {
    additionalInformation: [
      { _id: "1", title: "Phương tiện di chuyển", content: "Máy bay" },
      { _id: "2", title: "Nơi ở", content: "Khách sạn ABC" },
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
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
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

          <div className="bg-[#fff5e6] rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Lịch trình</h2>
            <div className="flex flex-col gap-3">
              {currentSchedule.tasks.map((task) => (
                <div key={task._id} className="collapse bg-[#e5d5bf] border-base-300 border">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleDetail;
