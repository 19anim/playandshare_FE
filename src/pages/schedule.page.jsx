import NewSchedule from "../components/schedule/newSchedule.component";
import { useDispatch } from "react-redux";
import { fetchSchedule } from "../store/schedule";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Schedule = () => {
  const dispatch = useDispatch();
  const { schedule, loading } = useSelector((state) => state.schedule);
  const today = new Date();

  useEffect(() => {
    dispatch(fetchSchedule());
  }, []);

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <div className="sticky top-0 w-full z-10 bg-base-200">
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
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, index) => {
                  let departureDate = new Date(item.departureDate);
                  let returnDate = new Date(item.returnDate);
                  return (
                    <tr key={item._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex flex-col">
                          <p className="text-lg font-bold">{item.location}</p>
                          <p className="text-sm text-gray-500">Từ {item.departureDate}</p>
                          <p className="text-sm text-gray-500">Đến {item.returnDate}</p>
                        </div>
                      </td>
                      <td>
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </fieldset>
    </section>
  );
};

export default Schedule;
