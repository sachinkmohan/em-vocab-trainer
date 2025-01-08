import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import BottomNavBar from "../components/BottomNavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <BottomNavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
