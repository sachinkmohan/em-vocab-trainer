import { NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
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
          <NavLink to="/home" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/library" className={linkClass}>
            Library
          </NavLink>
        </div>
        <FontAwesomeIcon
          className="px-4"
          icon={faSignOutAlt}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default NavBar;
