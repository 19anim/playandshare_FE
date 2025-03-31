import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import axios from "../helper/api";

const TestPage = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [images, setImages] = useState([]);
  const imageElementRef = useRef(null);
  const { playTypes, cities } = useSelector((state) => state.postUtil);

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

  const handleUploadClick = (e) => {
    imageElementRef.current.click();
  };

  const handleUploadChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (images.indexOf(reader.result) === -1)
            setImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmitPost = async () => {
    const response = await axios.request("/post/", {
      method: "POST",
      data: {
        title: "TEST TITLE",
        content: "TEST CONTENT",
        types: ["Coffee", "Ăn uống"],
        city: "Nha Trang",
      },
    });
    const data = response.data;
    console.log(data);
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <header className="text-center text-xl font-bold pt-2">Bài viết mới</header>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>

        <section className="flex flex-col max-w-[750px] w-full self-center md:flex-row gap-3 items-center">
          <section className="flex flex-col md:flex-row w-full gap-3">
            <Filter
              filterLabel="Thể loại ăn chơi"
              filterData={playTypes}
              onClickHandler={handleTypeFilter}
            />
            <Select selectLable="Thành phố" selectOptions={cities} searchVisible={false} />
          </section>
        </section>

        <section className="flex flex-wrap gap-3 max-w-[750px] w-full self-center">
          <SelectedFilter
            selectedFilter={selectedTypes}
            onClickHandler={onClickSelectedTypesHandler}
          />
        </section>

        <section className="flex flex-col w-full max-w-[750px] gap-y-2 relative">
          <input type="text" placeholder="Tieu De" className="input w-full" />
          <textarea className="textarea min-h-[200px] w-full" placeholder="Noi dung"></textarea>
          <input
            onChange={handleUploadChange}
            ref={imageElementRef}
            type="file"
            className="hidden"
            multiple
          />
          <div onClick={handleUploadClick} className="cursor-pointer absolute bottom-2 left-2">
            <i className="text-3xl fa-regular fa-images"></i>
          </div>
        </section>

        <div className="w-full max-w-[750px] flex flex-wrap gap-2">
          {images.map((image, index) => (
            <div key={index} className="relative size-[80px] rounded-md overflow-hidden">
              <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0  text-white p-1 rounded-full cursor-pointer"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          ))}
        </div>

        <button onClick={handleSubmitPost} className="btn btn-primary">
          Đăng bài viết
        </button>
      </fieldset>
    </section>
  );
};

export default TestPage;
