const Filter = ({ filterLabel, filterData, onClickHandler }) => {
  return (
    <div className="dropdown dropdown-start ">
      <div tabIndex={0} role="button" className="btn">
        {filterLabel} <i className="fa-solid fa-angle-down"></i>
      </div>
      <ul
        onClick={onClickHandler}
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
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
