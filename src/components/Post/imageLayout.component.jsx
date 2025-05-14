const ImageLayout = ({ children, col }) => {
  return (
    <div
      style={{ gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))` }}
      className="grid w-full h-full gap-0.5"
    >
      {children}
    </div>
  );
};

export default ImageLayout;
