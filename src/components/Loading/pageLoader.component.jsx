const PageLoader = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <span className="sr-only">Loading page</span>
    </div>
  );
};

export default PageLoader;
