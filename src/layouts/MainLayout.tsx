import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <BottomNavBar />
      <Outlet />
    </>
  );
};

export default MainLayout;
