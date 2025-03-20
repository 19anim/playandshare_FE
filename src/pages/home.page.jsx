const HomePage = () => {
  const img =
    "https://res.cloudinary.com/dk6nhyxaq/image/upload/f_auto,q_auto/v1/Playandshare/tiozfywkkqgcsudtimvi";

  return (
    <div
      style={{ backgroundImage: `url('${img}')` }}
      className="h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <div className="hero">
          <div className="hero-content"></div>
        </div>
        <div className="join max-w-[700px] min-w-[350px] w-[50%]">
          <label className="floating-label w-full">
            <span>Bạn đang du lịch ở đâu?</span>
            <input
              type="text"
              placeholder="Hồ Chí Minh, Đà Lạt, ..."
              className="input input-lg w-full h-[50px] rounded-[10px_0_0_10px] !outline-none border-transparent"
            />
          </label>
          <button className="btn btn-neutral join-item h-[50px]">Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
