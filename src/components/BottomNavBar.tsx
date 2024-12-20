import { NavLink } from "react-router-dom";
import { FaHome, FaBrain } from "react-icons/fa";
import { HiRocketLaunch } from "react-icons/hi2";

const BottomNavBar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-yellow-800" : "text-gray-500";
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/user-home" className={getNavLinkClass}>
          <FaHome />
        </NavLink>

        {/* <NavLink to="/user-all-time-dashboard" className={getNavLinkClass}>
          <FaHeart />
        </NavLink> */}

        <NavLink to="/learn-new-words" className={getNavLinkClass}>
          <HiRocketLaunch />
        </NavLink>

        <NavLink to="/learned-words" className={getNavLinkClass}>
          <FaBrain />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
