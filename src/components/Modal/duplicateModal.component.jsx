import { useState } from "react";

// "Nhân bản" dialog with one optional checkbox; onConfirm resolves the new copy or null
const DuplicateModal = ({ ref, title, message, checkboxLabel, showCheckbox, onConfirm, onSuccess }) => {
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    setBusy(true);
    setErrorMessage("");
    const result = await onConfirm(showCheckbox && checked);
    setBusy(false);
    if (!result) {
      setErrorMessage("Nhân bản thất bại, vui lòng thử lại.");
      return;
    }
    ref.current.close();
    onSuccess(result);
  };

  return (
    <dialog
      ref={ref}
      className="modal"
      onClose={() => {
        setChecked(false);
        setErrorMessage("");
      }}
    >
      <div className="modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{message}</p>
        {showCheckbox && (
          <label className="label mb-4 cursor-pointer gap-2 text-base-content">
            <input
              type="checkbox"
              className="checkbox checkbox-primary checkbox-sm"
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            {checkboxLabel}
          </label>
        )}
        {errorMessage && <p className="mb-3 text-error">{errorMessage}</p>}
        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-primary rounded-full" disabled={busy} onClick={handleConfirm}>
            {busy ? "Đang nhân bản..." : "Nhân bản"}
          </button>
          <button type="button" className="btn rounded-full" disabled={busy} onClick={() => ref.current.close()}>
            Hủy bỏ
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DuplicateModal;
