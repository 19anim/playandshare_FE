const InputComponent = ({
  label,
  inputName,
  inputType,
  value,
  onChangeHandler,
  placeholder,
  additionalInformation = null,
}) => {
  return (
    <section className="flex justify-center items-center gap-4 mb-4">
      {!additionalInformation ? (
        <p className="flex-1/3">{label}</p>
      ) : (
        <input
          type="text"
          name={additionalInformation.inputNameOfAdditional}
          className="input flex-1/4"
          placeholder="Chủ đề"
          value={label}
          onChange={onChangeHandler}
        />
      )}
      <input
        type={inputType}
        className={`input ${additionalInformation ? "flex-2/4" : "flex-2/3"}`}
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChangeHandler}
      />
      {additionalInformation && (
        <button
          type="button"
          className="btn btn-error"
          onClick={additionalInformation.onRemoveHandler}
        >
          Xóa
        </button>
      )}
    </section>
  );
};

export default InputComponent;
