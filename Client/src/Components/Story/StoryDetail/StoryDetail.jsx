import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { closeModal, openModal } from "../../../redux/modal/modalSlice";
import { likeStory, bookmarkStory, getStory } from "../../API/storyAPI";
import StorySlider from "../StorySlider/StorySlider.jsx";
import shareIcon from "../../../assets/share.svg";
import Spinner from "../../Spinner/Spinner";

const ViewStory = () => {
  const { isMobileScreen } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const storyId = id;
  const { story, storyLoading, liked, bookmarked, totalLikes, newLike } =
    useSelector((state) => state.story);
  const { isAuthenticated, userId, loading } = useSelector(
    (state) => state.userAuth
  );

  useEffect(() => {
    if (!loading) {
      handleFetchStory();
    }
    dispatch(openModal("VIEW_STORY"));
    return () => dispatch(closeModal());
  }, [isAuthenticated, dispatch, loading]);

  const handleFetchStory = async () => {
    dispatch(getStory(storyId, userId));
  };

  const handleLike = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(likeStory(storyId, userId));
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      navigate("/");
      dispatch(openModal("LOGIN"));
    } else {
      dispatch(bookmarkStory(storyId, userId));
    }
  };

  const handleShareStory = () => {
    const url = window.location.href;
    window.navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Copied to clipboard successfully!", {
          position: "top-center",
        });
      })
      .catch((error) => {
        toast.error("Failed to copy to clipboard", {
          position: "top-center",
        });
      });
  };

  if (storyLoading || loading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen text-white flex flex-col justify-center items-center overflow-hidden">
      <div
        className={`${
          isMobileScreen ? "w-full" : "w-1/3"
        } h-screen flex flex-col justify-center items-center relative`}
      >
        {/* Top buttons */}
        <div className="absolute top-10 w-full px-4 flex justify-between items-center bg-gradient-to-b from-black to-transparent z-10">
          <div className="cursor-pointer p-4" onClick={() => navigate("/")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 17L-1 -1M17 -1L-1 17"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="cursor-pointer p-4" onClick={handleShareStory}>
            <img src={shareIcon} alt="shareIcon" />
          </div>
        </div>

        {story && <StorySlider slides={story.slides} />}

        {/* Bottom buttons */}
        <div className="absolute bottom-0 w-full px-4 flex justify-between items-center bg-gradient-to-t from-black to-transparent z-10">
          {/* Bookmark button */}
          <div className="cursor-pointer p-4">
            <svg
              onClick={handleBookmark}
              width="20"
              height="25"
              viewBox="0 0 20 25"
              fill={bookmarked ? "blue" : "white"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.1795 24.5071L9.58974 17.3148L0 24.5071V0H19.1795V24.5071Z"
                fill={bookmarked ? "blue" : "white"}
              />
            </svg>
          </div>
          {/* Like button */}
          <div className="cursor-pointer p-4 flex items-center space-x-2">
            <svg
              onClick={handleLike}
              width="36"
              height="27"
              viewBox="0 0 36 27"
              fill={liked ? "red" : "white"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.207 26.0699L12.147 24.1946C4.83039 17.5599 0 13.1699 0 7.81387C0 3.42389 3.4381 0 7.81386 0C10.2859 0 12.6585 1.15077 14.207 2.95506C15.7556 1.15077 18.1282 0 20.6002 0C24.976 0 28.4141 3.42389 28.4141 7.81387C28.4141 13.1699 23.5837 17.5599 16.267 24.1946L14.207 26.0699Z"
                fill={liked ? "red" : "white"}
              />
            </svg>
            <p>{totalLikes + (newLike ? 1 : 0)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStory;
