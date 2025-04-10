import { useState, useEffect } from "react";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import Post from "../components/Post/post.component";
import { useSelector } from "react-redux";
import { getPosts } from "../store/post";
import store from "../store/store";
import axios from "../helper/api";

const Search = () => {
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  const posts = useSelector((state) => state.post);

  useEffect(() => {
    store.dispatch(getPosts());
  }, []);

  const onLikeHandler = async (postId) => {
    try {
      const response = await axios.request("/post/like", {
        method: "POST",
        data: {
          postId: postId,
        },
      });

      if (response) {
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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

        {posts.length > 0
          ? posts.map((post) => (
              <Post key={post.id} post={post} likeHandler={() => onLikeHandler(post._id)} />
            ))
          : null}
      </fieldset>
    </section>
  );
};

export default Search;
