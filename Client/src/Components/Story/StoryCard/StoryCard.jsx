import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal, openModal } from "../../../redux/modal/modalSlice";
import { getStory } from "../../API/storyAPI";

const StoryCard = ({ story }) => {
  const { isMobileScreen } = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, userId } = useSelector((state) => state.userAuth);

  const handleOpen = () => {
    navigate(`/story/${story._id}`);
  };

  const handleEditStory = (e) => {
    window.scrollTo(0, 0);
    e.preventDefault();
    dispatch(closeModal());
    dispatch(openModal("EDIT_STORY"));
    dispatch(getStory(story._id, userId));
  };

  const storyImg = story.slides[0]?.imageUrl;

  return (
    <div className="w-11/12 h-full cursor-pointer m-auto">
      <div
        className={`h-[400px] bg-cover bg-center rounded-lg mb-4 ${isMobileScreen ? "m-auto" : ""}`}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${storyImg})`,
        }}
        onClick={handleOpen}
      >
        <div className="relative top-3/4 p-4 text-white">
          <h3 className="text-xl font-semibold">
            {story.slides[0].heading && story.slides[0].heading.substring(0, 20)}
            {story.slides[0].heading.length > 20 && "..."}
          </h3>
          <p className="tracking-wide mt-1 text-xs">
            {story.slides[0].description.substring(0, 30)}
            {story.slides[0].description.length > 30 && "..."}
          </p>
        </div>
      </div>
      {isAuthenticated && userId && story.addedBy === userId && (
        <div
          className="relative left-[40%] top-[-2.1rem] inline-flex items-center p-2 pl-4 pr-4 bg-white rounded-full shadow-md cursor-pointer"
          onClick={handleEditStory}
        >
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.87868 4.8788C1.44129 4.31619 2.20435 4.00012 3 4.00012H4C4.55228 4.00012 5 4.44784 5 5.00012C5 5.55241 4.55228 6.00012 4 6.00012H3C2.73478 6.00012 2.48043 6.10548 2.29289 6.29302C2.10536 6.48055 2 6.73491 2 7.00012V16.0001C2 16.2653 2.10536 16.5197 2.29289 16.7072C2.48043 16.8948 2.73478 17.0001 3 17.0001H12C12.2652 17.0001 12.5196 16.8948 12.7071 16.7072C12.8946 16.5197 13 16.2653 13 16.0001V15.0001C13 14.4478 13.4477 14.0001 14 14.0001C14.5523 14.0001 15 14.4478 15 15.0001V16.0001C15 16.7958 14.6839 17.5588 14.1213 18.1214C13.5587 18.6841 12.7957 19.0001 12 19.0001H3C2.20435 19.0001 1.44129 18.6841 0.87868 18.1214C0.31607 17.5588 0 16.7958 0 16.0001V7.00012C0 6.20447 0.31607 5.44141 0.87868 4.8788Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7087 0.907224C14.29 0.326327 15.0782 0 15.9 0C16.7222 0 17.5107 0.326617 18.0921 0.908C18.6735 1.48938 19.0001 2.27791 19.0001 3.10011C19.0001 3.92192 18.6738 4.7101 18.0929 5.2914C18.0926 5.29167 18.0924 5.29194 18.0921 5.29221L16.8287 6.56017C16.7936 6.61201 16.753 6.66129 16.7071 6.70721C16.6621 6.75226 16.6138 6.79211 16.563 6.82676L9.70837 13.7059C9.52073 13.8943 9.26584 14.0001 9 14.0001H6C5.44772 14.0001 5 13.5524 5 13.0001V10.0001C5 9.73427 5.10585 9.47938 5.29416 9.29174L12.1733 2.43708C12.208 2.38632 12.2478 2.33805 12.2929 2.293C12.3388 2.24708 12.3881 2.20655 12.4399 2.17143L13.7079 0.908C13.7082 0.907742 13.7084 0.907483 13.7087 0.907224ZM13.0112 4.42556L7 10.4154V12.0001H8.58474L14.5745 5.98887L13.0112 4.42556ZM15.9862 4.57213L14.428 3.01387L15.1221 2.32221C15.3284 2.1159 15.6082 2 15.9 2C16.1918 2 16.4716 2.1159 16.6779 2.32221C16.8842 2.52852 17.0001 2.80834 17.0001 3.10011C17.0001 3.39187 16.8842 3.67169 16.6779 3.878L15.9862 4.57213Z"
              fill="black"
            />
          </svg>
          <div className="text-xs">Edit</div>
        </div>
      )}
    </div>
  );
};

export default StoryCard;
