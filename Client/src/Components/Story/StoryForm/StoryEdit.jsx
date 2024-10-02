import { useEffect, useState, useRef } from "react"; // Add useRef
import Button from "../../Button/Button";
import SlideForm from "./SlideForm.jsx";
import Spinner from "../../Spinner/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { editStorySuccess } from "../../../redux/story/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/modal/modalSlice";
import { EDIT_STORY } from "../../../globals.js";
import { useNavigate } from "react-router-dom";


const StoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalContent } = useSelector((state) => state.modal);
  const { user } = useSelector((state) => state.userAuth);
  const { isMobileScreen } = useSelector((state) => state.layout);
  const { story, storyLoading } = useSelector((state) => state.story);
  
  const initialSlides = story && story.slides ? story.slides : [{}, {}, {}];
  const [slides, setSlides] = useState(initialSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState("");

  const modalRef = useRef(); // Create a ref for the modal

  useEffect(() => {
    if (!storyLoading && story) {
      setSlides(story.slides);
    }
  }, [storyLoading]);

  useEffect(() => {
    setCurrentSlide(currentSlide);
  }, [currentSlide]);

  useEffect(() => {
    if (slides.length > 6) {
      alert("Please remove slides");
    }
    if (slides.length < 3) {
      alert("Please add slides");
    }
  }, [slides]);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) =>
        i === index ? { ...slide, [name]: value } : slide
      )
    );
  };

  const handleSubmit = async () => {
    const { VITE_BACKEND_URL } = import.meta.env;
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const hasErrors = slides.some((slide, index) => {
        if (
          Object.keys(slide).length === 0 ||
          slide.heading?.trim() === "" ||
          slide.description?.trim() === "" ||
          slide.imageUrl?.trim() === "" ||
          slide.category?.trim() === ""
        ) {
          setError(slide, index);
        }
        return (
          Object.keys(slide).length === 0 ||
          slide.heading?.trim() === "" ||
          slide.description?.trim() === "" ||
          slide.imageUrl?.trim() === "" ||
          slide.category?.trim() === ""
        );
      });

      if (hasErrors) {
        setError("Please fill out all fields");
        return;
      }
      if (slides.length < 3) {
        setError("Please add at least 3 slides");
        return;
      } else if (slides.length > 6) {
        setError("Please remove slides");
        return;
      }

      const response = await axios.put(
        `${VITE_BACKEND_URL}/api/story/edit/${story._id}`,
        {
          slides,
          addedBy: user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in Authorization header
          },
        }
      );

      if (response.data.success) {
        toast.success("Story edited Successfully", {
          position: "top-center",
        });
      }
      dispatch(editStorySuccess());
      dispatch(closeModal());
    } catch (error) {
      toast.error("Error adding story", { position: "top-center" });
    }
  };

  const handleAddSlide = () => {
    if (slides.length < 6) {
      setSlides((prevSlides) => [...prevSlides, {}]);
      setCurrentSlide(slides.length);
    }
  };

  const handleRemoveSlide = (index) => {
    if (slides.length > 3) {
      setSlides((prevSlides) => prevSlides.filter((_, i) => i !== index));
      index > 0 && setCurrentSlide(index - 1);
    }
  };

  const handleClose = () => {
    dispatch(closeModal());
    navigate("/");
  };

  const handlePrevClick = () => {
    setCurrentSlide(currentSlide > 0 ? currentSlide - 1 : 0);
  };

  const handleNextClick = () => {
    setCurrentSlide(
      currentSlide < slides.length - 1 ? currentSlide + 1 : slides.length - 1
    );
  };

  const handleBackdropClick = (e) => {
    // Close modal if clicked outside of modal content
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleClose();
    }
  };

  if (storyLoading) {
    return <Spinner />;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center bg-white min-h-[450px] border border-gray-300 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 ${
        isMobileScreen ? "w-11/12 p-6" : "w-1/2"
      }`}
      style={{ display: modalContent === EDIT_STORY ? "flex" : "none" }}
    >
      <div className="flex justify-start items-center w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`text-center p-2 mr-4 rounded-md shadow-sm cursor-pointer ${
              currentSlide === index ? "border-2 border-blue-500" : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            Slide {index + 1}
          </div>
        ))}
        <div
          className="text-center p-2 cursor-pointer border rounded-md"
          onClick={handleAddSlide}
        >
          Add +
        </div>
      </div>
      {/* Close Icon */}
      <svg
        className="absolute top-4 right-4 cursor-pointer"
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
      {/* Slide Form */}
      <div className="w-full">
        {slides.map(
          (slide, slideIndex) =>
            slideIndex === currentSlide && (
              <SlideForm
                key={slideIndex}
                slide={slide}
                slideIndex={slideIndex}
                handleChange={(e) => handleChange(e, slideIndex)}
                handleRemoveSlide={() => handleRemoveSlide(slideIndex)}
              />
            )
        )}
      </div>
      <span className="text-red-500 p-4">{error}</span>

      <div className="flex justify-between items-center w-full">
        <Button
          myFunction={handlePrevClick}
          color="#7eff73"
          text="Previous"
          size="small"
        />
        <Button
          myFunction={handleNextClick}
          color="#73abff"
          text="Next"
          size="small"
        />
        {slides.length > 3 ? (
          <Button
            myFunction={() => handleRemoveSlide(currentSlide)}
            color="#FF0000"
            text="Remove"
            size="small"
          />
        ) : (
          <div style={{ width: "30%" }}></div>
        )}
        <Button myFunction={handleSubmit} text="Update" size="small" />
      </div>
    </div>
  );
};

export default StoryForm;
