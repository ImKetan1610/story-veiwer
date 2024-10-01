import { useSelector } from "react-redux";

const Modal = ({ children }) => {
  const { modal } = useSelector((state) => state.modal);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-10 transition-opacity duration-300 ${
        modal ? "bg-black bg-opacity-60" : "bg-transparent"
      } flex justify-center items-center`}
    >
      {children}
    </div>
  );
};

export default Modal;
