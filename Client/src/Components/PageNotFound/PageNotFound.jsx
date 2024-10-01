import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import PageNotFoundImg from "../../assets/PageNotFound.jpg";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[60vh] text-center flex flex-col justify-center items-center">
      <img
        src={PageNotFoundImg}
        alt="Page not found"
        className="w-[400px] md:w-[200px]"
      />
      <h1 className="mt-0 mb-6 text-4xl md:text-xl font-semibold text-red-400">
        Sorry, this page is not available
      </h1>
      <Button
        myFunction={() => navigate("/")}
        text="Go to Home"
        color="#73ABFF"
      />
    </div>
  );
};

export default PageNotFound;
