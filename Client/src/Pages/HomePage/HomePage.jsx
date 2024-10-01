import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../../Components/Story/Categories/Categories.jsx";
import Stories from "../../Components/Story/StoryList/StoryList.jsx";
import { categories } from "../../globals.js";
import { endRequest } from "../../redux/story/storySlice.js";
import {
  getStoriesByCategory,
  getStories,
  getStoriesByUser,
} from "../../Components/API/storyAPI.js";
import Spinner from "../../Components/Spinner/Spinner.jsx";

const HomePage = () => {
  const dispatch = useDispatch();
  const { userId, isAuthenticated } = useSelector((state) => state.userAuth);
  const {
    storiesLoading,
    categoryLoading,
    newStory,
    userStories,
    userStoriesPage,
    newLike,
  } = useSelector((state) => state.story);

  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category !== "All") {
      dispatch(getStoriesByCategory(category, 1));
    } else {
      dispatch(getStories(1));
    }
  }, []);

  useEffect(() => {
    if (category !== "All") {
      dispatch(getStoriesByCategory(category, 1));
    } else {
      dispatch(getStories(1));
    }
  }, [category]);

  useEffect(() => {
    if (newStory) {
      dispatch(getStories(1));
      dispatch(getStoriesByUser(userId, userStoriesPage));
      dispatch(endRequest());
    }
  }, [newStory]);

  useEffect(() => {
    if (newLike) {
      dispatch(endRequest());
    }
  }, [newLike]);

  const handleCategoryClick = (category) => {
    setCategory(category);
  };

  return (
    <>
      <Categories
        categories={categories}
        handleCategoryClick={handleCategoryClick}
        selectedCategory={category}
      />
      {!storiesLoading && <Stories category={category} />}
      {storiesLoading && <Spinner />}
      {categoryLoading && <Spinner />}
    </>
  );
};

export default HomePage;
