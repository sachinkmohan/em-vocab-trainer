import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <BottomNavBar />
    </div>
  );
};

export default MainLayout;
