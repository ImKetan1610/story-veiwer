import { useSelector } from "react-redux";

const Slide = ({ slides, imgIndex }) => {
  const { isMobileScreen } = useSelector((state) => state.layout);
  return (
    <div className="slide w-full h-full">
      {slides &&
        slides.map((slide, index) => (
          <>
            <img
              key={slide._id}
              className={`${
                index === imgIndex ? "block" : "hidden"
              } w-full m-auto ${isMobileScreen ? "h-screen" : "h-[90vh]"}`}
              src={slide?.imageUrl}
              alt={`Slide ${index}`}
            />
            <div
              className={`${
                index === imgIndex ? "block" : "hidden"
              } absolute left-1/2 transform -translate-x-1/2 bottom-32`}
            >
              <div className="bg-black text-center p-5 opacity-75 w-[100%]">
                <h1 className="text-lg font-bold">
                  {slide?.heading}
                </h1>
                <p className="text-xs mt-4">
                  {slide?.description}
                </p>
              </div>
            </div>
          </>
        ))}
    </div>
  );
};

export default Slide;
