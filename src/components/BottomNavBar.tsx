import { NavLink } from "react-router-dom";
import { FaHome, FaBrain, FaBell } from "react-icons/fa";
import { HiRocketLaunch } from "react-icons/hi2";

const BottomNavBar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-yellow-800" : "text-gray-500";
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/user-home" className={getNavLinkClass}>
          <FaHome className="size-5" />
        </NavLink>

        {/* <NavLink to="/user-all-time-dashboard" className={getNavLinkClass}>
          <FaHeart />
        </NavLink> */}

        <NavLink to="/learn-new-words" className={getNavLinkClass}>
          <HiRocketLaunch className="size-5" />
        </NavLink>

        <NavLink to="/learned-words" className={getNavLinkClass}>
          <FaBrain className="size-5" />
        </NavLink>

        <NavLink to="/feed" className={getNavLinkClass}>
          <FaBell className="size-5" />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
