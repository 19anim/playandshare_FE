import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter/filter.component";
import SelectedFilter from "../components/Filter/selectedFilter.component";
import Select from "../components/Filter/select.component";
import axios from "../helper/api";
import ErrorModal from "../components/Modal/error.component";
import SuccessModal from "../components/Modal/success.component";
import imageCompression from "browser-image-compression";

const CreatePost = () => {
  const MAX_SIZE_MB = 0.5;
  const MAX_IMAGE_COUNT = 10;
  const [isCreating, setIsCreating] = useState(false);
  const [responseStatus, setResponseStatus] = useState();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [imagesToSend, setImagesToSend] = useState([]);
  const [images, setImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const imageElementRef = useRef(null);
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const { playTypes, cities } = useSelector((state) => state.postUtil);
  const [formData, setFormdata] = useState({
    title: "",
    content: "",
    city: "TP Hồ Chí Minh",
    types: [],
  });

  useEffect(() => {
    if (responseStatus) successModalRef.current.showModal();
    else if (responseStatus === false) errorModalRef.current.showModal();
  }, [responseStatus]);

  const handleTypeFilter = (e) => {
    const currentType = e.target.text;
    if (selectedTypes.indexOf(currentType) === -1 && currentType !== undefined) {
      setSelectedTypes([...selectedTypes, currentType]);
      setFormdata({ ...formData, types: [...selectedTypes, currentType] });
    }
  };

  const onClickSelectedTypesHandler = (e) => {
    const newSelectedTypes = [...selectedTypes];
    const btn = e.currentTarget;
    const text = btn.childNodes[0].textContent.trim();
    const typeIndex = newSelectedTypes.indexOf(text);
    newSelectedTypes.splice(typeIndex, 1);
    setSelectedTypes([...newSelectedTypes]);
    setFormdata({ ...formData, types: [...newSelectedTypes] });
  };

  const handleUploadClick = (e) => {
    if (images.length < MAX_IMAGE_COUNT) imageElementRef.current.click();
  };

  const handleUploadChange = async (e) => {
    const options = {
      maxSizeMB: MAX_SIZE_MB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const files = Array.from(e.target.files);
    const imagesToSendName = imagesToSend.map((image) => image.name);
    try {
      setIsUploadingImage(true);
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          if (imagesToSendName.indexOf(file.name) !== -1) {
            return false;
          }

          const compressedImage = await imageCompression(file, options);
          if (compressedImage.size / (1024 * 1024) > MAX_SIZE_MB) {
            alert(`${file.name} không thể upload do vượt quá dung lượng cho phép`);
          }
          return compressedImage;
        })
      );

      const validCompressedFiles = compressedFiles.filter((file) => {
        if (file !== false) return file;
      });

      const tempImages = [...imagesToSend, ...validCompressedFiles];
      tempImages.splice(MAX_IMAGE_COUNT);

      setImagesToSend([...tempImages]);

      validCompressedFiles.forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImages((prev) => {
              if (prev.includes(reader.result) || prev.length >= MAX_IMAGE_COUNT) return prev;
              return [...prev, reader.result];
            });
          };
          reader.readAsDataURL(file);
        }
      });
    } catch (error) {
      console.error("Compression failed:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImagesToSend(imagesToSend.filter((_, i) => i !== index));
  };

  const handleOnChangeFormData = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmitPost = async () => {
    const dataToSend = new FormData();
    imagesToSend.forEach((img) => dataToSend.append("images", img));
    dataToSend.append("title", formData.title);
    dataToSend.append("content", formData.content);
    dataToSend.append("city", formData.city);
    formData.types.forEach((type) => dataToSend.append("types", type));

    try {
      setIsCreating(true);
      setResponseStatus(null);
      const response = await axios.request("/post/", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        data: dataToSend,
      });
      if (response.data) setResponseStatus(response.data.success);
    } catch (error) {
      console.log(error);
      setResponseStatus(false);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <header className="text-center text-xl font-bold pt-2">Bài viết mới</header>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>

        <section className="flex flex-wrap gap-3 max-w-[750px] w-full self-center">
          <SelectedFilter selectedFilter={selectedTypes} onClickHandler={onClickSelectedTypesHandler} />
        </section>
        <section className="flex flex-col max-w-[750px] w-full self-center md:flex-row gap-3 items-center">
          <section className="flex flex-col md:flex-row w-full gap-3">
            <Filter filterLabel="Thể loại ăn chơi" filterData={playTypes} onClickHandler={handleTypeFilter} />
            <Select onchangeHandler={handleOnChangeFormData} selectLable="Thành phố" selectOptions={cities} searchVisible={false} />
          </section>
        </section>

        <section className="flex flex-col w-full max-w-[750px] gap-y-2 relative">
          <input onChange={handleOnChangeFormData} type="text" placeholder="Tieu De" name="title" className="input w-full" />
          <textarea onChange={handleOnChangeFormData} className="textarea min-h-[200px] w-full" name="content" placeholder="Noi dung"></textarea>
          <input onChange={handleUploadChange} ref={imageElementRef} type="file" className="hidden" accept="image/*" multiple />
          <div onClick={handleUploadClick} className={`flex items-center gap-2 ${images.length < MAX_IMAGE_COUNT ? "cursor-pointer" : null}`}>
            <i className={`text-3xl fa-regular fa-images ${images.length >= MAX_IMAGE_COUNT ? "text-gray-500" : null}`}></i>
            {images.length >= MAX_IMAGE_COUNT ? (
              <div role="alert" className="alert alert-warning px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Đã đạt số lượng tối đa 10 tấm ảnh</span>
              </div>
            ) : null}
          </div>
        </section>

        <div className="w-full max-w-[750px] flex flex-wrap gap-2">
          {isUploadingImage ? (
            <span className="loading loading-bars loading-xl"></span>
          ) : (
            images.map((image, index) => (
              <div key={index} className="relative size-[80px] rounded-md overflow-hidden">
                <img src={image} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0  text-white p-1 rounded-full cursor-pointer">
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>
            ))
          )}
        </div>

        <button onClick={handleSubmitPost} className="btn btn-primary" disabled={isCreating}>
          Đăng bài viết
        </button>
        <SuccessModal ref={successModalRef} modalMessage="Bài viết đã được tạo thành công!" modalNavigationLink="/" modalNavigationText="Đến trang bài viết" />
        <ErrorModal ref={errorModalRef} modalMessage="Có lỗi trong quá trình tạo bài viết!" modalErrorHandlerText="Trở lại tạo bài viết" />
      </fieldset>
    </section>
  );
};

export default CreatePost;
