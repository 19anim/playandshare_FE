const Select = ({ selectLable, selectOptions, searchVisible }) => {
  return (
    <div className="join grow">
      <div>
        <div>
          <input className="input join-item" placeholder="Search" />
        </div>
      </div>
      <select className="select join-item">
        <option disabled defaultValue>
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
