import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Modal from "./Components/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { findUser } from "./Components/API/userAuthAPI";
import Spinner from "./Components/Spinner/Spinner";
import AddStory from "./Components/Story/StoryForm/StoryAdd.jsx";
import EditStory from "./Components/Story/StoryForm/StoryEdit.jsx";
import UserAuth from "./Components/UserAuth/UserAuth.jsx";
import { REGISTER, ADD_STORY, EDIT_STORY, LOGIN } from "./globals.js";
import ViewStory from "./components/Story/StoryDetail/StoryDetail.jsx";
import BookmarkPage from "./Pages/BookmarkPage/BookmarkPage.jsx";
import UserStories from "./Pages/UserStories/UserStories.jsx";
import PageNotFound from "./Components/PageNotFound/PageNotFound.jsx";

function App() {
  const dispatch = useDispatch();
  const { modalContent } = useSelector((state) => state.modal);
  const { loading } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(findUser());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="App">
      <Navbar />
      {modalContent === REGISTER && (
        <Modal>
          <UserAuth />
        </Modal>
      )}
      {modalContent === LOGIN && (
        <Modal>
          <UserAuth />
        </Modal>
      )}
      {modalContent === ADD_STORY && (
        <Modal>
          <AddStory />
        </Modal>
      )}
      {modalContent === EDIT_STORY && (
        <Modal>
          <EditStory />
        </Modal>
      )}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/story/:id"
          element={
            <Modal>
              <ViewStory />
            </Modal>
          }
        />
        <Route path="/bookmarks" element={<BookmarkPage />} />
        <Route path="/my/stories" element={<UserStories />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
