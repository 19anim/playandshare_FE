const Select = ({ selectLable, selectOptions, searchVisible, onchangeHandler, value }) => {
  return (
    <div className="join grow">
      {searchVisible === false ? null : (
        <div>
          <div>
            <input className="input join-item rounded-l-full" placeholder="Search" />
          </div>
        </div>
      )}
      <select value={value} name="city" onChange={onchangeHandler} className="select join-item rounded-full bg-base-100">
        <option value="default_city">
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
