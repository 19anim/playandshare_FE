import { useState } from "react";
import { Link } from "react-router-dom";

const Calculator = () => {
  const [selectAll, setSelectAll] = useState(false);
  const rows = [
    {
      id: 1,
      title: "Chi tiêu đà lạt 11/2025",
      participants: "Zemlak, Daniel and Leannonw, Zemlak, Daniel and Leannonw",
      balance: "1000000 VND",
    },
  ];
  return (
    <section className="w-full h-full flex justify-center items-start p-4">
      <div className="overflow-x-auto w-full hidden md:block">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
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
            {rows.map((r) => (
              <tr key={r.id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
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
        {rows.map((r) => (
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
    </section>
  );
};

export default Calculator;
