import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import PostSkeleton from "../components/Loading/postSkeleton.component";
import { getPosts } from "../store/post";
import { fetchCities, fetchPlayTypes } from "../store/postUtil";

const Post = lazy(() => import("../components/Post/post.component"));
const DEFAULT_CITY = "default_city";

const Search = () => {
  const dispatch = useDispatch();
  const observerRef = useRef(null);
  const [isUsingFilter, setIsUsingFilter] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [postsWithFilter, setPostsWithFilter] = useState([]);
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  const { posts, page, hasMore, loading } = useSelector((state) => state.post);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(getPosts(page + 1));
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [dispatch, hasMore, loading, page]
  );

  useEffect(() => {
    dispatch(getPosts(1));
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...posts];

    if (selectedCity && selectedCity !== DEFAULT_CITY) {
      filtered = filtered.filter((post) => post.city.name === selectedCity);
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((post) => post.types?.some((type) => selectedTypes.includes(type.name)));
    }

    filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    setPostsWithFilter(filtered);
  }, [posts, selectedCity, selectedTypes]);

  useEffect(() => {
    if (isUsingFilter) {
      if (cities.length === 0) dispatch(fetchCities());
      if (playTypes.length === 0) dispatch(fetchPlayTypes());
    } else {
      setSelectedCity("");
      setSelectedTypes([]);
    }
  }, [cities.length, dispatch, isUsingFilter, playTypes.length]);

  const handleTypeFilter = (event) => {
    const currentType = event.target.textContent?.trim();
    if (currentType && !selectedTypes.includes(currentType)) {
      setSelectedTypes([...selectedTypes, currentType]);
    }
  };

  const removeSelectedType = (event) => {
    const currentType = event.currentTarget.textContent?.trim();
    setSelectedTypes(selectedTypes.filter((type) => type !== currentType));
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-3 py-5 md:px-6">
      <div className="mb-5 rounded-box border border-base-300 bg-base-100 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold">Khám phá địa điểm mới</h1>
            <p className="text-sm text-base-content/60">Tìm cảm hứng cho chuyến đi tiếp theo của bạn.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsUsingFilter(!isUsingFilter)}
            className={`btn rounded-full ${isUsingFilter ? "btn-accent" : "btn-secondary"}`}
          >
            <i className="fa-solid fa-sliders"></i>
            Bộ lọc
          </button>
        </div>

        {isUsingFilter && (
          <div className="mt-4 flex flex-col gap-3 border-t border-base-300 pt-4">
            <div className="flex flex-col gap-3 md:flex-row">
              <Filter filterLabel="Thể loại" filterData={playTypes} onClickHandler={handleTypeFilter} />
              <Select
                searchVisible={false}
                selectLable="Thành phố"
                selectOptions={cities}
                value={selectedCity || DEFAULT_CITY}
                onchangeHandler={(event) => setSelectedCity(event.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <SelectedFilter selectedFilter={selectedTypes} onClickHandler={removeSelectedType} />
            </div>
          </div>
        )}
      </div>

      <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
        {postsWithFilter.map((post, index) => {
          const isLastPost = index === postsWithFilter.length - 1;
          return (
            <div
              key={post._id}
              ref={(element) => {
                if (isLastPost) lastPostRef(element);
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
            <PostSkeleton />
          </>
        )}
      </div>

      {!loading && postsWithFilter.length === 0 && (
        <div className="rounded-box bg-base-100 py-16 text-center text-base-content/60">
          Chưa tìm thấy bài viết phù hợp.
        </div>
      )}
    </section>
  );
};

export default Search;
