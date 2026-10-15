import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import normalAxios from "../helper/normalAxios";
import ScheduleTasks from "../components/schedule/scheduleTasks.component";
import ExpenseSummary from "../components/calculator/expenseSummary.component";
import Participants from "../components/calculator/participants.component";
import Payments from "../components/calculator/payments.component";

const formatDay = (date) => new Date(date).toLocaleDateString();

const SharedTripSkeleton = () => (
  <div className="card border border-base-300 bg-base-100 p-4 md:p-6">
    <div className="skeleton mb-4 h-8 w-1/3"></div>
    <div className="skeleton mb-3 h-24 w-full"></div>
    <div className="skeleton h-40 w-full"></div>
  </div>
);

// Public, read-only view of a trip opened from a share link (no login)
const SharedTrip = () => {
  const { token } = useParams();
  const [state, setState] = useState({ status: "loading", data: null });

  const load = useCallback(() => {
    setState({ status: "loading", data: null });
    // First visitor often wakes the server up: allow a cold start
    normalAxios
      .get(`/share/${token}`, { timeout: 60000 })
      .then((response) => setState({ status: "ready", data: response.data }))
      .catch((error) =>
        setState({ status: error.response?.status === 404 ? "notFound" : "error", data: null })
      );
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const renderBody = () => {
    if (state.status === "loading") return <SharedTripSkeleton />;

    if (state.status === "notFound") {
      return (
        <div className="card items-center gap-3 border border-base-300 bg-base-100 p-10 text-center">
          <i className="fa-solid fa-link-slash text-3xl text-base-content/50"></i>
          <h1 className="text-xl font-bold">Link không còn hiệu lực</h1>
          <p className="text-base-content/60">Chủ chuyến đi đã tắt chia sẻ hoặc đã tạo link mới.</p>
          <Link to="/" className="btn btn-secondary rounded-full">
            Về trang chủ
          </Link>
        </div>
      );
    }

    if (state.status === "error") {
      return (
        <div className="card items-center gap-3 border border-base-300 bg-base-100 p-10 text-center">
          <p className="text-error">Không tải được dữ liệu, vui lòng thử lại.</p>
          <button type="button" className="btn btn-primary rounded-full" onClick={load}>
            Thử lại
          </button>
        </div>
      );
    }

    const { schedule, author, expenses } = state.data;
    return (
      <>
        <div className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
          <div className="mb-4 flex items-center gap-3">
            {author.avatar && (
              <div className="avatar">
                <div className="size-10 rounded-full">
                  <img src={author.avatar} alt={author.displayName} />
                </div>
              </div>
            )}
            <div>
              <p className="text-sm text-base-content/60">Chuyến đi của {author.displayName}</p>
              <h1 className="text-2xl font-bold">{schedule.location}</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="rounded-box bg-base-200 p-5 md:p-6">
              <h2 className="mb-6 text-2xl font-bold">Thông tin chung</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Thời gian</h3>
                  <p>Từ: {formatDay(schedule.departureDate)}</p>
                  <p>Đến: {formatDay(schedule.returnDate)}</p>
                </div>
                <div className="space-y-2">
                  <h3 className="mb-4 text-lg font-semibold">Thông tin thêm</h3>
                  {schedule.additionalInformation.map((infor, index) => (
                    <div
                      key={index}
                      className="mb-3 grid grid-cols-2 gap-2 border-b border-base-300 pb-3 last:border-b-0"
                    >
                      <div className="flex items-center gap-2 font-medium">
                        <i className="fa-solid fa-circle-info"></i>
                        {infor.title}
                      </div>
                      <div>{infor.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <ScheduleTasks tasks={schedule.tasks} isEditMode={false} />
          </div>
        </div>

        {expenses.map((expense, index) => (
          <article key={index} className="card w-full border border-base-300 bg-base-100 p-4 md:p-6">
            <h2 className="text-xl font-bold">{expense.title}</h2>
            <div className="divider my-0"></div>
            <div className="mb-3">
              <ExpenseSummary expense={expense} />
            </div>
            <section className="grid w-full grid-cols-1 gap-3 lg:grid-cols-[max-content_1fr]">
              <Participants data={expense.participants} readOnly />
              <Payments data={expense} readOnly />
            </section>
          </article>
        ))}
      </>
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-3 py-5 md:px-6">
      {/* React 19 hoists this into <head>: shared links should not show up in search engines */}
      <meta name="robots" content="noindex" />
      {renderBody()}
    </section>
  );
};

export default SharedTrip;
