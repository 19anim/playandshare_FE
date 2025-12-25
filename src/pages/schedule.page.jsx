import NewSchedule from "../components/schedule/newSchedule.component";
import { useDispatch } from "react-redux";
import { fetchSchedule } from "../store/schedule";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteMultipleSchedules } from "../store/schedule";
import ConfirmationModal from "../components/Modal/confirmation.component";
import SuccessModal from "../components/Modal/success.component";
import ErrorModal from "../components/Modal/error.component";

const Schedule = () => {
  const dispatch = useDispatch();
  const { schedule, loading, error } = useSelector((state) => state.schedule);
  const [isMultiDeleteMode, setIsMultiDeleteMode] = useState(false);
  const [hasDeleted, setHasDeleted] = useState(false);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const today = new Date();

  useEffect(() => {
    dispatch(fetchSchedule());
  }, []);

  const toggleMultiDeleteMode = () => {
    setIsMultiDeleteMode((prev) => !prev);
  };

  const handleScheduleSelection = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setSelectedSchedules((prev) => [...prev, value]);
    } else {
      setSelectedSchedules((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleMultiDelete = () => {
    if (selectedSchedules.length === 0) {
      deleteModalRef.current.close();
      errorModalRef.current.showModal("Vui lòng chọn ít nhất một lịch trình để xóa.");
      return;
    }

    setHasDeleted(true);
    dispatch(deleteMultipleSchedules(selectedSchedules));
    setSelectedSchedules([]);
    setIsMultiDeleteMode(false);
    deleteModalRef.current.close();
  };

  useEffect(() => {
    if (hasDeleted && loading === false) {
      if (error) {
        errorModalRef.current.showModal();
      } else {
        successModalRef.current.showModal();
      }
    }
  }, [loading, error, hasDeleted]);

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <div className="sticky top-0 w-full z-10 bg-base-200 flex flex-col">
          <div className="mb-2 self-end">
            {!isMultiDeleteMode ? (
              <button className="btn btn-error" onClick={toggleMultiDeleteMode}>
                Xóa nhiều lịch trình
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="btn btn-error"
                  onClick={() => deleteModalRef.current.showModal()}
                >
                  Xác nhận xóa
                </button>
                <button className="btn" onClick={() => setIsMultiDeleteMode(false)}>
                  Hủy bỏ
                </button>
              </div>
            )}
          </div>
          <NewSchedule />
          <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        </div>

        <div className="rounded-box border border-base-content/5 bg-base-100 w-full">
          {loading ? (
            <div className="flex justify-center items-center">
              <span className="loading loading-spinner loading-xl"></span>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Timeline</th>
                  <th className="hidden md:table-cell">Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => {
                  let departureDate = new Date(item.departureDate);
                  let returnDate = new Date(item.returnDate);
                  return (
                    <tr
                      className="dark:bg-base-800 border-b border-base-300 dark:border-base-700 hover:bg-base-100 dark:hover:bg-base-700 transition-colors"
                      key={item._id}
                    >
                      {!isMultiDeleteMode ? (
                        <th>{index + 1}</th>
                      ) : (
                        <th>
                          <input
                            type="checkbox"
                            className="checkbox"
                            value={item._id}
                            onClick={handleScheduleSelection}
                          />
                        </th>
                      )}
                      <td>
                        <div className="flex flex-col">
                          <p className="text-lg font-bold">{item.location}</p>
                          {item.tasks.length > 0 ? (
                            <p className="text-md font-bold">
                              Đã tạo {item.tasks.length} lịch trình
                            </p>
                          ) : (
                            <p className="text-md font-bold">Chưa tạo lịch trình</p>
                          )}
                          <p className="text-sm text-gray-500">Từ {item.departureDate}</p>
                          <p className="text-sm text-gray-500">Đến {item.returnDate}</p>
                        </div>
                      </td>
                      <td className="hidden md:table-cell">
                        {returnDate < today ? (
                          <span className="w-16 md:w-fit h-fit badge badge-soft badge-secondary text-xs md:textarea-md py-1">
                            Đã hoàn thành
                          </span>
                        ) : departureDate > today ? (
                          <span className="w-16 md:w-fit h-fit badge badge-soft badge-primary text-xs md:textarea-md py-1">
                            Chưa khởi hành
                          </span>
                        ) : (
                          <span className="w-16 md:w-fit h-fit badge badge-soft badge-warning text-xs md:textarea-md py-1">
                            Đang đi chơi
                          </span>
                        )}
                      </td>
                      <td>
                        <Link className="btn" to={item._id}>
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </fieldset>
      <SuccessModal
        ref={successModalRef}
        modalMessage="Xóa lịch trình thành công"
        closeModalFunction={true}
        additionalFunction={setHasDeleted}
      />
      <ErrorModal
        ref={errorModalRef}
        modalMessage={error ? error : "Vui lòng chọn ít nhất một lịch trình để xóa."}
        modalErrorHandlerText="Trở lại"
      />
      <ConfirmationModal
        ref={deleteModalRef}
        isDeleting={loading}
        title="Xóa lịch trình"
        message="Bạn đồng ý xóa lịch trình này?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleMultiDelete}
      />
    </section>
  );
};

export default Schedule;
