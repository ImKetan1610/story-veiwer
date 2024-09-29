import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../API/userAuthAPI";
import { openModal } from "../../redux/modal/modalSlice";
import { REGISTER, LOGIN, ADD_STORY } from "../../globals";
import avatar from "../../assets/avatar.png";
import bookmarkImg from "../../assets/bookmark.jpg";
import closeIcon from "../../assets/close.png";

const MobileNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username } = useSelector((state) => state.userAuth);
  const [menuClick, setMenuClick] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  return (
    <header className="flex flex-row justify-between items-center p-4 shadow-lg">
      <div className="w-[100%] flex justify-end items-center">
        {!isAuthenticated ? (
          <>
            <div
              className="cursor-pointer"
              onClick={handleMenuClick}
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13H19M1 7H19M1 1H19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {menuClick && (
                <div className="absolute top-16 right-0 bg-white p-8 shadow-lg flex flex-col items-center z-10">
                  <button
                    className="mb-4 py-2 px-6 text-white bg-red-500 rounded-full font-bold transition-transform transform hover:scale-110"
                    onClick={() => dispatch(openModal(REGISTER))}
                  >
                    Register Now
                  </button>
                  <button
                    className="py-2 px-6 text-white bg-blue-500 rounded-full font-bold transition-transform transform hover:scale-110"
                    onClick={() => dispatch(openModal(LOGIN))}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className="cursor-pointer"
              onClick={handleMenuClick}
            >
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13H19M1 7H19M1 1H19"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {menuClick && (
                <div className="absolute top-16 right-0 bg-white p-8 shadow-lg flex flex-col items-center z-10">
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={() => navigate("/")}
                    />
                    <h4 className="mt-2">{username}</h4>
                  </div>
                  <button
                    className="mb-4 py-2 px-6 text-white bg-green-500 rounded-full font-bold transition-transform transform hover:scale-110"
                    onClick={() => navigate("/my/stories")}
                  >
                    Your Story
                  </button>
                  <button
                    className="mb-4 py-2 px-6 text-white bg-yellow-500 rounded-full font-bold transition-transform transform hover:scale-110 flex items-center"
                    onClick={() => navigate("/bookmarks")}
                  >
                    <img
                      src={bookmarkImg}
                      alt="bookmark"
                      className="w-4 h-4 mr-2"
                    />
                    Bookmarks
                  </button>
                  <button
                    className="mb-4 py-2 px-6 text-white bg-purple-500 rounded-full font-bold transition-transform transform hover:scale-110"
                    onClick={() => dispatch(openModal(ADD_STORY))}
                  >
                    Add Story
                  </button>
                  <button
                    className="py-2 px-6 text-white bg-red-500 rounded-full font-bold transition-transform transform hover:scale-110"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
        {menuClick && (
          <div
            className="absolute top-20 right-4 cursor-pointer z-20"
            onClick={handleMenuClick}
          >
            <img src={closeIcon} alt="close" />
          </div>
        )}
      </div>
    </header>
  );
};

export default MobileNavbar;
