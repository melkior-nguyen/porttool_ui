import { useNavigate } from "react-router-dom";
import Toggle from "./ThemeToggle";
import { paths } from "@/routes/constants";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-gray-200 px-2 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex justify-between items-center mx-auto pt-3">
        <div className="flex items-center mx-auto">
          <span className="text-xl font-medium whitespace-nowrap dark:text-white">
            Welcome
          </span>
        </div>
        <div className="flex justify-end pr-4">
          <Toggle />
          <li className="flex">
            <a
              className="ml-4 cursor-pointer inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 hover:text-gray-400 dark:text-white dark:hover:text-gray-300"
              onClick={() => {
                window.localStorage.removeItem("jwtToken");
                window.localStorage.removeItem("jwt");
                navigate(paths.signin);
              }}
            >
              <svg
                className="w-4 h-4 mr-3"
                aria-hidden="true"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              <span>Log out</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
