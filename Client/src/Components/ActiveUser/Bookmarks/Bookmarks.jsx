import { useEffect } from "react";
import Button from "../../Button/Button";
import Spinner from "../../Spinner/Spinner";
import StoryCard from "../../Story/StoryCard/StoryCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookmarks } from "../../API/storyAPI";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, isAuthenticated } = useSelector((state) => state.userAuth);
  const { bookmarks, bookmarksLoading } = useSelector((state) => state.story);

  useEffect(() => {
    dispatch(getBookmarks(userId));
  }, []);

  if (!isAuthenticated) {
    return (
      <h1 className="text-center mt-8 text-2xl font-bold text-gray-800">
        Please login to see your bookmarks
      </h1>
    );
  }
  if (bookmarksLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-center mt-8 text-3xl font-semibold text-gray-900">
        Your Bookmarks
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center mt-6">
        {bookmarks &&
          bookmarks.map((bookmark) => (
            <StoryCard story={bookmark} key={bookmark._id} />
          ))}

        {bookmarks.length === 0 && (
          <div className="bg-blue-400 text-white p-4 mt-6 rounded-lg text-center">
            <h1 className="text-xl mb-4">You have no bookmarks yet!</h1>
            <Button text={"Go to Home"} myFunction={() => navigate("/")} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
