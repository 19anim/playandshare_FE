import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import InputComponent from "../components/Input/input.component";
import ScheduleTasks from "../components/schedule/scheduleTasks.component";
import { useDispatch } from "react-redux";
import { updateSchedule } from "../store/schedule";
import SuccessModal from "../components/Modal/success.component";
import ErrorModal from "../components/Modal/error.component";

const EditScheduleDetail = () => {
  const { scheduleId } = useParams();
  const { schedule } = useSelector((state) => state.schedule);
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const { loading, error } = useSelector((state) => state.schedule);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();

  const [newSchedule, setNewSchedule] = useState(
    schedule ? schedule.filter((item) => item._id === scheduleId)[0] : null
  );

  const handleAdditionalInfoChange = (e, index) => {
    if (!setNewSchedule) return;

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

  const handleAddTask = () => {
    setNewSchedule((prev) => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: prev.tasks.length + 1,
          name: "Tiêu đề",
          fromDate: new Date().toISOString().split("T")[0],
          toDate: new Date().toISOString().split("T")[0],
          startTime: "hh:mm",
          endTime: "hh:mm",
          description: "Mô tả chi tiết",
        },
      ],
    }));
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    dispatch(updateSchedule(scheduleId, newSchedule));
  };

  useEffect(() => {
    setNewSchedule(schedule ? schedule.filter((item) => item._id === scheduleId)[0] : null);
  }, [schedule, scheduleId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (hasSubmitted && loading === false) {
      if (error) {
        errorModalRef.current.showModal();
      } else {
        successModalRef.current.showModal();
      }
    }
  }, [loading, error, hasSubmitted]);

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col px-3 py-5 md:px-6">
      <div className="mb-3 flex gap-2 self-end">
        <button onClick={handleSubmit} className="btn btn-primary rounded-full">
          Save
        </button>
        <Link to={`/schedule/${scheduleId}`} className="btn btn-secondary rounded-full">
          Cancel
        </Link>
      </div>
      <div className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          <div className="rounded-box bg-base-200 p-5 md:p-6">
            <h1 className="text-2xl font-bold mb-6 text-base-900 dark:text-base-50">
              Chỉnh sửa lịch trình
            </h1>
            {newSchedule ? (
              <>
                <InputComponent
                  label="Nơi du lịch"
                  inputName="location"
                  inputType="text"
                  value={newSchedule.location}
                  onChangeHandler={handleInputChange}
                  placeholder="Hồ Chí Minh"
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
                <button
                  className="btn btn-outline btn-success hover:bg-success/10 flex items-center gap-2 transition-all duration-300 group"
                  onClick={handleAddAdditionalInfo}
                >
                  <i className="fa-solid fa-circle-plus text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
                  <span className="font-medium">Thêm thông tin</span>
                </button>
              </>
            ) : (
              <p className="text-red-500">Không tìm thấy lịch trình.</p>
            )}
          </div>

          {newSchedule && (
            <div className="rounded-box bg-base-200 p-5 md:p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-base-900 dark:text-base-50">Lịch trình</h2>
                <button
                  className="btn btn-outline btn-success hover:bg-success/10 flex items-center gap-2 transition-all duration-300 group"
                  onClick={handleAddTask}
                >
                  <i className="fa-solid fa-circle-plus text-2xl group-hover:rotate-90 transition-transform duration-300"></i>
                </button>
              </div>
              <ScheduleTasks
                tasks={newSchedule.tasks}
                handleSetTasks={setNewSchedule}
                isEditMode={true}
              />
            </div>
          )}
        </div>
      </div>
      <SuccessModal
        ref={successModalRef}
        modalMessage="Lịch trình đã được cập nhật thành công!"
        modalNavigationLink={`/schedule/${scheduleId}`}
        modalNavigationText="Quay về chi tiết"
      />
      <ErrorModal
        ref={errorModalRef}
        modalMessage={error ? error : "Có lỗi trong quá trình cập nhật lịch trình!"}
        modalErrorHandlerText="Trở lại chỉnh sửa timeline"
      />
    </section>
  );
};

export default EditScheduleDetail;
