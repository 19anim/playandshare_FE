import { useRef, useState } from "react";
import {
  canShareFiles,
  createExpensePdfFile,
  downloadFile,
  shareFile,
} from "../../helper/exportExpensePdf";

const supportsShare = canShareFiles();

const ExpenseExportActions = ({ expense }) => {
  const [busyAction, setBusyAction] = useState(null); // "download" | "share" | null
  const [readyFile, setReadyFile] = useState(null);
  // Reuse the generated PDF until the calculator changes (Redux replaces the object on update)
  const cacheRef = useRef({ expense: null, file: null });

  const getFile = async () => {
    if (cacheRef.current.expense !== expense) {
      cacheRef.current = { expense, file: await createExpensePdfFile(expense) };
    }
    return cacheRef.current.file;
  };

  const share = (file) =>
    shareFile(file, expense.title).catch((shareError) => {
      // AbortError = the user closed the share sheet
      if (shareError.name !== "AbortError") throw shareError;
    });

  const handleDownload = async () => {
    setBusyAction("download");
    try {
      downloadFile(await getFile());
    } catch (exportError) {
      console.error(exportError);
      alert("Xuất PDF thất bại. Vui lòng thử lại.");
    } finally {
      setBusyAction(null);
    }
  };

  const handleShare = async () => {
    setBusyAction("share");
    let file = null;
    try {
      file = await getFile();
      await share(file);
    } catch (shareError) {
      if (file && shareError.name === "NotAllowedError") {
        // Safari only allows sharing right after a tap; building the PDF took too long,
        // so ask for one more tap now that the file is ready
        setReadyFile(file);
      } else {
        console.error(shareError);
        alert("Chia sẻ thất bại. Bạn có thể tải PDF về và gửi thủ công.");
      }
    } finally {
      setBusyAction(null);
    }
  };

  const handleShareReadyFile = () => {
    const file = readyFile;
    setReadyFile(null);
    share(file).catch((shareError) => {
      console.error(shareError);
      downloadFile(file);
    });
  };

  return (
    <>
      {supportsShare && (
        <button
          onClick={handleShare}
          disabled={!expense || busyAction !== null}
          className="btn btn-ghost rounded-full"
          title="Chia sẻ PDF qua Zalo, Messenger..."
        >
          {busyAction === "share" ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            <i className="fa-solid fa-share-nodes"></i>
          )}
          <span className="hidden sm:inline">Chia sẻ</span>
        </button>
      )}
      <button
        onClick={handleDownload}
        disabled={!expense || busyAction !== null}
        className="btn btn-ghost rounded-full"
        title="Tải PDF về máy"
      >
        {busyAction === "download" ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <i className="fa-regular fa-file-pdf"></i>
        )}
        <span className="hidden sm:inline">Xuất PDF</span>
      </button>

      {readyFile && (
        <div className="toast toast-center toast-bottom z-50">
          <div role="status" className="alert border border-base-300 bg-base-100 shadow-lg">
            <i className="fa-regular fa-file-pdf text-primary"></i>
            <span>PDF đã sẵn sàng</span>
            <button className="btn btn-primary btn-sm rounded-full" onClick={handleShareReadyFile}>
              Chia sẻ
            </button>
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => setReadyFile(null)}
              aria-label="Đóng"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExpenseExportActions;
