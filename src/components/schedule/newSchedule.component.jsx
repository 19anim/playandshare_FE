import { FaAngleDown } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuccessModal from "../../components/Modal/success.component";
import ErrorModal from "../../components/Modal/error.component";
import { createSchedule } from "../../store/schedule";

const NewSchedule = () => {
  const successModalRef = useRef(null);
  const errorModalRef = useRef(null);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.schedule);
  const [information, setInformation] = useState({
    location: "",
    departureDate: "",
    returnDate: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!information.location?.trim() || !information.departureDate || !information.returnDate) {
      errorModalRef.current.showModal();
      return;
    }

    setHasSubmitted(true);
    dispatch(createSchedule(information));
  };

  useEffect(() => {
    if (hasSubmitted && loading === false) {
      if (error) {
        errorModalRef.current.showModal();
      } else {
        successModalRef.current.showModal();
        setInformation({
          location: "",
          departureDate: "",
          returnDate: "",
        });
      }
      setHasSubmitted(false);
    }
  }, [loading, error, hasSubmitted]);

  return (
    <div className="collapse bg-base-100 border-base-300 border">
      <input type="checkbox" />
      <div className="collapse-title font-semibold text-xl flex items-center gap-2 justify-between">
        <span>Tạo timeline mới</span>
        <FaAngleDown />
      </div>
      <div className="collapse-content text-sm md:grid md:grid-cols-2 gap-2 flex flex-col">
        <label className="input w-full md:col-span-2 md:gap-1 md:px-3 gap-0.5 px-2">
          <FaTreeCity className="text-xl" />
          <span className="label !px-2 !md:px-3">Thành phố:</span>
          <input type="text" name="location" onChange={handleChange} value={information.location} />
        </label>

        <label className="input w-full md:gap-1 md:px-3 gap-0.5 px-2">
          <FaTreeCity className="text-xl" />
          <span className="label !px-2 !md:px-3">Ngày đi:</span>
          <input
            type="date"
            name="departureDate"
            onChange={handleChange}
            value={information.departureDate}
          />
        </label>

        <label className="input w-full md:gap-1 md:px-3 gap-0.5 px-2">
          <FaTreeCity className="text-xl" />
          <span className="label !px-2 !md:px-3">Ngày về:</span>
          <input
            type="date"
            name="returnDate"
            onChange={handleChange}
            value={information.returnDate}
          />
        </label>

        <div className="md:col-span-2 flex justify-center">
          <button onClick={handleSubmit} className="btn w-full md:w-[calc(50%-0.25rem)]">
            Tạo mới
          </button>
        </div>
      </div>

      <SuccessModal
        ref={successModalRef}
        modalMessage="Timeline đã được tạo thành công!"
        closeModalFunction={true}
      />
      <ErrorModal
        ref={errorModalRef}
        modalMessage={error ? error : "Có lỗi trong quá trình tạo timeline!"}
        modalErrorHandlerText="Trở lại tạo timeline"
      />
    </div>
  );
};

export default NewSchedule;
