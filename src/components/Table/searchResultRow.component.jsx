const SearchResultRow = ({ data }) => {
  const { author, post, city, type } = data;
  return (
    <tr>
      <td className="hidden md:table-cell">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={author.avatar} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{author.name}</div>
          </div>
        </div>
      </td>
      <td className="font-bold">{post}</td>
      <td className="hidden sm:table-cell">{city}</td>
      <td className="hidden sm:table-cell">{type}</td>
      <th>
        <button className="btn btn-xs w-[60px]">Chi tiết</button>
      </th>
    </tr>
  );
};

export default SearchResultRow;
