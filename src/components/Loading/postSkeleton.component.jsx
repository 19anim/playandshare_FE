const PostSkeleton = () => {
  return (
    <div className="mb-4 break-inside-avoid overflow-hidden rounded-box bg-base-100">
      <div className="skeleton h-64 w-full rounded-none"></div>
      <div className="space-y-3 p-4">
        <div className="skeleton h-4 w-2/3"></div>
        <div className="skeleton h-3 w-full"></div>
        <div className="skeleton h-3 w-1/2"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
