import { useState, useEffect, useRef, lazy, Suspense, useCallback } from "react";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPosts } from "../store/post";

const Post = lazy(() => import("../components/Post/post.component"));

// Create a PostSkeleton component for loading state
const PostSkeleton = () => (
  <div className="w-full max-w-[950px] self-center p-4">
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="skeleton h-32"></div>
      <div className="card-body">
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-1/2"></div>
      </div>
    </div>
  </div>
);

const Search = () => {
  const dispatch = useDispatch();
  const observerRef = useRef(null);

  const location = useLocation();
  const [scrollToPostId, setScrollToPostId] = useState();
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  const { posts, page, hasMore, loading } = useSelector((state) => state.post);
  const postRefs = useRef({});
  const cityRef = useRef(null);
  const [postsWithFilter, setPostsWithFilter] = useState([]);
  const DEFAULT_CITY = "default_city";

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isUsingFilter) {
          dispatch(getPosts(page + 1));
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, page, isUsingFilter]
  );

  useEffect(() => {
    setScrollToPostId(location.state?.scrollToPostId);
    dispatch(getPosts(1));
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    if (selectedCity && selectedCity !== DEFAULT_CITY) {
      filtered = filtered.filter((post) => post.city.name === selectedCity);
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((post) =>
        post.types?.some((type) => selectedTypes.includes(type.name))
      );
    }

    filtered.sort((a, b) => new Date(b.UpdatedAt) - new Date(a.UpdatedAt));
    setPostsWithFilter(filtered);
  }, [posts, selectedCity, selectedTypes]);

  useEffect(() => {
    if (isUsingFilter) {
      setSelectedCity(cityRef.current.value);
    } else {
      setSelectedCity("");
      setSelectedTypes([]);
    }
  }, [isUsingFilter]);

  useEffect(() => {
    if (scrollToPostId && postRefs.current[scrollToPostId]) {
      postRefs.current[scrollToPostId].scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollToPostId]);

  const onclickFilterHandler = (e) => {
    setIsUsingFilter(!isUsingFilter);
  };

  const handleTypeFilter = (e) => {
    const currentType = e.target.text;
    if (selectedTypes.indexOf(currentType) === -1 && currentType !== undefined)
      setSelectedTypes([...selectedTypes, currentType]);
  };

  const handleCityFilter = (e) => {
    const currentCity = e.target.value;
    setSelectedCity(currentCity);
  };

  const onClickSelectedTypesHandler = (e) => {
    const newSelectedTypes = [...selectedTypes];
    const typeIndex = newSelectedTypes.indexOf(e.target.innerText);
    newSelectedTypes.splice(typeIndex, 1);
    setSelectedTypes([...newSelectedTypes]);
  };

  return (
    <section className="w-full h-full flex justify-center items-center ">
      <fieldset className="fieldset h-full w-full max-w-[1300px] bg-bright border border-base-300 p-4 m-4 rounded-box flex flex-col">
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
              <Select
                ref={cityRef}
                searchVisible={false}
                selectLable="Thành phố"
                selectOptions={cities}
                onchangeHandler={handleCityFilter}
              />
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

        {postsWithFilter.map((post, index) => {
          const isLastPost = index === postsWithFilter.length - 1;
          return (
            <div
              className="w-full max-w-[950px] self-center"
              key={post._id}
              ref={(element) => {
                postRefs.current[post._id] = element;

                if (isLastPost) {
                  lastPostRef(element);
                }
              }}
            >
              <Suspense fallback={<PostSkeleton />}>
                <Post post={post} />
              </Suspense>
            </div>
          );
        })}

        {loading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}

        {!loading && postsWithFilter.length === 0 && (
          <div className="text-center py-4">No posts found</div>
        )}
      </fieldset>
    </section>
  );
};

export default Search;
