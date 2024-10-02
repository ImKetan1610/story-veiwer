import { useSelector } from "react-redux";

const Button = ({ myFunction, color, text, children, size }) => {
  const { isMobileScreen } = useSelector((state) => state.layout);

  return (
    <button
      className={`${
        size === "small"
          ? "px-3 py-1 text-sm mr-2"
          : "px-4 py-2 text-base"
      } inline-flex items-center justify-center rounded-3xl font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110 ${
        isMobileScreen ? "mr-1 mt-2 text-xs" : ""
      }`}
      style={{ backgroundColor: color ? color : "#FF7373" }}
      onClick={() => {
        myFunction();
      }}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
