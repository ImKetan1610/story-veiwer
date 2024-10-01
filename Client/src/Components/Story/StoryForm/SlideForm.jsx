import { categories } from "../../../globals";

const SlideForm = ({ slide, slideIndex, handleChange }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 z-20 p-8 bg-white border border-gray-300 rounded shadow-lg flex flex-col">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <label className="text-xl w-1/3">Heading:</label>
          <input
            className="w-3/4 border border-black p-2 focus:border-green-300 outline-none"
            type="text"
            name="heading"
            value={slide.heading}
            placeholder="Your Heading"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-xl w-1/3">Description:</label>
          <input
            className="w-3/4 border border-black p-2 focus:border-green-300 outline-none"
            type="text"
            name="description"
            value={slide.description}
            placeholder="Story Description"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-xl w-1/3">Image URL:</label>
          <input
            className="w-3/4 border border-black p-2 focus:border-green-300 outline-none"
            type="text"
            name="imageUrl"
            value={slide.imageUrl}
            placeholder="Add Image URL"
            onChange={(e) => handleChange(e, slideIndex)}
          />
        </div>
        <div className="flex justify-between items-center mb-4">
          <label className="text-xl w-1/3">Category:</label>
          <select
            className="w-3/4 border border-black p-2 focus:border-green-300 outline-none"
            name="category"
            onChange={(e) => handleChange(e, slideIndex)}
            value={slide.category}
          >
            <option value="" className="text-gray-400">
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category + slideIndex} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SlideForm;
