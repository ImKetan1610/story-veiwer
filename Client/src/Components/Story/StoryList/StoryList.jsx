import { useEffect } from "react";
import Button from "../../Button/Button";
import StoryCard from "../StoryCard/StoryCard.jsx";
import StorySpinner from "../../Spinner/StorySpinner.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getStories,
  getStoriesByCategory,
  getStoriesByUser,
} from "../../API/storyAPI";

const Stories = ({ category }) => {
  const dispatch = useDispatch();
  const { isMobileScreen } = useSelector((state) => state.layout);
  const { userId, isAuthenticated } = useSelector((state) => state.userAuth);
  const page = useSelector((state) => state.story.page) || 1;
  const {
    stories,
    categoryStories,
    userStories,
    newStory,
    userStoriesPage,
    categoryLoading,
    storiesLoading,
  } = useSelector((state) => state.story);
  let catLimit = {
    medical: 4,
    fruits: 4,
    world: 4,
    india: 4,
    food: 4,
  };

  // Fetch stories on page load
  useEffect(() => {
    if (!stories && category === "All") {
      dispatch(getStories(page));
    }
    if (!stories && category !== "All") {
      dispatch(getStoriesByCategory(page));
    }
  }, []);

  // If new story added, get stories again
  useEffect(() => {
    if (newStory) {
      dispatch(getStories(page));
    }
  }, [newStory]);

  // If user is authorized then fetch user posted stories
  useEffect(() => {
    if (isAuthenticated && !userStories && userId) {
      dispatch(getStoriesByUser(userId, userStoriesPage));
    }
  }, [isAuthenticated, userId, userStories, userStoriesPage, dispatch]);

  // Render stories
  const renderStories = (storyArray, isLoading, pageFunction) => (
    <>
      {category == "All" && storyArray.length === 0 && (
        <h1 className="text-slate-400 font-bold text-lg text-center mb-[8rem] mt-[8rem] capitalize">
          No stories found!
        </h1>
      )}
      
      <div
        className={`grid ${
          isMobileScreen ? "grid-cols-1" : "grid-cols-4"
        } gap-4`}
      >
        {storyArray &&
          storyArray.map((story) =>
            isLoading ? (
              <StorySpinner key={story._id} />
            ) : (
              <StoryCard key={story._id} story={story} />
            )
          )}
      </div>
      {storyArray && storyArray.length > 0 && (
        <div className="flex justify-center mt-4">
          <Button text="See more..." myFunction={pageFunction} />
        </div>
      )}
    </>
  );

  // Render authorized user stories
  const renderUserStories = () => (
    <>
      {userStories && userStories.length >= 0 && (
        <h2 className="text-center font-bold text-2xl my-4">Your Stories</h2>
      )}
      {renderStories(userStories, false, () =>
        dispatch(getStoriesByUser(userId, userStoriesPage + 1))
      )}
    </>
  );

  return (
    <div className="m-4">
      {category === "All" && (
        <>
          {/* Authorized user stories */}
          {isAuthenticated && renderUserStories()}

          {/* Fetch all stories */}
          <>
            {console.log(Object.keys(stories))}
            {Object.keys(stories).map((key) => (
              <div key={key}>
                <h2 className="text-center text-2xl my-4 font-bold capitalize">
                  Top Stories About {key}
                </h2>
                {renderStories(stories[key], storiesLoading, () =>
                  Object.keys(catLimit).forEach((cat) => {
                    if (cat === key) {
                      catLimit[cat] = catLimit[cat] + 4;
                      dispatch(getStories(page + 1, catLimit[cat], cat));
                    }
                  })
                )}
              </div>
            ))}
          </>
        </>
      )}

      {/* Fetch story based on selected category */}
      {category !== "All" && (
        <div>
          <h2 className="text-center text-xl my-4 font-bold capitalize">
            Top Stories About {category}
          </h2>
          {renderStories(categoryStories, categoryLoading, () =>
            dispatch(getStoriesByCategory(category, page + 1))
          )}
          {categoryStories.length <= 0 && (
            <h1 className="text-slate-400 text-lg text-center mb-14 mt-14 capitalize font-bold">
              No stories found!
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Stories;
