interface Props {
  image: string;
  isLoading?: boolean;
}

const Image: React.FC<Props> = ({ image, isLoading }) => {
  return (
    <div className="border-dashed border rounded-2xl border-amber-300 flex justify-center items-center md:h-full h-[400px]">
      {isLoading ? (
        <p className="text-lg text-gray-400">Generating your image...</p>
      ) : image ? (
        <img
          src={image}
          alt="post"
          className="w-full h-full object-contain rounded-2xl"
        />
      ) : (
        <p className="text-lg text-gray-400">
          Write your prompt to generate image
        </p>
      )}
    </div>
  );
};

export default Image;
