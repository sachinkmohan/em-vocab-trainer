import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserPen,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useUserData } from "./helpers/UserDataContext";
import { useEditMode } from "./helpers/EditModeContext";
import { useState } from "react";

const NavBar = () => {
  const { roles, id } = useUserData();
  const { toggleEditMode } = useEditMode();
  const navigate = useNavigate();
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.setItem("prevUserID", id ?? "");
      navigate("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "bg-black text-white hover:bg-gray-900"
      : "text-black hover:bg-gray-900 ";

  return (
    <div className="mx-auto max-w-7xl px-2 ">
      <div className="flex h-20 items-center justify-between">
        <div className="flex flex-1 items-center space-x-4">
          {roles && roles.includes("admin") && (
            <>
              <NavLink to="/home" className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/admin-dashboard" className={linkClass}>
                A-DBoard
              </NavLink>
              <NavLink to="/library" className={linkClass}>
                Library
              </NavLink>
              <NavLink to="/user-all-time-dashboard" className={linkClass}>
                Dashboard
              </NavLink>
            </>
          )}
        </div>
        {roles && roles.includes("admin") && (
          <FontAwesomeIcon icon={faUserPen} onClick={toggleEditMode} />
        )}
        <FontAwesomeIcon
          className="px-4"
          icon={faSignOutAlt}
          onClick={handleLogout}
        />
        <FontAwesomeIcon className="px-4" icon={faBars} onClick={toggleMenu} />
      </div>
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 p-4 bg-gray-50 shadow-md border-r border-gray-200 z-50">
          <div className="flex justify-between items-center my-4">
            <h2>Menu</h2>
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faTimes}
              onClick={toggleMenu}
            />
          </div>
          <NavLink to="/credits" className="block py-2">
            Credits
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
