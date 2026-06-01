const Filter = ({ filterLabel, filterData, onClickHandler }) => {
  return (
    <div className="dropdown dropdown-start">
      <div tabIndex={0} role="button" className="btn btn-secondary rounded-full">
        {filterLabel} <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul
        onClick={onClickHandler}
        tabIndex={0}
        className="dropdown-content menu z-20 mt-2 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-md"
      >
        {filterData?.map((data) => {
          return (
            <li key={data}>
              <a>{data}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
