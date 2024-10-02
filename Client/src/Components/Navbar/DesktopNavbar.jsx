import { useState } from "react";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../API/userAuthAPI";
import { openModal } from "../../redux/modal/modalSlice";
import { REGISTER, LOGIN, ADD_STORY } from "../../globals";
import avatar from "../../assets/avatar.png";
import bookmarkImg from "../../assets/bookmark.jpg";

const DesktopNavbar = () => {
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
    <>
      <header className="flex justify-between items-center p-3 shadow-md">
        <div className="flex w-[100%] justify-end items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Button
                text="Register Now"
                myFunction={() => dispatch(openModal(REGISTER))}
                size="small"
              />
              <Button
                text="Sign In"
                myFunction={() => dispatch(openModal(LOGIN))}
                size="small"
                color="#73abff"
              />
            </>
          ) : (
            <>
              <Button
                text="Bookmarks"
                myFunction={() => navigate("/bookmarks")}
                size="small"
              >
                <img
                  src={bookmarkImg}
                  alt="bookmarkImg"
                  className="w-4 mr-1"
                />
              </Button>

              <Button
                text="Add story"
                myFunction={() => dispatch(openModal(ADD_STORY))}
                size="small"
              />
              <div>
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </div>
              <div className="cursor-pointer relative" onClick={handleMenuClick}>
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
                  <div className="absolute right-0 mt-2 p-4 bg-white shadow-md flex flex-col items-center z-50">
                    <h4 className="mb-2">{username}</h4>
                    <Button text="Logout" myFunction={handleLogout} />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default DesktopNavbar;
