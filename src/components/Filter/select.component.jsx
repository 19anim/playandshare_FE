const Select = ({ selectLable, selectOptions, searchVisible, onchangeHandler, ref }) => {
  return (
    <div className="join grow">
      {searchVisible === false ? null : (
        <div>
          <div>
            <input className="input join-item" placeholder="Search" />
          </div>
        </div>
      )}
      <select ref={ref} name="city" onChange={onchangeHandler} className="select join-item">
        <option value="default_city" defaultValue>
          {selectLable}
        </option>
        {selectOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      {searchVisible === false ? null : (
        <div className="indicator">
          <button className="btn join-item">Search</button>
        </div>
      )}
    </div>
  );
};

export default Select;
