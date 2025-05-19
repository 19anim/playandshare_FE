import NewSchedule from "../components/schedule/newSchedule.component";

const Schedule = () => {
  const timeline = [
    {
      id: 1,
      location: "Hồ Chí Minh",
      startDate: "21-05-2025",
      endDate: "27-05-2025",
      status: "Đang đi",
    },
    {
      id: 2,
      location: "Hà Nội",
      startDate: "01-06-2025",
      endDate: "07-06-2025",
      status: "Chưa đi",
    },
    {
      id: 3,
      location: "Đà Nẵng",
      startDate: "15-06-2025",
      endDate: "21-06-2025",
      status: "Chưa đi",
    },
    {
      id: 4,
      location: "Nha Trang",
      startDate: "01-07-2025",
      endDate: "07-07-2025",
      status: "Chưa đi",
    },
    {
      id: 5,
      location: "Phú Quốc",
      startDate: "15-07-2025",
      endDate: "21-07-2025",
      status: "Chưa đi",
    },
    {
      id: 6,
      location: "Đà Lạt",
      startDate: "01-08-2025",
      endDate: "07-08-2025",
      status: "Chưa đi",
    },
    {
      id: 7,
      location: "Hạ Long",
      startDate: "15-08-2025",
      endDate: "21-08-2025",
      status: "Chưa đi",
    },
    {
      id: 8,
      location: "Cần Thơ",
      startDate: "01-09-2025",
      endDate: "07-09-2025",
      status: "Chưa đi",
    },
  ];
  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="fieldset h-full w-full max-w-[1100px] bg-base-200 border border-base-300 p-4 m-4 rounded-box flex flex-col items-center">
        <div className="sticky top-0 w-full z-10 bg-base-200">
          <NewSchedule />
          <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        </div>

        <div className="rounded-box border border-base-content/5 bg-base-100 w-full">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Timeline</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {timeline.map((item, index) => (
                <tr key={item.id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex flex-col">
                      <p className="text-lg font-bold">{item.location}</p>
                      <p className="text-sm text-gray-500">Từ {item.startDate}</p>
                      <p className="text-sm text-gray-500">Đến {item.endDate}</p>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`badge badge-soft text-xs md:textarea-md ${
                        item.status === "Đang đi" ? "badge-success" : "badge-warning"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </fieldset>
    </section>
  );
};

export default Schedule;
