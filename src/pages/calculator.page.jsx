import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuCirclePlus } from "react-icons/lu";
import { LuCircleMinus } from "react-icons/lu";
import { LuCircleCheck } from "react-icons/lu";
import { useSelector } from "react-redux";
import AddCalculatorModal from "../components/Modal/addCalculatorModal.component";

const Calculator = () => {
  const user = useSelector((state) => state.user);
  const [multiSelect, setMultiSelect] = useState(false);
  const addNewCalculatorModalRef = useRef(null);
  const [newCalculator, setNewCalculator] = useState({
    title: "",
    participants: [],
  });
  const rows = [
    {
      id: 1,
      title: "Chi tiêu đà lạt 11/2025",
      participants: "Zemlak, Daniel and Leannonw, Zemlak, Daniel and Leannonw",
      balance: "1000000 VND",
    },
    {
      id: 2,
      title: "Chi tiêu đà lạt 11/2025",
      participants: "Zemlak, Daniel and Leannonw, Zemlak, Daniel and Leannonw",
      balance: "1000000 VND",
    },
    {
      id: 3,
      title:
        "Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025Chi tiêu đà lạt 11/2025 Chi tiêu đà lạt 11/2025",
      participants: "Zemlak, Daniel and Leannonw, Zemlak, Daniel and Leannonw",
      balance: "1000000 VND",
    },
    {
      id: 4,
      title: "Chi tiêu đà lạt 11/2025",
      participants: "Zemlak, Daniel and Leannonw, Zemlak, Daniel and Leannonw",
      balance: "1000000 VND",
    },
  ];
  const [calculators, setCalculators] = useState(rows);

  const handleAddNewCalculator = () => {
    if (user) {
      setNewCalculator((prev) => {
        return { ...prev, participants: [user.displayName] };
      });
    }

    addNewCalculatorModalRef.current.showModal();
  };
  return (
    <section className="w-full h-full flex justify-center items-start p-4">
      <div className="overflow-x-auto w-full hidden md:block">
        {!multiSelect ? (
          <>
            <button
              className="ml-4 mt-4 btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Thêm mục chi"
              onClick={handleAddNewCalculator}
            >
              <LuCirclePlus /> <span className="textarea-md">Thêm mục chi</span>
            </button>
            <button
              className="ml-4 mt-4 btn btn-error btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Xóa nhiều mục"
              onClick={() => setMultiSelect(true)}
            >
              <LuCircleMinus /> <span className="textarea-md">Xóa nhiều mục</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="ml-4 mt-4 btn btn-error btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Tiến hành xóa"
              onClick={() => {}}
            >
              <LuCircleCheck /> <span className="textarea-md">Tiến hành xóa</span>
            </button>
            <button
              className="ml-4 mt-4 btn btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Hủy bỏ"
              onClick={() => setMultiSelect(false)}
            >
              <LuCircleCheck /> <span className="textarea-md">Hủy bỏ</span>
            </button>
          </>
        )}
        <table className="table w-full">
          <thead>
            <tr>
              <th
                className={`transition-all duration-300 ease-in-out transform origin-left ${
                  multiSelect
                    ? "opacity-100 scale-100 w-12 px-2"
                    : "opacity-0 scale-75 w-0 px-0 pointer-events-none"
                }`}
              >
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="min-w-[180px]">Tên chi tiêu</th>
              <th className="min-w-[180px]">Người tham gia</th>
              <th className="min-w-[100px]">Số dư</th>
              <th className="w-[96px]"></th>
            </tr>
          </thead>
          <tbody>
            {calculators.map((r) => (
              <tr key={r.id}>
                <th
                  className={`transition-all duration-300 ease-in-out transform origin-left ${
                    multiSelect
                      ? "opacity-100 scale-100 w-12 px-2"
                      : "opacity-0 scale-75 w-0 px-0 pointer-events-none"
                  }`}
                >
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="max-w-[220px]">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{r.title}</div>
                    </div>
                  </div>
                </td>
                <td className="max-w-[220px]">
                  <div
                    className="truncate whitespace-nowrap overflow-hidden"
                    title={r.participants}
                  >
                    {r.participants}
                  </div>
                </td>
                <td className="max-w-[120px]">
                  <div className="truncate">{r.balance}</div>
                </td>

                <th>
                  <Link className="btn btn-ghost btn-xs" to="detailID">
                    Chi tiết
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full flex flex-col gap-3 md:hidden">
        <button
          className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Thêm khoản chi"
        >
          <LuCirclePlus />
        </button>
        {calculators.map((r) => (
          <article
            key={r.id}
            className="bg-base-200 border border-base-300 rounded-lg p-3 shadow-sm"
            aria-labelledby={`title-${r.id}`}
          >
            <header id={`title-${r.id}`} className="font-bold text-sm mb-1">
              {r.title}
            </header>

            <div className="text-sm text-gray-600 mb-2">
              <div className="font-semibold text-xs mb-1">Người tham gia</div>
              <div className="truncate w-full max-w-[300px]" title={r.participants}>
                {r.participants}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs text-gray-500">Số dư</div>
                <div className="font-medium">{r.balance}</div>
              </div>

              <Link className="btn btn-s" to="detailID">
                Chi tiết
              </Link>
            </div>
          </article>
        ))}
      </div>
      <AddCalculatorModal
        ref={addNewCalculatorModalRef}
        calculatorData={newCalculator}
        setCalculatorData={setNewCalculator}
        setCalculators={setCalculators}
      />
    </section>
  );
};

export default Calculator;
