import { useState } from "react";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import Post from "../components/Post/post.component";
import { useSelector } from "react-redux";
import store from "../store/store";
import { getPosts } from "../store/post";

const Search = () => {
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  //const posts = useSelector((state) => state.post);
  store.dispatch(getPosts());

  const tempPost = {
    author: "Tuấn Ân",
    title: "Ăn sập Vũng Tàu chỉ với 120k ? Tin được không",
    content: `Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An`,
    typeTags: ["Coffee", "Ăn uống"],
    cityTag: "Vũng Tàu",
    images: ["https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"],
    likes: 50,
    comments: ["1", "2", "3", "4", "5"],
    shares: 5,
  };
  const tempPost2 = {
    author: "Tuấn Ân",
    title: "Ăn sập Vũng Tàu chỉ với 120k ? Tin được không",
    // content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam provident quo, aperiam, eos suscipit, ut optio ipsum ratione officiis libero ex veniam corporis consectetur
    // earum nulla numquam. Dolorum, facere dolor.

    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam provident quo, aperiam,
    // eos suscipit, ut optio ipsum ratione officiis libero ex veniam corporis consectetur
    // earum nulla numquam. Dolorum, facere dolor.

    // Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam provident quo, aperiam,
    // eos suscipit, ut optio ipsum ratione officiis libero ex veniam corporis consectetur
    // earum nulla numquam. Dolorum, facere dolor.`,
    content: `Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan AnNguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan AnNguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan AnNguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An
    Nguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan AnNguyen Phi Tuan An Nguyen Phi Tuan An Nguyen Phi Tuan An`,
    typeTags: ["Coffee", "Ăn uống"],
    cityTag: "Vũng Tàu",
    images: [
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
      "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    ],
    likes: 50,
    comments: ["1", "2", "3", "4", "5"],
    shares: 5,
  };

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
    <section className="w-full h-full flex justify-center items-center">
      <fieldset className="fieldset h-full w-full max-w-[1300px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col">
        <legend className="fieldset-legend text-base">Tìm kiếm chỗ đi chơi thôi</legend>

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

        <Post post={tempPost2} />
        <Post post={tempPost} />
        <Post post={tempPost} />
      </fieldset>
    </section>
  );
};

export default Search;
