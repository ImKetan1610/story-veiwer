import allImg from "../../../assets/categories/all.jpg";
import foodImg from "../../../assets/categories/food.jpg";
import medicalImg from "../../../assets/categories/medical.jpg";
import fruitsImg from "../../../assets/categories/fruits.jpg";
import worldImg from "../../../assets/categories/world.jpg";
import indiaImg from "../../../assets/categories/india.jpg";
import { useSelector } from "react-redux";

const Categories = ({ handleCategoryClick, categories, selectedCategory }) => {
  const { isMobileScreen } = useSelector((state) => state.layout);
  const images = {
    medical: medicalImg,
    fruits: fruitsImg,
    world: worldImg,
    india: indiaImg,
    food: foodImg,
  };

  return (
    <div
      className={`flex justify-between items-center mx-4 mt-8 gap-4 ${
        isMobileScreen ? "overflow-x-scroll" : "overflow-x-hidden"
      }`}
    >
      <div
        onClick={() => handleCategoryClick("All")}
        className={`w-1/5 ${
          isMobileScreen ? "h-40" : "h-48"
        } min-w-[10rem] flex items-center justify-center rounded-3xl text-white text-center p-4 bg-center bg-cover cursor-pointer transition-transform transform hover:scale-105 ${
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
            className={`w-1/5 ${
              isMobileScreen ? "h-40" : "h-48"
            } min-w-[10rem] flex items-center justify-center rounded-3xl text-white text-center p-4 bg-center bg-cover cursor-pointer transition-transform transform hover:scale-105 ${
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
            <h3 className="text-lg capitalize">{category}</h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;
