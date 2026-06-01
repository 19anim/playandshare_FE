const SelectedFilter = ({ selectedFilter, onClickHandler }) => {
  return selectedFilter.map((type) => (
    <button key={`btn_${type}`} onClick={onClickHandler} className="btn btn-accent btn-sm rounded-full">
      {type} <i className="fa-solid fa-xmark"></i>
    </button>
  ));
};

export default SelectedFilter;
