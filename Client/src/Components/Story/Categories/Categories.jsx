import React from "react";
import allImg from "../../../assets/categories/all.jpg";
import foodImg from "../../../assets/categories/food.jpg";
import healthImg from "../../../assets/categories/health.jpg";
import travelImg from "../../../assets/categories/travel.jpg";
import movieImg from "../../../assets/categories/movie.jpg";
import educationImg from "../../../assets/categories/education.jpg";

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
  const images = {
    food: foodImg,
    health: healthImg,
    travel: travelImg,
    movie: movieImg,
    education: educationImg,
  };

  return (
    <div className="flex justify-between items-center overflow-x-hidden mx-4 mt-8">
      <div
        onClick={() => handleCategoryClick("All")}
        className={`w-1/5 h-40 flex items-center justify-center rounded-lg text-white text-center p-4 bg-center bg-cover cursor-pointer transition-transform transform hover:scale-105 ${
          selectedCategory === "All" ? "border-4 border-blue-300" : ""
        }`}
        style={{
          backgroundImage: `linear-gradient(#00000099, #00000099), url(${allImg})`,
        }}
      >
        <h3 className="text-lg">All</h3>
      </div>

      {categories &&
        categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={`w-1/5 h-40 flex items-center justify-center rounded-lg text-white text-center p-4 bg-center bg-cover cursor-pointer transition-transform transform hover:scale-105 ${
              selectedCategory === category ? "border-4 border-blue-300" : ""
            }`}
            style={{
              backgroundImage: `linear-gradient(#00000099, #00000099), ${
                images[category]
                  ? `url(${images[category]})`
                  : `url(${images.health})`
              }`,
            }}
          >
            <h3 className="text-lg">{category}</h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;
