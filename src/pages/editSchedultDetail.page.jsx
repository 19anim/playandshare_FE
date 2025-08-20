import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import InputComponent from "../components/Input/input.component";

const EditScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);
  // const currentSchedule = schedule.find((item) => item._id === scheduleId);
  const currentSchedule = {
    additionalInformation: [
      { title: "Phương tiện di chuyển", content: "Máy bay" },
      { title: "Nơi ở", content: "Khách sạn ABC" },
    ],
    tasks: [
      {
        name: "Tham quan bảo tàng",
        fromDate: "2023-10-02",
        toDate: "2023-10-02",
        startTime: "09:00",
        endTime: "11:00",
        description: "Tham quan bảo tàng lịch sử quốc gia.",
      },
      {
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

  const [newSchedule, setNewSchedule] = useState(currentSchedule);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdditionalInfoChange = (e, index) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => {
      const updatedInfo = [...prev.additionalInformation];
      updatedInfo[index] = { ...updatedInfo[index], [name]: value };
      return { ...prev, additionalInformation: updatedInfo };
    });
  };

  const handleRemoveAdditionalInfo = (index) => {
    setNewSchedule((prev) => {
      const updatedInfo = prev.additionalInformation.filter((_, i) => i !== index);
      return { ...prev, additionalInformation: updatedInfo };
    });
  };

  const handleAddAdditionalInfo = () => {
    setNewSchedule((prev) => ({
      ...prev,
      additionalInformation: [...prev.additionalInformation, { title: "", content: "" }],
    }));
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center p-4 ">
      <div className="self-end flex gap-2 mb-3">
        <Link to={`/schedule/${scheduleId}`} className="btn btn-success">
          Save
        </Link>
        <Link to={`/schedule/${scheduleId}`} className="btn btn-error">
          Cancel
        </Link>
      </div>
      <div className="card w-full max-w-2xl bg-[#faebd7] shadow-xl">
        <div className="card-body">
          <h1 className="text-2xl font-bold">Chỉnh sửa lịch trình</h1>
          {/* <h2 className="card-title">Chi tiết lịch trình</h2> */}
          {currentSchedule ? (
            <>
              <InputComponent
                label="Nơi du lịch"
                inputName="location"
                inputType="text"
                value={newSchedule.location}
                onChangeHandler={handleInputChange}
                placeholder="Hồ Chí Minh"
                className="text-xl"
              />
              <InputComponent
                label="Ngày đi"
                inputName="departureDate"
                inputType="date"
                value={newSchedule.departureDate}
                onChangeHandler={handleInputChange}
                placeholder="Chọn ngày đi"
              />
              <InputComponent
                label="Ngày về"
                inputName="returnDate"
                inputType="date"
                value={newSchedule.returnDate}
                onChangeHandler={handleInputChange}
                placeholder="Chọn ngày về"
              />
              {newSchedule.additionalInformation.map((infor, index) => (
                <InputComponent
                  key={index}
                  label={infor.title}
                  inputName="content"
                  inputType="text"
                  value={infor.content}
                  onChangeHandler={(e) => handleAdditionalInfoChange(e, index)}
                  placeholder={`Nhập ${infor.title.toLowerCase()}`}
                  additionalInformation={{
                    isAdditional: true,
                    inputNameOfAdditional: "title",
                    onRemoveHandler: () => handleRemoveAdditionalInfo(index),
                  }}
                />
              ))}
              <button className="cursor-pointer btn" onClick={handleAddAdditionalInfo}>
                <i className="fa-solid text-success fa-circle-plus text-3xl"></i>
                Thêm thông tin
              </button>
              <p className="text-sm text-gray-500">Lịch trình:</p>
              {currentSchedule.tasks.map((task, index) => {
                return (
                  <div key={index} className="collapse bg-[#e5d5bf] border-base-300 border">
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

export default EditScheduleDetail;
