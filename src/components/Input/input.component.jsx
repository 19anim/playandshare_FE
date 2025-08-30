const InputComponent = ({
  label,
  inputName,
  inputType,
  value,
  onChangeHandler,
  placeholder,
  additionalInformation = null,
  className = "",
}) => {
  return (
    <section
      className={`grid grid-cols-3 md:flex justify-center items-center gap-4 mb-3 ${className} ${
        additionalInformation && "bg-[#e5d5bf] p-3 rounded"
      }`}
    >
      {!additionalInformation ? (
        <p className="col-span-1 md:flex-1/3">{label}</p>
      ) : (
        <input
          type="text"
          name={additionalInformation.inputNameOfAdditional}
          className="input col-span-3 md:flex-1/4"
          placeholder="Chủ đề"
          value={label}
          onChange={onChangeHandler}
        />
      )}
      <input
        type={inputType}
        className={`input ${
          additionalInformation ? "col-span-2 md:flex-2/4" : "col-span-2 md:flex-2/3"
        }`}
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
