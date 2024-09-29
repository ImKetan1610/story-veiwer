import React from "react";
import { useSelector } from "react-redux";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  const { isMobileScreen } = useSelector((state) => state.layout);

  return <>{isMobileScreen ? <MobileNavbar /> : <DesktopNavbar />}</>;
};

export default Navbar;
