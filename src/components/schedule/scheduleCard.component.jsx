import { Link } from "react-router-dom";

const getScheduleStatus = (departureDate, returnDate) => {
  const today = new Date();

  if (new Date(returnDate) < today) {
    return { label: "Đã hoàn thành", className: "badge-secondary" };
  }

  if (new Date(departureDate) > today) {
    return { label: "Chưa khởi hành", className: "badge-primary" };
  }

  return { label: "Đang đi chơi", className: "badge-warning" };
};

const ScheduleCard = ({ schedule, isSelecting, isSelected, onSelect }) => {
  const status = getScheduleStatus(schedule.departureDate, schedule.returnDate);

  return (
    <article className="card border border-base-300 bg-base-100">
      <div className="card-body gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="card-title text-lg">{schedule.location}</h2>
            <p className="text-sm text-base-content/60">
              {schedule.tasks.length > 0
                ? `${schedule.tasks.length} hoạt động đã lên lịch`
                : "Chưa có hoạt động"}
            </p>
          </div>
          {isSelecting ? (
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              value={schedule._id}
              checked={isSelected}
              onChange={onSelect}
              aria-label={`Chọn timeline ${schedule.location}`}
            />
          ) : (
            <span className={`badge badge-soft ${status.className}`}>{status.label}</span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-box bg-base-200 p-3 text-sm">
          <div>
            <p className="text-xs text-base-content/60">Ngày đi</p>
            <p className="font-semibold">{schedule.departureDate}</p>
          </div>
          <div>
            <p className="text-xs text-base-content/60">Ngày về</p>
            <p className="font-semibold">{schedule.returnDate}</p>
          </div>
        </div>

        <div className="card-actions justify-end">
          <Link className="btn btn-secondary btn-sm" to={schedule._id}>
            Xem timeline
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ScheduleCard;
