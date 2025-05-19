import { FaAngleDown } from "react-icons/fa6";
import { FaTreeCity } from "react-icons/fa6";
import { useState } from "react";

const NewSchedule = () => {
  const [information, setInformation] = useState({
    city: "",
    tasks: [],
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
          <input type="text" name="city" onChange={handleChange} value={information.city} />
        </label>

        <label className="input w-full md:gap-1 md:px-3 gap-0.5 px-2">
          <FaTreeCity className="text-xl" />
          <span className="label !px-2 !md:px-3">Ngày đi:</span>
          <input
            type="date"
            name="startDate"
            onChange={handleChange}
            value={information.startDate}
          />
        </label>

        <label className="input w-full md:gap-1 md:px-3 gap-0.5 px-2">
          <FaTreeCity className="text-xl" />
          <span className="label !px-2 !md:px-3">Ngày về:</span>
          <input type="date" name="endDate" onChange={handleChange} value={information.endDate} />
        </label>

        <div className="md:col-span-2 flex justify-center">
          <button className="btn w-full md:w-[calc(50%-0.25rem)]">Default</button>
        </div>
      </div>
    </div>
  );
};

export default NewSchedule;
