import Image from "./image.component";
import ImageLayout from "./imageLayout.component";

const PostImages = ({ images }) => {
  return images.length <= 2 ? (
    <div className="grow self-center w-full flex flex-col gap-y-0.5">
      <ImageLayout col={images.length}>
        {images.map((image, index) => (
          <Image key={`${image}_${index}`} image={image} />
        ))}
      </ImageLayout>
    </div>
  ) : (
    <div className="grow min-h-[300px] self-center w-full flex flex-col gap-y-0.5">
      <ImageLayout col={2}>
        {images.map((image, index) => {
          if (index < 2) {
            return <Image key={`${image}_${index}`} image={image} />;
          }
        })}
      </ImageLayout>
      <ImageLayout col={images.length > 5 ? 3 : images.length - 2}>
        {images.map((image, index) => {
          if (index === 4 && images.length > 5) {
            return (
              <Image
                key={`${image}_${index}`}
                image={image}
                isOverLayout={true}
                overAmount={images.length - 5}
              />
            );
          } else if (index >= 2 && index <= 4) {
            return <Image key={`${image}_${index}`} image={image} />;
          }
        })}
      </ImageLayout>
    </div>
  );
};

export default PostImages;
