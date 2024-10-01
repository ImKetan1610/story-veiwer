import { useEffect, useState } from "react";
import { REGISTER, LOGIN } from "../../globals.js";
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../../redux/modal/modalSlice";
import { login, register, findUser } from "../API/userAuthAPI";

const Error = ({ error }) => {
  return (
    <div className="text-red-600 text-center" role="alert">
      {error}
    </div>
  );
};

const UserAuth = () => {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state) => state.modal);
  const { isAuthenticated, username: user } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    modalContent === REGISTER
      ? dispatch(openModal(REGISTER))
      : dispatch(openModal(LOGIN));
    if (isAuthenticated) {
      dispatch(closeModal());
      dispatch(findUser(user));
    }
  }, [dispatch, isAuthenticated, modalContent, user]);

  // States
  const [values, setValues] = useState({ username: "", password: "" });
  const { username, password } = values;
  const [error, setError] = useState(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalContent === LOGIN) {
      dispatch(login(values)).catch((error) => {
        setError(error);
      });
    }
    if (modalContent === REGISTER) {
      dispatch(register(values)).catch((error) => {
        setError(error);
      });
    }
  };

  return (
    <div
      className={`w-1/2 bg-white p-8 m-auto z-5 flex flex-col items-center justify-center border border-gray-300 rounded-lg shadow-md transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 ${
        modalContent === LOGIN || modalContent === REGISTER ? "flex" : "hidden"
      }`}
    >
      <h2 className="text-center text-2xl mb-4">
        {modalContent === LOGIN ? "Login" : "Register"} to Main
      </h2>
      <svg
        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-3 cursor-pointer"
        onClick={handleClose}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.38341 0 0 5.38341 0 12C0 18.6166 5.38341 24 12 24C18.6166 24 24 18.6166 24 12C24 5.38341 18.6166 0 12 0ZM12 1.84615C17.6178 1.84615 22.1538 6.38221 22.1538 12C22.1538 17.6178 17.6178 22.1538 12 22.1538C6.38221 22.1538 1.84615 17.6178 1.84615 12C1.84615 6.38221 6.38221 1.84615 12 1.84615ZM8.50962 7.18269L7.18269 8.50962L10.6731 12L7.18269 15.4904L8.50962 16.8173L12 13.3269L15.4904 16.8173L16.8173 15.4904L13.3269 12L16.8173 8.50962L15.4904 7.18269L12 10.6731L8.50962 7.18269Z"
          fill="#FF0000"
        />
      </svg>
      {/* form */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            name="username"
            onChange={handleChange}
            className="w-3/4 p-2 border border-black rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            name="password"
            onChange={handleChange}
            className="w-3/4 p-2 border border-black rounded"
          />
        </div>
        {error && <Error error={error} />}
        <div className="flex justify-center">
          <button type="submit" className="text-lg font-bold border-none rounded-full py-2 px-6 m-2 text-white bg-blue-500 hover:bg-blue-400 transition-all duration-300">
            {modalContent === REGISTER ? "Register" : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAuth;
