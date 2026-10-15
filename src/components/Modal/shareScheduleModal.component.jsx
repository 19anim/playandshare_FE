import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { shareSchedule, unshareSchedule } from "../../store/schedule";

const EMPTY_MESSAGE = { text: "", tone: "success" };
const TONE_CLASS = { success: "text-success", error: "text-error", info: "text-base-content/70" };
const shareUrl = (token) => `${window.location.origin}/trip/${token}`;

const ShareScheduleModal = ({ ref, schedule }) => {
  const dispatch = useDispatch();
  const linkInputRef = useRef(null);
  const [busy, setBusy] = useState(false);
  const [confirmRegenerate, setConfirmRegenerate] = useState(false);
  const [message, setMessage] = useState(EMPTY_MESSAGE);
  const link = schedule?.shareToken ? shareUrl(schedule.shareToken) : "";
  const canShare = typeof navigator.share === "function";

  const run = async (action, successText) => {
    setBusy(true);
    setMessage(EMPTY_MESSAGE);
    const result = await dispatch(action);
    setBusy(false);
    setConfirmRegenerate(false);
    setMessage(
      result
        ? { text: successText, tone: "success" }
        : { text: "Có lỗi xảy ra, vui lòng thử lại.", tone: "error" }
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setMessage({ text: "Đã sao chép link", tone: "success" });
    } catch {
      // No clipboard access (old browser / insecure origin): let the user copy it by hand
      linkInputRef.current?.select();
      setMessage({ text: "Hãy sao chép link đang được chọn", tone: "info" });
    }
  };

  const handleShare = () =>
    navigator.share({ title: schedule.location, url: link }).catch((error) => {
      // AbortError = the user closed the share sheet
      if (error.name !== "AbortError") setMessage({ text: "Không chia sẻ được, hãy sao chép link.", tone: "error" });
    });

  const handleClose = () => {
    setMessage(EMPTY_MESSAGE);
    setConfirmRegenerate(false);
  };

  if (!schedule) return null;

  return (
    <dialog ref={ref} className="modal" onClose={handleClose}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" aria-label="Đóng">
            ✕
          </button>
        </form>
        <h3 className="text-lg font-bold">Chia sẻ chuyến đi</h3>
        {!schedule.shareToken ? (
          <>
            <p className="py-3 text-sm text-base-content/70">
              Bất kỳ ai có link đều xem được lịch trình và các chi tiêu của chuyến đi, không cần đăng nhập.
            </p>
            <button
              type="button"
              className="btn btn-primary rounded-full"
              disabled={busy}
              onClick={() => run(shareSchedule(schedule._id), "Đã bật chia sẻ")}
            >
              {busy ? "Đang bật..." : "Bật chia sẻ"}
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-3 pt-3">
            <input
              ref={linkInputRef}
              readOnly
              value={link}
              className="input w-full"
              aria-label="Link chia sẻ"
              onFocus={(event) => event.target.select()}
            />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-primary btn-sm rounded-full" onClick={handleCopy}>
                <i className="fa-regular fa-copy"></i>
                Sao chép
              </button>
              {canShare && (
                <button type="button" className="btn btn-secondary btn-sm rounded-full" onClick={handleShare}>
                  <i className="fa-solid fa-share-nodes"></i>
                  Chia sẻ
                </button>
              )}
            </div>
            <div className="divider my-0"></div>
            {confirmRegenerate ? (
              <div className="rounded-box bg-warning/10 p-3 text-sm">
                <p className="mb-2">Link cũ sẽ không dùng được nữa. Tiếp tục?</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm rounded-full"
                    disabled={busy}
                    onClick={() => run(shareSchedule(schedule._id), "Đã tạo link mới")}
                  >
                    Tạo link mới
                  </button>
                  <button type="button" className="btn btn-sm rounded-full" onClick={() => setConfirmRegenerate(false)}>
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm rounded-full"
                  disabled={busy}
                  onClick={() => {
                    setMessage(EMPTY_MESSAGE);
                    setConfirmRegenerate(true);
                  }}
                >
                  <i className="fa-solid fa-rotate"></i>
                  Tạo link mới
                </button>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm rounded-full text-error"
                  disabled={busy}
                  onClick={() => run(unshareSchedule(schedule._id), "Đã tắt chia sẻ")}
                >
                  <i className="fa-solid fa-link-slash"></i>
                  Tắt chia sẻ
                </button>
              </div>
            )}
          </div>
        )}
        {message.text && (
          <p role="status" className={`mt-3 text-sm ${TONE_CLASS[message.tone]}`}>
            {message.text}
          </p>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ShareScheduleModal;
