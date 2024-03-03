import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const classes = "text-gray-700 text-lg font-semibold hover:text-gray-900";
  const activeClasses = "bg-purple-100";

  return (
    <nav className="bg-white border-b b border-purple-900 mb-4 w-4/5 mx-auto">
      <div className="flex justify-around items-center w-full px-4 py-4">
        <Link
          to="/"
          className={`${classes} ${activeLink === "/" ? activeClasses : ""}`}
          onClick={() => setActiveLink("/")}
        >
          Home
        </Link>
        <Link
          to="/history"
          className={`${classes} ${
            activeLink === "/history" ? activeClasses : ""
          }`}
          onClick={() => setActiveLink("/history")}
        >
          History
        </Link>
      </div>
    </nav>
  );
}
