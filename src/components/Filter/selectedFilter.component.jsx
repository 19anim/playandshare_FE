const SelectedFilter = ({ selectedFilter, onClickHandler }) => {
  return selectedFilter.map((type) => (
    <button key={`btn_${type}`} onClick={onClickHandler} className="btn">
      {type} <i className="fa-regular fa-trash-can"></i>
    </button>
  ));
};

export default SelectedFilter;
