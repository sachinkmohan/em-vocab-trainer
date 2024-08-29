import { NavLink } from "react-router-dom";
const NavBar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900"
      : "text-black hover:bg-gray-900 ";

  return (
    <div className="mx-auto max-w-7xl px-2 ">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/library" className={linkClass}>
            Library
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
