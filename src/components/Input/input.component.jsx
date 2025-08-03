const InputComponent = ({
  label,
  inputName,
  inputType,
  value,
  onChangeHandler,
  placeholder,
  ...props
}) => {
  return (
    <section className="flex justify-center items-center gap-4 mb-4">
      <p className="basis-20">{label}</p>
      <input
        type={inputType}
        className="input grow"
        placeholder={placeholder}
        name={inputName}
        value={value}
        onChange={onChangeHandler}
      />
    </section>
  );
};

export default InputComponent;
