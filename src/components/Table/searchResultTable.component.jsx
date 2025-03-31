import SearchResultRow from "./searchResultRow.component";

const SearchResult = ({ result }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th className="hidden md:table-cell">Tác giả</th>
            <th>Bài viết</th>
            <th className="hidden sm:table-cell">Thành phố</th>
            <th className="hidden sm:table-cell">Thể loại</th>
            <th>
              <i className="fa-solid fa-bars"></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {result.map((data) => {

          })} */}
          <SearchResultRow
            data={{
              author: {
                avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
                name: "Tuấn Ân",
              },
              post: "120k ăn sập Vũng Tàu, Có tin được không!!!!!!!!!!!!!!!!!!!!!!!",
              city: "Vũng Tàu",
              type: "Sống ảo",
            }}
          />
          <SearchResultRow
            data={{
              author: {
                avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
                name: "Tuấn Ân",
              },
              post: "120k ăn sập Vũng Tàu, Có tin được không!!!!!!!!!!!!!!!!!!!!!!!",
              city: "Vũng Tàu",
              type: "Sống ảo",
            }}
          />
          <SearchResultRow
            data={{
              author: {
                avatar: "https://img.daisyui.com/images/profile/demo/2@94.webp",
                name: "Tuấn Ân",
              },
              post: "120k ăn sập Vũng Tàu, Có tin được không!!!!!!!!!!!!!!!!!!!!!!!",
              city: "Vũng Tàu",
              type: "Sống ảo",
            }}
          />
        </tbody>
        <tfoot>
          <tr>
            <th className="hidden md:table-cell">Tác giả</th>
            <th>Bài viết</th>
            <th className="hidden sm:table-cell">Thành phố</th>
            <th className="hidden sm:table-cell">Thể loại</th>
            <th>
              <i className="fa-solid fa-bars"></i>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SearchResult;
