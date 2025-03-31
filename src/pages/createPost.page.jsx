import { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";

const CreatePost = () => {
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  const onclickFilterHandler = (e) => {
    setIsUsingFilter(!isUsingFilter);
  };

  const handleTypeFilter = (e) => {
    const currentType = e.target.text;
    if (selectedTypes.indexOf(currentType) === -1 && currentType !== undefined)
      setSelectedTypes([...selectedTypes, currentType]);
  };

  const onClickSelectedTypesHandler = (e) => {
    const newSelectedTypes = [...selectedTypes];
    const typeIndex = newSelectedTypes.indexOf(e.target.innerText);
    newSelectedTypes.splice(typeIndex, 1);
    setSelectedTypes([...newSelectedTypes]);
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <header className="text-center text-xl font-bold pt-2">Bài viết mới</header>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>

        <section className="grid grid-cols-3 w-full max-w-[950px] gap-y-2">
          <div className="badge badge-ghost font-medium">Tiêu đề bài viết</div>
          <input type="text" placeholder="Type here" className="input col-span-2" />
          <div className="badge badge-ghost font-medium">Nội dung bài viết</div>
          <textarea className="textarea col-span-2 min-h-[200px]" placeholder="Bio"></textarea>
          <div className="badge badge-ghost font-medium">Hình ảnh</div>
          <input type="file" className="file-input col-span-2" multiple />
        </section>

        <section className="flex flex-col max-w-[950px] w-full self-center md:flex-row gap-3 items-center">
          <button
            onClick={onclickFilterHandler}
            className={`btn self-start ${isUsingFilter ? "btn-accent" : null}`}
          >
            Bộ lọc <i className="fa-solid fa-arrow-down-short-wide"></i>
          </button>
          {isUsingFilter ? (
            <section className="flex flex-col md:flex-row w-full gap-3">
              <Filter
                filterLabel="Thể loại ăn chơi"
                filterData={playTypes}
                onClickHandler={handleTypeFilter}
              />
              <Select selectLable="Thành phố" selectOptions={cities} />
            </section>
          ) : null}
        </section>

        {isUsingFilter ? (
          <section className="flex flex-wrap gap-3 max-w-[950px] w-full self-center">
            <SelectedFilter
              selectedFilter={selectedTypes}
              onClickHandler={onClickSelectedTypesHandler}
            />
          </section>
        ) : null}
      </fieldset>
    </section>
  );
};

export default CreatePost;
