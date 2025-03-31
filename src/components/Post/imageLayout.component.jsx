const ImageLayout = ({ children, col }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${col}, minmax(0px, 1fr))` }}
      className="grid w-full grow gap-0.5"
    >
      {children}
    </div>
  );
};

export default ImageLayout;
