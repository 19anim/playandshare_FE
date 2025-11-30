import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { LuCirclePlus } from "react-icons/lu";
import { LuCircleMinus } from "react-icons/lu";
import { LuCircleCheck } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { removeMultiExpenses } from "../store/expense";
import AddCalculatorModal from "../components/Modal/addCalculatorModal.component";
import ConfirmationModal from "../components/Modal/confirmation.component";
import { fetchExpenses } from "../store/expense";

const Calculator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { expenses, loading } = useSelector((state) => state.expense);
  const [multiSelect, setMultiSelect] = useState(false);
  const addNewCalculatorModalRef = useRef(null);
  const confirmationModalRef = useRef(null);
  const [newCalculator, setNewCalculator] = useState({
    title: "",
    participants: [],
    createdBy: null,
  });
  const [selectedCalculators, setSelectedCalculators] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, []);

  const handleAddNewCalculator = () => {
    if (user) {
      setNewCalculator((prev) => {
        return { ...prev, participants: [{ name: user.displayName, balance: 0, paid: 0 }] };
      });
    }

    addNewCalculatorModalRef.current.showModal();
  };

  const handleSingleSelect = (e, id) => {
    if (e.target.checked) {
      setSelectedCalculators((prev) => [...prev, id]);
    } else {
      setSelectedCalculators((prev) => prev.filter((calcId) => calcId !== id));
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll((prev) => !prev);
    if (e.target.checked) {
      const allIds = expenses.map((exp) => exp._id);
      setSelectedCalculators(allIds);
    } else {
      setSelectedCalculators([]);
    }
  };

  const handleDeleteSelectedCalculators = () => {
    if (selectedCalculators.length > 0) {
      dispatch(
        removeMultiExpenses({
          ids: selectedCalculators,
        })
      );
      setSelectedCalculators([]);
      setMultiSelect(false);
    }

    confirmationModalRef.current.close();
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
              onClick={() => {
                setMultiSelect(true);
                setSelectAll(false);
              }}
            >
              <LuCircleMinus /> <span className="textarea-md">Xóa nhiều mục</span>
            </button>
          </>
        ) : (
          <>
            <button
              className="ml-4 mt-4 btn btn-error btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Tiến hành xóa"
              onClick={() => confirmationModalRef.current.showModal()}
            >
              <LuCircleCheck /> <span className="textarea-md">Tiến hành xóa</span>
            </button>
            <button
              className="ml-4 mt-4 btn btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
              title="Hủy bỏ"
              onClick={() => {
                setMultiSelect(false);
                setSelectAll(false);
                setSelectedCalculators([]);
              }}
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
                  <input
                    onChange={handleSelectAll}
                    type="checkbox"
                    className="checkbox"
                    checked={selectAll}
                  />
                </label>
              </th>
              <th className="min-w-[180px]">Tên chi tiêu</th>
              <th className="min-w-[180px]">Người tham gia</th>
              <th className="min-w-[100px]">Số dư</th>
              <th className="w-[96px]"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="skeleton h-12"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="skeleton h-12"></div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    <div className="skeleton h-12"></div>
                  </td>
                </tr>
              </>
            ) : expenses.length > 0 ? (
              expenses.map((r) => (
                <tr key={r._id}>
                  <th
                    className={`transition-all duration-300 ease-in-out transform origin-left ${
                      multiSelect
                        ? "opacity-100 scale-100 w-12 px-2"
                        : "opacity-0 scale-75 w-0 px-0 pointer-events-none"
                    }`}
                  >
                    <label>
                      <input
                        onChange={(e) => {
                          handleSingleSelect(e, r._id);
                        }}
                        type="checkbox"
                        className="checkbox"
                        checked={selectedCalculators.includes(r._id)}
                      />
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
                      {r.participants.map((p) => p.name).join(", ")}
                    </div>
                  </td>
                  <td className="max-w-[120px]">
                    <div
                      className={`truncate ${
                        r.balance >= 0 ? "text-success-content" : "text-error-content"
                      } font-semibold`}
                    >
                      {r.balance} VNĐ
                    </div>
                  </td>

                  <th>
                    <Link className="btn btn-ghost btn-xs" to={r._id}>
                      Chi tiết
                    </Link>
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  <div className="text-gray-500">Chưa có khoản chi nào, tạo mới nhe!!!</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full flex flex-col gap-3 md:hidden">
        <button
          onClick={handleAddNewCalculator}
          className="btn btn-success btn-sm text-xl self-start hover:scale-110 hover:animate-wiggle transition-all duration-300"
          title="Thêm khoản chi"
        >
          <LuCirclePlus />
        </button>
        {loading ? (
          <>
            <div className="w-full p-4 rounded-lg shadow animate-pulse">
              <div className="skeleton h-6 w-3/4 mb-4"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>
            <div className="w-full p-4 rounded-lg shadow animate-pulse">
              <div className="skeleton h-6 w-3/4 mb-4"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>
            <div className="w-full p-4 rounded-lg shadow animate-pulse">
              <div className="skeleton h-6 w-3/4 mb-4"></div>
              <div className="skeleton h-4 w-full mb-2"></div>
              <div className="skeleton h-4 w-5/6"></div>
            </div>
          </>
        ) : expenses.length > 0 ? (
          expenses.map((r) => (
            <article
              key={r._id}
              className="bg-base-200 border border-base-300 rounded-lg p-3 shadow-sm"
              aria-labelledby={`title-${r.id}`}
            >
              <header id={`title-${r.id}`} className="font-bold text-sm mb-1">
                {r.title}
              </header>

              <div className="text-sm text-gray-600 mb-2">
                <div className="font-semibold text-xs mb-1">Người tham gia</div>
                <div className="truncate w-full max-w-[300px]" title={r.participants}>
                  {r.participants.map((p) => p.name).join(", ")}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-gray-500">Số dư</div>
                  <div className="font-medium">{r.balance} VNĐ</div>
                </div>

                <Link className="btn btn-s" to={r._id}>
                  Chi tiết
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="text-gray-500">Chưa có khoản chi nào, tạo mới nhe!!!</div>
        )}
      </div>
      <AddCalculatorModal
        ref={addNewCalculatorModalRef}
        calculatorData={newCalculator}
        setCalculatorData={setNewCalculator}
      />
      <ConfirmationModal
        ref={confirmationModalRef}
        title="Xóa chi tiêu"
        message="Bạn có chắc chắn muốn xóa (các) chi tiêu này?"
        agreeMessage="Xóa"
        disagreeMessage="Hủy bỏ"
        onAgree={handleDeleteSelectedCalculators}
      />
    </section>
  );
};

export default Calculator;
