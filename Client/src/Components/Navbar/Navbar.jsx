import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  const { isMobileScreen } = useSelector((state) => state.layout);

  useEffect(() => {
    console.log(isMobileScreen);
  }, [isMobileScreen]);

  return <>{isMobileScreen ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
