const Progress = ({ images, progressBars }) => {
  return (
    <div className="w-1/3 absolute bg-gradient-to-b from-black via-black to-gray-900 flex justify-between">
      {progressBars &&
        progressBars.map((bar) => (
          <div
            key={bar.id}
            className="w-1/6 h-1 mx-4 bg-gray-400/50 overflow-hidden"
            style={{
              width: images
                ? images.length === 1
                  ? "100%"
                  : `${100 / (images.length - 1)}%`
                : "0%",
            }}
          >
            <div
              className={`h-full bg-white transition-width duration-100 ${
                bar.completed ? "w-full" : ""
              }`}
              style={{ width: `${bar.progress}%` }}
            ></div>
            {bar.progress === 0 && (
              <img
                src={bar.image}
                alt={`Image ${bar.id}`}
                className="w-[600px] h-[600px]"
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Progress;
