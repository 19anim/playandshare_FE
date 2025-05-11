import { useSelector } from "react-redux";
import { FaHouseChimney } from "react-icons/fa6";
import { FaFacebookF as Facebook } from "react-icons/fa6";
import { FaThreads as Thread } from "react-icons/fa6";
import { FaInstagram as Instagram } from "react-icons/fa6";
import { FaTiktok as Tiktok } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { updateUser, updateAvatar } from "../store/user";
import { useState } from "react";
import imageCompression from "browser-image-compression";

const iconMap = {
  Facebook,
  Instagram,
  Thread,
  Tiktok,
};
const MAX_SIZE_MB = 0.5;

const UserInfor = () => {
  const dispatch = useDispatch();
  const informationModalRef = useRef(null);
  const imageElementRef = useRef(null);
  const user = useSelector((state) => state.user);
  const { residence, phone, socialMedia, avatar } = user;
  const showInformationModal = () => {
    informationModalRef.current.showModal();
  };
  const [information, setInformation] = useState({
    residence: "",
    phone: "",
    socialMedia: [
      { platform: "Facebook", link: "" },
      { platform: "Instagram", link: "" },
      { platform: "Thread", link: "" },
      { platform: "Tiktok", link: "" },
    ],
  });

  const handleUploadClick = () => {
    imageElementRef.current.click();
  };

  useEffect(() => {
    setInformation((prev) => ({
      ...prev,
      residence: user.residence ? user.residence : "",
      phone: user.phone ? user.phone : "",
      socialMedia: user.socialMedia
        ? user.socialMedia
        : [
            { platform: "Facebook", link: "" },
            { platform: "Instagram", link: "" },
            { platform: "Thread", link: "" },
            { platform: "Tiktok", link: "" },
          ],
    }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInformation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (e) => {
    const { dataset, value } = e.target;
    const { platform } = dataset;
    setInformation((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((item) => {
        if (item.platform === platform) {
          return { ...item, link: value };
        }
        return item;
      }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(information));
    informationModalRef.current.close();
  };

  const handleUploadChange = async (e) => {
    const options = {
      maxSizeMB: MAX_SIZE_MB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const dataToSend = new FormData();
    const file = e.target.files[0];
    const compressedImage = await imageCompression(file, options);
    dataToSend.append("avatar", compressedImage);
    dispatch(updateAvatar(dataToSend));
  };

  return (
    <section className="w-full h-full flex justify-center items-center p-4">
      <fieldset className="dark:bg-zinc-800 dark:border-zinc-900 dark:text-white bg-bright border border-base-300 fieldset h-full w-full max-w-[600px] p-4 m-4 rounded-box flex flex-col items-center">
        <header className="text-center text-xl font-bold">Thông tin cá nhân</header>
        <div className="divider my-0 before:bg-[#9d9d9d] before:h-[0.05rem] after:bg-[#9d9d9d] after:h-[0.05rem]"></div>
        <section className="w-full flex flex-col gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <header className="text-xl font-bold">Ảnh đại diện</header>
            <input
              onChange={handleUploadChange}
              ref={imageElementRef}
              type="file"
              className="file-input hidden"
              accept="image/*"
            />
            <button onClick={handleUploadClick} className="btn w-fit">
              Chỉnh sửa
            </button>
          </div>
          {avatar ? (
            !user.loading ? (
              <div className="avatar">
                <div className="col-span-2 size-42 rounded-full">
                  <img src={avatar} alt="avatar" className="rounded-full size-42 object-cover" />
                </div>
              </div>
            ) : (
              <span className="loading loading-infinity loading-xl"></span>
            )
          ) : (
            <div className="skeleton size-42 rounded-full"></div>
          )}
        </section>

        <section className="w-full flex flex-col gap-4 items-center">
          <div className="flex justify-between items-center w-full">
            <header className="text-xl font-bold">Thông tin chung</header>
            <button onClick={showInformationModal} className="btn w-fit">
              Chỉnh sửa
            </button>
          </div>
          {avatar ? (
            <section className="w-full">
              <div className="text-lg flex gap-3 items-center">
                <FaHouseChimney />
                <p>
                  Sống tại <span className="font-semibold capitalize">{residence}</span>
                </p>
              </div>
              <div className="text-lg flex gap-3 items-center">
                <FaPhone />
                <p>
                  Số điện thoại <span className="font-semibold">{phone}</span>
                </p>
              </div>
              {socialMedia.map((item) => {
                const IconMedia = iconMap[item.platform];
                return (
                  <div key={item.platform} className="text-lg flex gap-3 items-center">
                    <IconMedia />
                    <p>
                      {item.link !== "" ? (
                        <a
                          target="_blank"
                          className="text-blue-500"
                          href={`https://${item.platform}.com/${
                            item.platform === "Tiktok" ? "@" : ""
                          }${item.link}`}
                        >
                          <span className="font-semibold">{item.link}</span>
                        </a>
                      ) : (
                        <>
                          Chưa có <span className="font-semibold">{item.platform}</span> nào
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </section>
          ) : (
            <div className="flex w-[70%] flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          )}
        </section>
      </fieldset>
      <dialog ref={informationModalRef} className="modal">
        <div className="modal-box flex flex-col w-fit">
          <form method="dialog" className="self-end pb-3">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-fit">
            <label className="input w-full">
              <FaHouseChimney className="text-xl" />
              <span className="label">Thành phố:</span>
              <input
                type="text"
                name="residence"
                onChange={handleChange}
                value={information.residence}
              />
            </label>

            <label className="input w-full">
              <FaPhone className="text-xl" />
              <span className="label">Số điện thoại:</span>
              <input type="text" name="phone" onChange={handleChange} value={information.phone} />
            </label>

            <label className="input w-full">
              <Facebook className="text-xl" />
              <span className="label">Username:</span>
              <input
                data-platform="Facebook"
                type="text"
                onChange={handleSocialMediaChange}
                value={information.socialMedia[0].link}
              />
            </label>

            <label className="input w-full">
              <Instagram className="text-xl" />
              <span className="label">Username:</span>
              <input
                data-platform="Instagram"
                type="text"
                onChange={handleSocialMediaChange}
                value={information.socialMedia[1].link}
              />
            </label>

            <label className="input w-full">
              <Thread className="text-xl" />
              <span className="label">Username:</span>
              <input
                data-platform="Thread"
                type="text"
                onChange={handleSocialMediaChange}
                value={information.socialMedia[2].link}
              />
            </label>

            <label className="input w-full">
              <Tiktok className="text-xl" />
              <span className="label">Username:</span>
              <input
                data-platform="Tiktok"
                type="text"
                onChange={handleSocialMediaChange}
                value={information.socialMedia[3].link}
              />
            </label>
            <button type="submit" className="btn btn-success">
              Cập nhật
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default UserInfor;
