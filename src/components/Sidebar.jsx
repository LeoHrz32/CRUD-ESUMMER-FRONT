import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { RiGraduationCapLine, RiArrowRightSLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import DARKLOGO from "./../assets/images/ISOTIPODARK.png";

const Sidebar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState("");
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleNavClick = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? "" : menu);
  };

  return (
    <>
      <div
        className={`xl:h-screen overflow-y-auto fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-full h-full top-0 bg-secondary-100 p-2 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}
      >
        <div
          className={`xl:h-screen overflow-y-auto xl:overflow-y-hidden fixed xl:static w-[80%] md:w-[40%] lg:w-[30%] xl:w-full h-full top-0 bg-secondary-100 p-2 flex flex-col justify-between z-50 ${showMenu ? "left-0" : "-left-full"} transition-all`}
          ref={modalRef}
        >
          <div>
            <div className="lg:w-[100%] md:w-[70%] w-[50%] max-w-2xl mx-auto mb-10">
              <img src={DARKLOGO} alt="Small GIF" className="w-full h-auto mb-4" />
            </div>
            <ul>
              <li>
                <NavLink
                  to="/teachers"
                  onClick={() => handleNavClick("teachers")}
                  className={({ isActive }) => `w-full flex items-center justify-between py-2 px-4 rounded-lg hover:bg-secondary-900 transition-colors ${isActive ? "bg-secondary-900" : ""}`}
                >
                  <span className="flex items-center gap-4">
                    <RiGraduationCapLine className="text-primary" /> Profesores Esummer
                  </span>
                  <RiArrowRightSLine className={`mt-1 ${activeSubmenu === "teachers" && "rotate-90"} transition-all`} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="xl:hidden fixed bottom-4 right-4 bg-primary text-black p-3 rounded-full z-50"
        >
          {showMenu ? <RiCloseLine /> : <RiMenu3Line />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
