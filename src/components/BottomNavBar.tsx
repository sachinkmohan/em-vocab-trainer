import { NavLink } from "react-router-dom";
import { FaHome, FaHeart } from "react-icons/fa";

const BottomNavBar = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-blue-500" : "text-gray-500";
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        <NavLink to="/library" className={getNavLinkClass}>
          <FaHome />
        </NavLink>
        <NavLink to="/user-all-time-dashboard" className={getNavLinkClass}>
          <FaHeart />
        </NavLink>
      </div>
    </div>
  );
};

export default BottomNavBar;
