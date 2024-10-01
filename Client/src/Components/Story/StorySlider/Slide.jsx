import { useSelector } from "react-redux";

const Slide = ({ slides, imgIndex }) => {
  const { isMobileScreen } = useSelector((state) => state.layout);
  return (
    <div className="w-full h-full">
      {slides &&
        slides.map((slide, index) => (
          <>
            <img
              key={slide._id}
              className={`${index === imgIndex ? "block" : "hidden"} w-full ${
                isMobileScreen ? "h-screen" : "h-[90vh]"
              }`}
              src={slide?.imageUrl}
              alt={`Slide ${index}`}
            />
            <div
              className={`${
                index === imgIndex ? "block" : "hidden"
              } absolute left-1/2 transform -translate-x-1/2 bottom-32`}
            >
              <h1 className="text-4xl font-bold">{slide?.heading}</h1>
              <p className="text-lg mt-4">{slide?.description}</p>
            </div>
          </>
        ))}
    </div>
  );
};

export default Slide;
